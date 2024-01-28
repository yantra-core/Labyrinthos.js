/**
 * Originally written by Thomas Hunter II
 *
 * Originally written on June 12, 2013
 * Originally hosted at https://github.com/PhobosRising/javascript-roguelike-map-generator
 */

//import { random } from './random.mjs';

//const rand = require('../../utility/random/index.js');

var TILE = {
    VOID: 0,
    FLOOR: 1,
    WALL: 2,
    DOOR: 3,
    SPECIAL_DOOR: 4,
    ENTER: 5,
    EXIT: 6
};

var DEFAULT = {
    WIDTH: 21,
    HEIGHT: 21,
    MIN_ROOM_WIDTH: 3,
    MAX_ROOM_WIDTH: 7,
    MIN_ROOM_HEIGHT: 3,
    MAX_ROOM_HEIGHT: 7,
    IDEAL_COUNT: 10,
    RETRY_COUNT: 100
};

//var WALL_X = 0;
//var WALL_Y = 1;

var ROOM_GAP = 1;

class Roguelike{
    constructor(config={}) {
        
        if (!config) {
            config = {};
        }
        
        if (!config.room) {
            config.room = {};
        }
        
        this.max_width = config.width || DEFAULT.WIDTH;
        this.max_height = config.height || DEFAULT.HEIGHT;
        
        this.room_min_width = config.room.min_width || DEFAULT.MIN_ROOM_WIDTH;
        this.room_max_width = config.room.max_width || DEFAULT.MAX_ROOM_WIDTH;
        this.room_min_height = config.room.min_height || DEFAULT.MIN_ROOM_HEIGHT;
        this.room_max_height = config.room.max_height || DEFAULT.MAX_ROOM_HEIGHT;
        
        this.room_ideal_count = config.room.ideal || DEFAULT.IDEAL_COUNT;
        this.retry_count = config.retry || DEFAULT.IDEAL_COUNT;
        
        this.want_special = !!config.special;
    }
    
    render(options={}, blt){
        var built = blt || this.build();
        var world = built.world;
        
        //var end = new Date();
        
        let result = '';
        // Crude mechanism for drawing level
        for (var y = 0; y < world.length; y++) {
            var row = '';
            for (var x = 0; x < world[y].length; x++) {
                var tile = world[y][x];
                if (tile === 0) {
                    row += ' ';
                } else if (tile === 1) {
                    row += '.';
                } else if (tile === 2) {
                    row += '#';
                } else if (tile === 3) {
                    row += '/';
                } else if (tile === 4) {
                    row += 'X';
                } else if (tile === 5) {
                    row += '<';
                } else if (tile === 6) {
                    row += '>';
                } else {
                    row += world[y][x];
                }
            }
            result += row+'\n';
            //console.log(row + '| ' + y);
        }
        return result;
    }
    
    build(random){
        this.random = random?random:()=> Math.random();
        this.world = null;        // 2D array representing the world
        this.rooms = {};          // Object containing rooms where the key is the Room ID
        this.doors = {};          // Object containing doors where the key is the Door ID
        this.walls = [];          // Array of all walls, where each items is an [X,Y] pair
        this.enter = null;        // {x, y, room_id} object pointing to level entrance
        this.exit = null;         // {x, y, room_id} object pointing to level exit
        this.special = null;      // {room_id, door_id} object pointing to special area
        this.deadends = [];
        
        this.room_id = 0;
        this.door_id = 0;
        
        this.createVoid();
        this.addStarterRoom();
        this.generateRooms();
        this.addSpecialRooms();
        this.buildWalls();
        
        return {
            width: this.max_width,
            height: this.max_height,
            enter: this.enter,
            exit: this.exit,
            deadends: this.deadends,
            special: this.special,
            door_count: this.door_id,
            doors: this.doors,
            room_count: this.room_id,
            rooms: this.rooms,
            walls: this.walls,
            world: this.world
        };
    }
    
    /**
     * Creates a 2D array of VOID tiles
     */
    createVoid() {
        var world = [];
        
        for (var y = 0; y < this.max_height; y++) {
            world[y] = [];
            for (var x = 0; x < this.max_width; x++) {
                world[y][x] = TILE.VOID;
            }
        }
        
        this.world = world;
    }
    
    addStarterRoom(){
        var dimen = this.getRoomDimensions();
        
        var min_left = ROOM_GAP;
        var max_left = this.max_width - (dimen.width + ROOM_GAP * 2) + ROOM_GAP;
        
        var min_top = ROOM_GAP;
        var max_top = this.max_height - (dimen.height + ROOM_GAP * 2) + ROOM_GAP;
        
        var left = this.randomOdd(min_left, max_left);
        var top = this.randomOdd(min_top, max_top);
        //console.log('starter', left, top, dimen.width, dimen.height)
        this.addRoom(left, top, dimen.width, dimen.height);
        //console.log('W', this.world)
    }
    
    getRoomDimensions(){
        return {
            width: this.randomOdd(this.room_min_width, this.room_max_width),
            height: this.randomOdd(this.room_min_height, this.room_max_height)
        };
    }
    
    addRoom(left, top, width, height){
        var room_id = this.room_id++;
        
        this.rooms[room_id] = {
            left: left,
            top: top,
            width: width,
            height: height,
            id: room_id,
            walls: [],
            neighbors: [],
            doors: []
        };
        
        for(var y = top; y < top+height; y++){
            for(var x = left; x < left+width; x++){
                //console.log('f');
                this.world[y][x] = TILE.FLOOR;
            }
        }
        
        return room_id;
    }
    
    /**
     * Adds one-off floors, e.g. for building hallways
     */
    addFloor(x, y){
        this.world[y][x] = TILE.FLOOR;
    }
    
    generateRooms(){
        var retries = this.retry_count;
      
        while(this.room_id < this.room_ideal_count){
            //console.log('!')
            if (!this.generateRoom() && --retries <= 0){
                break;
            }
        }
    }
    
    /**
     * Attempts to add a single room to our world
     *
     * Pick a random cardinal direction
     * Generate a room size
     * Slide that room in until it bumps into another room
     * Build a door that connects the two
     */
    generateRoom(){
        var slide = this.randomFn(0, 3); // North, East, South, West
        
        var x_dir = slide === 1 ? +1 : slide === 3 ? -1 : 0;
        var y_dir = slide === 0 ? +1 : slide === 2 ? -1 : 0;
        
        var dimen = this.getRoomDimensions();
        
        var top, left, name;
        
        if (slide === 0) {
            // Slide South from Top
            name = 'south';
            top = ROOM_GAP;
            left = this.randomOdd(ROOM_GAP, this.max_width - dimen.width - ROOM_GAP * 2);
        } else if (slide === 1) {
            // Slide East from Left
            name = 'east';
            top = this.randomOdd(ROOM_GAP, this.max_height - dimen.height - ROOM_GAP * 2);
            left = ROOM_GAP;
        } else if (slide === 2) {
            // Slide North from Bottom
            name = 'north';
            top = this.max_height - dimen.height - ROOM_GAP;
            left = this.randomOdd(ROOM_GAP, this.max_width - dimen.width - ROOM_GAP * 2);
        } else if (slide === 3) {
            // Slide West from Right
            //eslint-disable-next-line no-unused-vars
            name = 'west';
            top = this.randomOdd(ROOM_GAP, this.max_height - dimen.height - ROOM_GAP * 2);
            left = this.max_width - dimen.width - ROOM_GAP;
        }
        
        //console.log(name, top, left)
        
        
        // Our start position for adding a room overlaps with an existing one :(
        if (false !== this.collides(top, left, dimen.width, dimen.height)) {
            return false;
        }
        
        var collide_room = null;
        
        while (false === (
            collide_room = this.collides(
                top + y_dir, 
                left + x_dir, 
                dimen.width, 
                dimen.height
            )
        )) {
            top += y_dir;
            left += x_dir;
            //console.log(name, top, left)
            // We slid the room out of bounds of the world
            if (this.invalid(top, left, dimen.width, dimen.height)){
                //console.log('INVALID')
                return false;
            }
        }
        
        var new_room_id = this.addRoom(left, top, dimen.width, dimen.height);
        //console.log('world', this.world);
        this.addDoorBetweenRooms(x_dir, y_dir, collide_room, new_room_id);
        
        return true;
    }
    
    collides(top, left, width, height){
        var target = {
            top: top,
            left: left,
            width: width,
            height: height
        };
        
        for (var i = 0; i < this.room_id; i++){
            var room = this.rooms[i];
            /*console.log(target.left, room.left + room.width,
                target.left + target.width , room.left,
                target.top , room.top + room.height,
                target.top + target.height , room.top)*/
            if (!(
                target.left > room.left + room.width ||
                target.left + target.width < room.left ||
                target.top > room.top + room.height ||
                target.top + target.height < room.top
            )) {
                return room.id; // truthy int
            }
        }
        
        return false;
    }
    
    invalid(top, left, width, height){
        if (top <= ROOM_GAP) {
            // Too far north
            return true;
        } else if (left <= ROOM_GAP){
            // Too far west
            return true;
        } else if (top + height >= this.max_height - ROOM_GAP){
            // Too far east
            return true;
        } else if (left + width >= this.max_width - ROOM_GAP){
            // Too far south
            return true;
        }
        
        // A O.K.
        return false;
    }
    
    /**
     * Finds boundaries between floors and void, adding walls
     */
    buildWalls(){
        var rooms = this.rooms;
        //var world = this.world;
        
        // Do this for halls and rooms
        for (var i = 0; i < this.room_id; i++){
            var room = rooms[i];
            
            // Top Wall (Long)
            for(var tx = room.left - 1; tx < room.left + room.width + 1; tx++){
                this.addWall(tx, room.top - 1, room);
            }
            
            // Right Wall (Short)
            for(var ry = room.top; ry < room.top + room.height; ry++){
                this.addWall(room.left + room.width, ry, room);
            }
            
            // Bottom Wall (Long)
            for(var bx = room.left - 1; bx < room.left + room.width + 1; bx++){
                this.addWall(bx, room.top + room.height, room);
            }
            
            // Left Wall (Short)
            for (var ly = room.top; ly < room.top + room.height; ly++) {
                this.addWall(room.left - 1, ly, room);
            }
        }
    }
    
    addWall(x, y, room){
        // Walls should only appear once in the global walls list and world grid
        if (this.world[y][x] === TILE.VOID) {
            this.world[y][x] = TILE.WALL;
            this.walls.push([x, y]);
        }
    
        if (this.world[y][x] === TILE.VOID || this.world[y][x] === TILE.WALL) {
            room.walls.push([x, y]);
        }
    }
    
    addDoorBetweenRooms(x_dir, y_dir, existing_room_id, new_room_id) {
        var existing_room = this.rooms[existing_room_id];
        var new_room = this.rooms[new_room_id];
        
        var x, y, orientation;
        if (x_dir === 1) {
            // eastward
            x = existing_room.left - 1;
            y = this.randomFn(
                Math.max(existing_room.top, new_room.top) + 1,
                Math.min(existing_room.top + existing_room.height, new_room.top + new_room.height) - 2
            );
            orientation = 'h'; // horizontal
        } else if (x_dir === -1) {
            // stabbing westward
            x = new_room.left - 1;
            y = this.randomFn(
                Math.max(new_room.top, existing_room.top) + 1,
                Math.min(new_room.top + new_room.height, existing_room.top + existing_room.height) - 2
            );
            orientation = 'h'; // horizontal
        } else if (y_dir === -1) {
            // northward
            x = this.randomFn(
                Math.max(existing_room.left, new_room.left) + 1,
                Math.min(existing_room.left + existing_room.width, new_room.left + new_room.width) - 2
            );
            y = new_room.top - 1;
            orientation = 'v'; // vertical
        } else if (y_dir === 1) {
            // southward
            x = this.randomFn(
                Math.max(new_room.left, existing_room.left) + 1,
                Math.min(new_room.left + new_room.width, existing_room.left + existing_room.width) - 2
            );
            y = existing_room.top - 1;
            orientation = 'v'; // vertical
        }
        
        this.addDoor(x, y, existing_room_id, new_room_id, orientation);
        
        this.rooms[existing_room_id].neighbors.push(new_room_id);
        this.rooms[new_room_id].neighbors.push(existing_room_id);
    }
    
    /**
     * Add an entrance and exit to the level.
     *
     * Optionally adds a special room (could be hidden, a shop, etc.)
     *
     * We pick two random rooms with only a single attached neighbor.
     * This ensures two adjacent rooms aren't entrance and exit.
     */
    addSpecialRooms() {
        var deadends = [];
        
        var smallest = {
            id: null,
            area: Infinity
        };
        
        var room, area;
        for (var i = 0; i < this.room_id; i++) {
            room = this.rooms[i];
            if (room.neighbors.length === 1) {
                this.rooms[i].deadend = true;
                deadends.push(i);
            
                area = room.width * room.height;
                if (area < smallest.area) {
                    smallest.id = i;
                }
            }
        }
        
        if(this.want_special && deadends.length >= 2){ // Enter + Exit + Special
            var index = deadends.indexOf(smallest.id);
            deadends.splice(index, 1);
            
            var door_id = this.rooms[smallest.id].doors[0];
            var room_id = smallest.id;
            this.special = {
                room_id: room_id,
                door_id: door_id
            };
            
            var door = this.doors[door_id];
            door.special = true;
            this.rooms[room_id].special = true;
            this.world[door.y][door.x] = TILE.SPECIAL_DOOR;
        }
        
        this.shuffle(deadends);
        
        var enter_room_id = deadends.pop();
        
        if(typeof enter_room_id === 'undefined'){
            throw new Error('Unable to find a dead end room for Enter!');
        }
        
        var enter = this.randomNonEdgeInRoom(enter_room_id);
        
        this.world[enter.y][enter.x] = TILE.ENTER;
        this.enter = {
            x: enter.x,
            y: enter.y,
            room_id: enter_room_id
        };
        
        this.rooms[enter_room_id].enter = true;
        var enter_door = this.rooms[enter_room_id].doors[0];
        this.doors[enter_door].enter = true;
        
        var exit_room_id = deadends.pop();
        
        if (typeof exit_room_id === 'undefined') {
            throw new Error('Unable to find a dead end room for Exit!');
        }
        
        var exit = this.randomNonEdgeInRoom(exit_room_id);
        
        this.world[exit.y][exit.x] = TILE.EXIT;
        this.exit = {
            x: exit.x,
            y: exit.y,
            room_id: exit_room_id
        };
        
        this.rooms[exit_room_id].exit = true;
        var exit_door = this.rooms[exit_room_id].doors[0];
        this.doors[exit_door].exit = true;
        
        this.deadends = deadends;
    }
    
    randomNonEdgeInRoom(room_id){
        var room = this.rooms[room_id];
    
        return {
            x: this.randomFn(room.left + 1, room.left + room.width - 2),
            y: this.randomFn(room.top + 1, room.top + room.height - 2)
        };
    }
    
    addDoor(x, y, room1, room2, orientation){
        this.world[y][x] = TILE.DOOR;
        
        var door_id = this.door_id++;
        
        this.doors[door_id]= {
            x: x,
            y: y,
            id: door_id,
            orientation: orientation,
            rooms: [
                room1,
                room2
            ]
        };
        
        this.rooms[room1].doors.push(door_id);
        this.rooms[room2].doors.push(door_id);
        
        return door_id;
    }
    
    /**
     * Pick a number between min and max, inclusive
     * e.g. 1,7 => 1,2,3,4,5,6,7
     */
    randomFn(min_raw, max_raw) {
        var min = Math.floor(min_raw);
        var max = Math.floor(max_raw);
        
        return Math.floor(this.random() * (max + 1 - min) + min);
    }
    
    /**
     * Picks a random odd number between min and max, inclusive (if odd)
     * e.g. 2,9 => 3,5,7,9
     *
     * TODO: Make this a one-liner
     */
    randomOdd(min_raw, max_raw) {
        // Convert them to integers
        var min = Math.floor(min_raw);
        var max = Math.floor(max_raw);
        
        // Make them both Odd
        if (min % 2 === 0) min++;
        if (max % 2 === 0) max--;
        
        // Shift down one, make them even
        min -= 1;
        max -= 1;
        
        // Cut them in half
        min /= 2;
        max /= 2;
        const r = this.random();
        //console.log('R', r);
        var result = Math.floor(r * (max + 1 - min) + min);
        
        result *= 2;
        result += 1;
        return result;
    }
    
    shuffle(o) {
        for (var j, x, i = o.length; i; j = Math.floor(this.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    }
}


export default function ALGORITHM_THOMAS_HUNTER(tileMap, options) {
    tileMap.fill(1); // Fill with walls
    let fractional = Math.sqrt(Math.max(tileMap.width, tileMap.height));
    if(fractional%2 !== 1) fractional++;
    const roomNumber = (tileMap.width/fractional * tileMap.width/fractional)/2;
    const rangius = Math.ceil(fractional/2);
    const generator = new Roguelike({
        width: tileMap.width, // Max Width of the world
        height: tileMap.height, // Max Height of the world
        retry: 100, // How many times should we try to add a room?
        special: true, // Should we generate a "special" room?
        room: {
            // Give up once we get this number of rooms
            ideal: options.roomCount || roomNumber,
            min_width: (options.roomMinWidth || fractional-rangius),
            max_width: (options.roomMaxWidth || fractional+rangius),
            min_height: (options.roomMinHeight || fractional-rangius),
            max_height: (options.roomMinHeight || fractional+rangius)
        }
    });
  
    const built = generator.build(()=>{
        return tileMap.mersenneTwister.rand();
    });
    
    //console.log(built.world.map((line)=>line.join('')).join('\n'));
    const flattened = built.world.reduce(((agg, line)=> agg.concat(line)), [])
    built.world = null;
    tileMap.world = built;
    for(let lcv=0; lcv < tileMap.data.length; lcv++){
        tileMap.data[lcv] = flattened[lcv];
    }
}
