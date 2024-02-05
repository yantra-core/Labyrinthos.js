/**
 * Originally written for a game called "Isolated" in collaboration with Andrew Beattie and Greg Schoberth
 *
 * Originally written on June 12, 2013
 * Originally hosted at https://github.com/PhobosRising/javascript-roguelike-map-generator
 */

const MAX_X = 201;
const MAX_Y = 201;
const DIR = ['n', 'e', 's', 'w'];

//const rand = require('../../utility/random/index.js');

export class BeattieSchoberth{
    constructor({rooms, keys}) {
        this.maxRooms = rooms;
        this.maxKeys = keys;
        
        if (this.maxRooms < 2) {
            console.error(`Room count ${this.maxRooms} needs to be at least two (entrance and exit).`);
            this.maxRooms = 2;
        }
        
        if (this.maxKeys > this.maxRooms - 2) {
            console.error(`Key count ${this.maxKeys} is greater than rooms ${this.maxRooms} minus two (entrance and exit). Reducing keys by two.`);
            this.maxKeys = this.maxRooms - 2;
        }
        this.build = this.generate;
        this.reset();
    }
    
    render(options={}, bld){
        const NULL_KEY = '\x1b[1;37m';
        const ENTER_EXIT = '\x1b[7m';
        const KEY_COLORS = {
            0: ('\x1b[1;31m' || options['0']),
            1: ('\x1b[1;32m'|| options['1']),
            2: ('\x1b[1;34m'|| options['2']),
            3: ('\x1b[1;33m'|| options['3']),
            4: ('\x1b[1;35m'|| options['4']),
            5: ('\x1b[1;36m'|| options['5'])
        };
        
        const generated = bld || this.generate();
        const grid = generated.grid;
        let result = '';
        for (let y = 0; y < generated.size.height; y++) {
            let row1 = ''; // room numbers and hyphens
            let row2 = ''; // pipes
            for (let x = 0; x < generated.size.width; x++) {
                let roomId = grid[y][x];
                let room = generated.rooms[roomId];
                if (!room) {
                    row1 += '    ';
                    row2 += '    ';
                    continue;
                }
            
                let color = KEY_COLORS[room.keyInRoom] || NULL_KEY;
            
                if (room.entrance || room.exit) {
                    color = ENTER_EXIT;
                }
            
                row1 += color + String(roomId).padStart(3, '0') +'\x1b[0m';
                //row1 += colors[color](String(roomId).padStart(3, '0'));
            
                if (room.doors.e !== null) {
                    let door = generated.doors[room.doors.e];
                    let color = KEY_COLORS[door.key] || NULL_KEY;
                    //row1 += colors[color]('-');
                    row1 += color +'-'+'\x1b[0m';
                } else {
                    row1 += ' ';
                }
            
                if (room.doors.s !== null) {
                    let door = generated.doors[room.doors.s];
                    let color = KEY_COLORS[door.key] || NULL_KEY;
                    //row2 += colors[color]('  | ');
                    row2 += color + '  | '+'\x1b[0m';
                } else {
                    row2 += '    ';
                }
            }
            result += row1+'\n';
            result += row2+'\n';
        }
        return result;
    }
    
    reset() {
        this.rooms = [];
        this.doors = [];
        this.keys = [];
        
        // Room IDs
        this.entrance = 0;
        this.exit = null;
        
        this.seed = {
            x: Math.floor(MAX_X / 2),
            y: Math.floor(MAX_Y / 2)
        };
        
        // Keeps track of the edges of the map
        // Useful to shrink map when done
        this.bounds = {
            n: this.seed.y,
            e: this.seed.x,
            s: this.seed.y,
            w: this.seed.x
        };
        
        // Keeps track of the room which is the furthest in any direction
        // Rooms are tracked based on their coordinate tangential to that direction
        // This lets us add rooms without iteratively 'sliding' them in from the outside
        this.furthest = {
            n: new Map(), // X => roomId
            e: new Map(), // Y => roomId
            s: new Map(), // X => roomId
            w: new Map()  // Y => roomId
        };
        
        this.lockPool = new Map();
        this.maxDistance = 0;
    }
    
    generate(random) {
        this.random = random?random:()=> Math.random();
        this.reset();
        
        /*const root = */this.addRoom(this.seed.x, this.seed.y);
        
        for (let i = 0; i < this.maxRooms - 1; i++) {
            let dir = DIR[Math.floor(random() * DIR.length)]; // Which direction are we adding a room from
            
            let x, y, parentRoom;
            
            if(dir === 'n'){ // Sliding southward from north
                x = Math.floor(random() * (this.bounds.e - this.bounds.w)) + this.bounds.w;
                const parentRoomId = this.furthest.n.get(x);
                parentRoom = this.rooms[parentRoomId];
                y = parentRoom.y - 1;
            }else if (dir === 'e'){ // Sliding westward from east
                y = Math.floor(random() * (this.bounds.s - this.bounds.n)) + this.bounds.n;
                const parentRoomId = this.furthest.e.get(y);
                parentRoom = this.rooms[parentRoomId];
                x = parentRoom.x + 1;
            }else if (dir === 's'){ // Sliding northward from south
                x = Math.floor(random() * (this.bounds.e - this.bounds.w)) + this.bounds.w;
                const parentRoomId = this.furthest.s.get(x);
                parentRoom = this.rooms[parentRoomId];
                y = parentRoom.y + 1;
            }else if (dir === 'w'){ // Sliding eastward from west
                y = Math.floor(random() * (this.bounds.s - this.bounds.n)) + this.bounds.n;
                const parentRoomId = this.furthest.w.get(y);
                parentRoom = this.rooms[parentRoomId];
                x = parentRoom.x - 1;
            }
            
            const newRoomId = this.addRoom(x, y);
            /*const d = */this.addDoor(parentRoom.id, newRoomId);
        }
        
        const CHILD_THRESHOLD = this.rooms.length / (this.maxKeys + 1);
        
        const lockedRoom = this.getHighestDistanceRoom();
        let roomToBeLocked = lockedRoom.id;
        this.setExit(roomToBeLocked);
        
        for (let i = 0; i < this.maxKeys; i++) {
            let ascended = this.findRoomParentWithAtMostChildren(this.rooms[roomToBeLocked], CHILD_THRESHOLD);
            
            if (!ascended) {
                console.error('exhausted possible lockable rooms! giving up.');
                break;
            }
            
            this.removeRoomAndChildrenFromLockPool(ascended);
            this.decrementChildrenCountAllParents(ascended);
            
            let roomToPutKeyIn = this.getHighestDistanceRoom();
            
            if (!roomToPutKeyIn) {
                console.error('Cannot find a room to put a key in! Cancelling lock. Level should still be beatable.');
                break;
            }
            
            this.lock(ascended.id - 1, roomToPutKeyIn.id); // TODO: HACK: door between room and parent has ID of parentId - 1
            
            roomToBeLocked = roomToPutKeyIn.id;
        }
        
        const {width, height} = this.squish();
        
        const grid = this.generateGrid(width, height);
        
        this.classifyRooms();
        
        return {
            size: {
                width,
                height
            },
            terminals: {
                entrance: this.entrance,
                exit: this.exit,
                deadends: this.deadends
            },
            //rooms: this.rooms,
            rooms: this.rooms.map(r => {
                // Hide internal data structures from outside world
                delete r.children;
                delete r.childrenCount;
                delete r.parent;
                return r;
            }),
            doors: this.doors.map(d => {
                d.rooms = d.rooms.map(r => r.id);
                return d;
            }),
            keys: this.keys,
            grid
        };
    }
    
    /**
    * Shrink the boundaries of the map
    * Set a new X/Y for every room
    * @return smallest {width,height} required to fit map
    */
    squish() {
        const width = this.bounds.e - this.bounds.w + 1;
        const height = this.bounds.s - this.bounds.n + 1;
        
        const xShift = this.bounds.w;
        const yShift = this.bounds.n;
        
        for (const room of this.rooms) {
            room.x -= xShift;
            room.y -= yShift;
        }
        
        return {width, height};
    }
    
    addRoom(x, y) {
        const roomId = this.rooms.length;
        
        this.stretch(x, y);
        this.further(x, y, roomId);
        
        const room = {
            id: roomId,
            x,
            y,
            children: new Set(),
            childrenCount: 0,
            parent: null,
            keyInRoom: null,
            template: 'F1',
            distance: roomId === 0 ? 0 : null, // Distance from room[0] / spawn
            exit: false,
            entrance: roomId === 0,
            doors: {
                n: null,
                e: null,
                s: null,
                w: null
            }
        };
        
        this.rooms.push(room);
        
        return roomId;
    }
    
    further(x, y, roomId) {
        const mostNorth = this.furthest.n.get(x);
        if(typeof mostNorth === 'undefined' || this.rooms[mostNorth].y > y){
            this.furthest.n.set(x, roomId);
        }
        
        const mostEast = this.furthest.e.get(y);
        if(typeof mostEast === 'undefined' || this.rooms[mostEast].x < x){
            this.furthest.e.set(y, roomId);
        }
        
        const mostSouth = this.furthest.s.get(x);
        if(typeof mostSouth === 'undefined' || this.rooms[mostSouth].y < y){
            this.furthest.s.set(x, roomId);
        }
        
        const mostWest = this.furthest.w.get(y);
        if(typeof mostWest === 'undefined' || this.rooms[mostWest].x > x){
            this.furthest.w.set(y, roomId);
        }
    }
    
    stretch(x, y) {
        if (y < this.bounds.n) {
            this.bounds.n = y;
        }
        if (x > this.bounds.e) {
            this.bounds.e = x;
        }
        if (y > this.bounds.s) {
            this.bounds.s = y;
        }
        if (x < this.bounds.w) {
            this.bounds.w = x;
        }
    }
    
    classifyRooms() {
        this.deadends = [];
        
        for (const room of this.rooms) {
            let doors = 0;
            if(room.doors.n !== null) doors++;
            if(room.doors.e !== null) doors++;
            if(room.doors.s !== null) doors++;
            if(room.doors.w !== null) doors++;
            
            if(doors === 1) { // D (Dead End)
                this.deadends.push(room.id);
                if(room.doors.n !== null) {
                    room.template = 'D1';
                }else if (room.doors.e !== null){
                    room.template = 'D2';
                }else if (room.doors.s !== null){
                    room.template = 'D3';
                }else if (room.doors.w !== null){
                    room.template = 'D4';
                }
            }else if (doors === 2){ // B (Bend) or C (Corridoor)
                if(room.doors.n !== null && room.doors.s !== null) {
                    room.template = 'C1';
                }else if (room.doors.e !== null && room.doors.w !== null){
                    room.template = 'C2';
                }else if (room.doors.n !== null && room.doors.e !== null){
                    room.template = 'B1';
                }else if (room.doors.e !== null && room.doors.s !== null){
                    room.template = 'B2';
                }else if (room.doors.s !== null && room.doors.w !== null){
                    room.template = 'B3';
                }else if (room.doors.w !== null && room.doors.n !== null){
                    room.template = 'B4';
                }
            } else if (doors === 3) { // E
                if(room.doors.s === null){
                    room.template = 'E1';
                }else if (room.doors.w === null){
                    room.template = 'E2';
                }else if (room.doors.n === null){
                    room.template = 'E3';
                }else if (room.doors.e === null){
                    room.template = 'E4';
                }
            }else if (doors === 4){ // A (All)
                room.template = 'A1';
            }else{ // F (Fucked)
                room.template = 'F1';
            }
        }
    }
    
    /**
    * @param rooms Array of two door IDs
    *
    * @return doorId
    */
    addDoor(parentRoomId, childRoomId) {
        const parentRoom = this.rooms[parentRoomId];
        const childRoom = this.rooms[childRoomId];
        const doorId = this.doors.length;
        let orientation = null;
        
        if (parentRoom.x === childRoom.x && parentRoom.y === childRoom.y - 1) {
            // R1 north of R2
            orientation = 'v';
            parentRoom.doors.s = doorId;
            childRoom.doors.n = doorId;
        } else if (parentRoom.x === childRoom.x + 1 && parentRoom.y === childRoom.y) {
            // R1 east of R2
            orientation = 'h';
            parentRoom.doors.w = doorId;
            childRoom.doors.e = doorId;
        } else if (parentRoom.x === childRoom.x && parentRoom.y === childRoom.y + 1) {
            // R1 south of R2
            orientation = 'v';
            parentRoom.doors.n = doorId;
            childRoom.doors.s = doorId;
        } else if (parentRoom.x === childRoom.x - 1 && parentRoom.y === childRoom.y) {
            // R1 west of R2
            orientation = 'h';
            parentRoom.doors.e = doorId;
            childRoom.doors.w = doorId;
        } else {
            throw new Error('Rooms must be adjacent');
        }
        
        parentRoom.children.add(childRoom);
        childRoom.distance = parentRoom.distance + 1;
        childRoom.parent = parentRoom;
        this.increaseChildrenCountAllParents(childRoom);
        this.registerRoomDistanceLockPool(childRoom.id);
        
        this.doors.push({
            id: doorId,
            key: null,
            orientation,
            exit: false,
            rooms: [parentRoom, childRoom]
        });
        
        return doorId;
    }
    
    increaseChildrenCountAllParents(room) {
        //eslint-disable-next-line no-cond-assign
        while (room = room.parent) {
            room.childrenCount++;
        }
    }
    
    registerRoomDistanceLockPool(roomId) {
        let room = this.rooms[roomId];
        let distance = room.distance;
        
        if (!this.lockPool.get(distance)) {
            this.lockPool.set(distance, new Set());
        }
        
        this.lockPool.get(distance).add(room);
        
        if (distance > this.maxDistance) {
            this.maxDistance = distance;
        }
    }
    
    removeFromLockPool(room) {
        let distance = room.distance;
        
        let pool = this.lockPool.get(distance);
        
        if(!pool){
            console.error(`no pool of depth ${distance}`);
            return;
        }
        
        pool.delete(room);
        
        //if (pool.size === 0) {
        //console.log('pool is now empty, removing pool');
        //console.log(`this should be deepest room total! my: ${distance}, max: ${this.maxDistance}`);
        //this.lockPool.delete(pool);
        ////this.maxDistance--; // get removed out of order
        //}
    }
    
    getHighestDistanceRoom() {
        // TODO: This is slow, iterates every distance pool
        for(let i = this.maxDistance; i > 0; i--){ 
            let collection = this.lockPool.get(i);
            
            if (!collection.size){
                continue;
            }
            
            let item = collection.values().next().value;
            
            return item;
        }
        
        return null;
    }
    
    findRoomParentWithAtMostChildren(room, count) {
        if(!room){
            throw new Error('bad room');
        }
        let parent;
        //eslint-disable-next-line no-cond-assign
        while(parent = room.parent){
            if((parent.childrenCount+1) > count){
                return room;
            }
            room = parent;
        }
        
        return room;
    }
    
    decrementChildrenCountAllParents(room) {
        let decrementCount = room.childrenCount + 1;
        while(room){
            room.childrenCount -= decrementCount;
            room = room.parent;
        }
    }
    
    removeRoomAndChildrenFromLockPool(room) {
        this.removeFromLockPool(room);
        for(let child of room.children){
            this.removeFromLockPool(child);
            this.removeRoomAndChildrenFromLockPool(child);
        }
    }
    
    /**
    * Locks a door, putting the key in the specified room
    * @return keyId
    */
    lock(doorId, roomId) {
        const door = this.doors[doorId];
        const location = this.rooms[roomId];
        const keyId = this.keys.length;
        
        if(!door){
            throw new Error(`Invalid door ${doorId}`);
        }
        
        if(!location){
            throw new Error(`Invalid room ${roomId}`);
        }
        
        this.keys.push({
            id: keyId,
            location: location.id,
            door: doorId
        });
        
        this.doors[doorId].key = keyId;
        location.keyInRoom = keyId;
        
        return keyId;
    }
    
    /**
    * Generates a 2D array of Room IDs
    * Makes it easier for games to visualize the map
    */
    generateGrid(width, height) {
        const grid = [];
        
        for(let y = 0; y < height; y++){
            const row = [];
            for (let x = 0; x < width; x++){
                row.push(null);
            }
            grid.push(row);
        }
        
        const self = this;
        function addRoomToGrid(roomId){
            const room = self.rooms[roomId];
            grid[room.y][room.x] = room.id;
            for(let child of room.children){
                addRoomToGrid(child.id);
            }
        }
    
        addRoomToGrid(0);
    
        return grid;
    }
    
    setExit(roomId){
        const room = this.rooms[roomId];
        
        if (!room){
            throw new Error(`invalid room id ${roomId}`);
        }
        
        room.exit = true;
        
        if (room.doors.n !== null) this.doors[room.doors.n].exit = true;
        if (room.doors.e !== null) this.doors[room.doors.e].exit = true;
        if (room.doors.s !== null) this.doors[room.doors.s].exit = true;
        if (room.doors.w !== null) this.doors[room.doors.w].exit = true;
        
        this.exit = roomId;
    }
}

var TILE = {
    VOID: 0,
    WALL: 1,
    FLOOR: 2,
    DOOR: 3,
    SPECIAL_DOOR: 4,
    ENTER: 5,
    EXIT: 6
};

const toCharGrid = (string='')=>{
    return string.split('\n').map(
        line => line.split('')
    );
};

class Grid{
    constructor(str=''){
        this.grid = toCharGrid(str);
    }
    
    overlay(subgrid, y, x){
        const grid = Array.isArray(subgrid)?subgrid:toCharGrid(subgrid);
        for(let row=0; row < grid.length; row++){
            for(let col=0; col < grid[row].length; col++){
                if(!this.grid[x+row]) this.grid[x+row] = [];
                this.grid[x+row][y+col] = grid[row][col];
            }
        }
    }
    
    fill(tile, max_width, max_height) {
        for (var y = 0; y < max_height; y++) {
            this.grid[y] = [];
            for (var x = 0; x < max_width; x++) {
                this.grid[y][x] = tile;
            }
        }
    }
    
    toString(){
        return this.grid.map(chars => chars.join('')).join('\n');
    }
}

export class BeattieSchoberthBuilder{
    constructor(config={}) {
        this.adventure = new BeattieSchoberth(config);
        this.options = config;
        this.max_height = config.maxHeight;
        this.max_width = config.maxWidth;
    }
    
    renderWorld(options={}, blt){
        const opt = (name) => options[name] || this.options[name];
        const width = opt('width');
        const height = opt('height');
        const roomWidth = opt('roomWidth');
        const roomHeight = opt('roomHeight');
        const built = blt || this.build();
        const generated = built;
        const grid = generated.grid;
        const output = new Grid();
        let rendered = null;
        output.fill(TILE.VOID, width, height);
        for(let y = 0; y < generated.size.height; y++){
            for(let x = 0; x < generated.size.width; x++){
                let roomId = grid[y][x];
                let room = generated.rooms[roomId];
                if(room){
                    rendered = this.buildRoom({
                        doors: room.doors
                    });
                }else{
                    rendered = this.emptyRoom({});
                }
                output.overlay(rendered, x * roomWidth, y * roomHeight);
            }
        }
        return output.grid;
    }
    
    buildRoom(options={}){
        const inDoorRange = (n, max, range)=>{
            const half = Math.floor(max/2);
            const odd = !! (max % 2);
            const halfRange = Math.floor(range/2);
            if(odd){
                if(n === half && range){//in center
                    return true;
                }else{
                    if(n < half){
                        return n > (half-halfRange);
                    }else{
                        return n < (half+halfRange);
                    }
                }
            }else{
                if(n <= half){
                    return n >= (half-halfRange);
                }else{
                    return n < (half+halfRange);
                }
            }
        };
        const opt = (name) => options[name] || this.options[name];
        const width = opt('roomWidth');
        const height = opt('roomHeight');
        let lines = [];
        for(let y=0; y < height; y++){
            let row = [];
            for(let x=0; x < width; x++){
                if(x === 0 || x === width-1){
                    //TODO: doors
                    if(x=== 0){
                        if(options.doors.w && inDoorRange(y, height, 2)){
                            row.push(TILE.DOOR);
                        }else{
                            row.push(TILE.WALL);
                        }
                    }else{
                        if(options.doors.e && inDoorRange(y, height, 2)){
                            row.push(TILE.DOOR);
                        }else{
                            row.push(TILE.WALL);
                        }
                    }
                }else{
                    if(y === 0 || y === height-1){
                        if(y=== 0){
                            if(options.doors.n && inDoorRange(x, width, 2)){
                                row.push(TILE.DOOR);
                            }else{
                                row.push(TILE.WALL);
                            }
                        }else{
                            if(options.doors.s && inDoorRange(x, width, 2)){
                                row.push(TILE.DOOR);
                            }else{
                                row.push(TILE.WALL);
                            }
                        }
                    }else{
                        row.push(TILE.FLOOR);
                    }
                }
            }
            lines.push(row);
        }
        return lines;
    }
    
    emptyRoom(options={}){
        const opt = (name) => options[name] || this.options[name];
        const width = opt('roomWidth');
        const height = opt('roomHeight');
        let result = [];
        for(let y=0; y < height; y++){
            let row = [];
            for(let x=0; x < width; x++){
                row.push(TILE.VOID);
            }
            result.push(row);
        }
        return result;
    }
    
    build(rand){
        const adventureBuild = this.adventure.build(rand);
        adventureBuild.world = this.renderWorld({}, adventureBuild);
        return adventureBuild;
    }
    
}

export default function ALGORITHM_BEATTIE_SCHOBERTH(tileMap, options) {
    let fractional = Math.floor(Math.sqrt(Math.max(tileMap.width, tileMap.height)));
    
    const builder = new BeattieSchoberthBuilder({
        rooms: fractional*2, 
        keys: 3,
        special: 2,
        width: tileMap.width,
        height: tileMap.height,
        roomHeight: options.roomHeight || fractional,
        roomWidth: options.roomWidth || fractional
    });
    
    const built = builder.build(()=>{
        return tileMap.random();
    });
    const flattened = built.world.reduce(((agg, line)=> agg.concat(line)), []);
    built.world = null;
    for(let lcv=0; lcv < tileMap.data.length; lcv++){
        tileMap.data[lcv] = flattened[lcv];
    }
    tileMap.world = built;
}