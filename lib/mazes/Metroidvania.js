/**
 * Metroidvania.js - Abbey Hawk Sparrow 2024
 * Originally written by Thomas Hunter II
 *
 * Originally written on June 12, 2013
 * Originally hosted at https://github.com/PhobosRising/javascript-roguelike-map-generator
 */

const WALL = 'wall';
const DOOR = 'door';
const OPEN = 'open';
const EXIT = 'exit';
 
const DIRECTIONS = ['n', 'e', 's', 'w'];
 
const TILE = {
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
    
    toString(incoming){
        return (incoming || this.grid).map(chars => chars.join('')).join('\n');
    }
}

class Metroidvania{
    constructor(config={}){
        this.options = config;
        
    }
    
    render(options={}, blt){
        let built = blt || this.build();
        var world = built.map;
        let result = '';
        // Crude mechanism for drawing level
        for(var y = 0; y < world.length; y++){
            var row = '';
            for(var x = 0; x < world[y].length; x++){
                if(
                    world[y][x].edges.e || 
                    world[y][x].edges.w || 
                    world[y][x].edges.n || 
                    world[y][x].edges.s
                ) row += '#';
                else row += ' ';
            }
            result += row+'\n';
            //console.log(row + '| ' + y);
        }
        return result;
    }
    
    build(random){
        this.random = random;
        const data = platformGenerator(this.options, random);
        const grid = new Grid();
        const roomWidth = this.options.roomWidth || 10;
        const roomHeight = this.options.roomHeight || 10;
        grid.fill(TILE.VOID, 
            this.options.gridWidth, 
            this.options.gridHeight
        );
        
        for(let col=0; col < data.rooms.length; col++){
            for(let row=0; row < data.rooms[col].length; row++){
                const location = data.rooms[col][row];
                const roomData = data.map[location.y][location.x];
                const  room = buildRoom(
                    roomData, this.options.roomHeight, this.options.roomWidth, 
                    /*{
                    room: roomData,
                    roomWidth: this.options.roomWidth,
                    roomHeight: this.options.roomHeight
                }*/
            );
            grid.overlay(
                room, 
                location.x * this.options.roomHeight, 
                location.y * this.options.roomWidth
            );
            }
        }
        data.world = grid.grid;
        return data;
    }
    
}

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

const buildRoom = (options={}, roomHeight, roomWidth)=>{
    const width = roomHeight;
    const height = roomWidth;
    let lines = [];
    for(let y=0; y < height; y++){
        let row = [];
        for(let x=0; x < width; x++){
            if(x === 0 || x === width-1){
                //TODO: doors
                if(x=== 0){
                    if(options.edges.w === 'open'){
                        if(y === 0 || y === height-1) row.push(TILE.WALL);
                        else row.push(TILE.FLOOR);
                    }else{
                        if((
                            options.edges.w === 'door' ||
                            options.edges.w === 'exit'
                        ) && inDoorRange(y, height, 2)){
                            if(options.edges.w === 'door'){
                                row.push(TILE.DOOR);
                            }else{
                                row.push(TILE.EXIT);
                            }
                        }else{
                            row.push(TILE.WALL);
                        }
                    }
                }else{
                    if(options.edges.e === 'open'){
                        if(y === 0 || y === height-1) row.push(TILE.WALL);
                        else row.push(TILE.FLOOR);
                    }else{
                        if((
                            options.edges.e === 'door' ||
                            options.edges.e === 'exit'
                        ) && inDoorRange(y, height, 2)){
                            if(options.edges.e === 'door'){
                                row.push(TILE.DOOR);
                            }else{
                                row.push(TILE.EXIT);
                            }
                        }else{
                            row.push(TILE.WALL);
                        }
                    }
                }
            }else{
                if(y === 0 || y === height-1){
                    if(y=== 0){
                        if(options.edges.n === 'open'){
                            row.push(TILE.FLOOR);
                        }else{
                            if((
                                options.edges.n === 'door' ||
                                options.edges.n === 'exit'
                            ) && inDoorRange(x, width, 2)){
                                if(options.edges.n === 'door'){
                                    row.push(TILE.DOOR);
                                }else{
                                    row.push(TILE.EXIT);
                                }
                            }else{
                                row.push(TILE.WALL);
                            }
                        }
                    }else{
                        if(options.edges.s === 'open'){
                            row.push(TILE.FLOOR);
                        }else{
                            if((
                                options.edges.s === 'door' ||
                                options.edges.s === 'exit'
                            ) && inDoorRange(x, width, 2)){
                                if(options.edges.s === 'door'){
                                    row.push(TILE.DOOR);
                                }else{
                                    row.push(TILE.EXIT);
                                }
                            }else{
                                row.push(TILE.WALL);
                            }
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

const platformGenerator = (config = {}, random) => {
    let MAP_WIDTH = config.width || 20;
    let MAP_HEIGHT = config.height || 20;

    let MIN_ZONES_PER_ROOM = config.minZonesPerRoom || 1;
    let MAX_ZONES_PER_ROOM = config.maxZonesPerRoom || 4;
    let MIN_ROOMS_PER_MAP = config.minRoomsPerMap || 10;
    let MAX_ROOMS_PER_MAP = config.maxRoomsPerMap || 20;

    // If we don't get at least this many random doors, start over
    let NEW_DOOR_MIN_THRESHOLD = config.newDoors || 3;

    // How this really should work is the odds of creating a door are higher as the room id's get farther apart
    let ROOM_ID_DIFF_RANDOM_DOOR_THRESHOLD = config.roomDiff || 3; // How different should two rooms be?
    let ROOM_ID_DIFF_RANDOM_DOOR_ODDS = config.roomDiffOdds || 1/5; // What are the odds we'll act upon this?

    let failCount=0;
    let result = null;
    while (!result) {
        result = build(initialize(MAP_WIDTH, MAP_HEIGHT));
    }
    return result;

    function build(map) {
        // Determin the total number of rooms in the beginning
        const number_of_rooms = rangedRandom(MIN_ROOMS_PER_MAP, MAX_ROOMS_PER_MAP, random);

        // The cursor is this special little pointer for the next zone being built
        let cursor = {
            x: Math.floor(MAP_WIDTH/2),
            y: Math.floor(MAP_WIDTH/2)
        };

        const exits = {
            n: { // negative Y
                x: cursor.x,
                y: cursor.y
            },
            s: { // positive Y
                x: cursor.x,
                y: cursor.y
            },
            e: { // positive X
                x: cursor.x,
                y: cursor.y
            },
            w: { // negative X
                x: cursor.x,
                y: cursor.y
            }
        };

        // Each placed zone will have its own id
        let zone_id = 0;

        // An array of room id's, and the room locations within it
        const all_room_zones = [];

        // Run this loop once per room we're going to build
        for (let room = 0; room < number_of_rooms; room++) {
            // determine the number of zones in this room at the beginning
            const number_of_zones = rangedRandom(MIN_ZONES_PER_ROOM, MAX_ZONES_PER_ROOM, random);

            const zones_in_this_room = [];

            // Run this loop once per zone within this room
            for (let zone_number = 0; zone_number < number_of_zones; zone_number++) {
                if (!cursor) {
                    return null;
                }
                const zone = map[cursor.y][cursor.x];

                zones_in_this_room.push({
                    x: cursor.x,
                    y: cursor.y
                });

                zone.open = true;
                zone.room = room;
                zone.zone = zone_id;

                zone_id++;

                if (cursor.x <= exits.w.x) exits.w = cursor;
                if (cursor.x >= exits.e.x) exits.e = cursor;
                if (cursor.y <= exits.n.y) exits.n = cursor;
                if (cursor.y >= exits.s.y) exits.s = cursor;
                cursor = moveCursor(map, cursor, random);

                if (!cursor) {
                    // When this happens, we should just instead start building from somewhere else
                    //console.log('CURSOR STUCK. Rebuild...');
                    failCount++;
                    if(config.maxFails && failCount > config.maxFails) throw new Error(
                        'Failed too many times to generate this configuration'
                    );
                    return false;
                }
            }

            // Build walls between this room and other rooms / void
            for (const zone_location of zones_in_this_room) {
                buildWallsForZone(map, zone_location);
            }

            all_room_zones[room] = zones_in_this_room;

            // Move cursor to an area outside but next to this room, and add door
            if (room != number_of_rooms-1) {
                cursor = findNakedAdjacent(map, zones_in_this_room, random);
            }
        }

        // Lets add some random doors between rooms, otherwise it's too linear
        let new_door_count = 0;
        for (const room_zones of all_room_zones) {
            for (const coords of room_zones) {
                if (coords.x === 0 || coords.y === 0 || coords.x >= MAP_WIDTH-1 || coords.y >= MAP_HEIGHT-1) {
                    // Don't attempt to build random doors on extremes. Could be more specific though, doesn't always need to be avoided.
                    continue;
                }
                const this_zone = map[coords.y][coords.x];
                const this_room_id = this_zone.room;

                let comparedZone = null;

                // South
                comparedZone = map[coords.y+1][coords.x];
                if (comparedZone.open && Math.abs(comparedZone.room - this_room_id) > ROOM_ID_DIFF_RANDOM_DOOR_THRESHOLD && Math.random() <= ROOM_ID_DIFF_RANDOM_DOOR_ODDS) {
                    buildDoorBetweenZones(map, coords, {x: coords.x, y: coords.y+1});
                    new_door_count++;
                }

                // North
                comparedZone = map[coords.y-1][coords.x];
                if (comparedZone.open && Math.abs(comparedZone.room - this_room_id) > ROOM_ID_DIFF_RANDOM_DOOR_THRESHOLD && Math.random() <= ROOM_ID_DIFF_RANDOM_DOOR_ODDS) {
                    buildDoorBetweenZones(map, coords, {x: coords.x, y: coords.y-1});
                    new_door_count++;
                }

                // West
                comparedZone = map[coords.y][coords.x-1];
                if (comparedZone.open && Math.abs(comparedZone.room - this_room_id) > ROOM_ID_DIFF_RANDOM_DOOR_THRESHOLD && Math.random() <= ROOM_ID_DIFF_RANDOM_DOOR_ODDS) {
                    buildDoorBetweenZones(map, coords, {x: coords.x-1, y: coords.y});
                    new_door_count++;
                }

                // East
                comparedZone = map[coords.y][coords.x+1];
                if (comparedZone.open && Math.abs(comparedZone.room - this_room_id) > ROOM_ID_DIFF_RANDOM_DOOR_THRESHOLD && Math.random() <= ROOM_ID_DIFF_RANDOM_DOOR_ODDS) {
                    buildDoorBetweenZones(map, coords, {x: coords.x+1, y: coords.y});
                    new_door_count++;
                }
            }
        }

        if (new_door_count < NEW_DOOR_MIN_THRESHOLD) {
            failCount++;
            if(config.maxFails && failCount > config.maxFails) throw new Error(
                'Failed too many times to generate this configuration'
            );
            //console.log('UNMET DOOR THRESHOLD: ' + new_door_count + ' OF ' + //NEW_DOOR_MIN_THRESHOLD + '. Rebuild...');
            return false;
        }

        // Build our exits
        for(const dir of DIRECTIONS){
            map[exits[dir].y][exits[dir].x].edges[dir] = EXIT;
            map[exits[dir].y][exits[dir].x].exit = true;
        }

        return {
            map,
            exits,
            failCount,
            rooms: all_room_zones
        };
    }

    // Finds an open zone which is adjacent to one of the supplied zones
    function findNakedAdjacent(map, zones, random) {
        zones = shuffle(zones, random);

        for (const current_zone of zones) {
            const newZone = moveCursor(map, current_zone, random);
            if (newZone) {
                buildDoorBetweenZones(map, current_zone, newZone);
                return newZone;
            }
        }

        return false;
    }

    // Move the cursor to an available adjacent zone
    function moveCursor(map, cursor, random) {
        let adjacents = shuffle([
            {
                d: 'n', x: 0, y: 1
            }, {
                d: 'e', x: 1, y: 0
            }, {
                d: 's', x: 0, y: -1
            }, {
                d: 'w', x: -1, y: 0
            }
        ], random);

        let direction = null;
        let newCursor = null;
        //eslint-disable-next-line no-cond-assign
        while(direction = adjacents.pop()){
            newCursor = {
                x: cursor.x + direction.x,
                y: cursor.y + direction.y
            };

            if (newCursor.x < 0 || newCursor.y < 0 || newCursor.x >= MAP_WIDTH || newCursor.y >= MAP_HEIGHT) {
                // When this happens, we should just move the cursor somewhere else
                //console.log('CURSOR OUT OF BOUNDS. Rebuild...');
                failCount++;
                if(config.maxFails && failCount > config.maxFails) throw new Error(
                    'Failed too many times to generate this configuration'
                );
                return null;
            }

            if (!map[newCursor.y][newCursor.x].open) {
                return newCursor;
            }
        }

        return false;
    }

    // Takes the coordinates of a zone, and map info, and works on building
    // walls for that particular zone. Should also update this so that we make
    // sure we're not looking outside the bounds of our array (<0 | >MAX).
    // Also, don't want to blow away doors...
    function buildWallsForZone(map, loc) {
        const room = map[loc.y][loc.x].room;

        // NORTH
        if (map[loc.y][loc.x].edges.n != DOOR) {
            if (loc.y === 0 || !map[loc.y-1][loc.x].open || map[loc.y-1][loc.x].room != room) {
                map[loc.y][loc.x].edges.n = WALL;
            } else {
                map[loc.y][loc.x].edges.n = OPEN;
            }
        }

        // EAST
        if (map[loc.y][loc.x].edges.e != DOOR) {
            if (loc.x >= MAP_WIDTH-1 || !map[loc.y][loc.x+1].open || map[loc.y][loc.x+1].room != room) {
                map[loc.y][loc.x].edges.e = WALL;
            } else {
                map[loc.y][loc.x].edges.e = OPEN;
            }
        }

        // SOUTH
        if (map[loc.y][loc.x].edges.s != DOOR) {
            if (loc.y >= MAP_HEIGHT-1 || !map[loc.y+1][loc.x].open || map[loc.y+1][loc.x].room != room) {
                map[loc.y][loc.x].edges.s = WALL;
            } else {
                map[loc.y][loc.x].edges.s = OPEN;
            }
        }

        // WEST
        if (map[loc.y][loc.x].edges.w != DOOR) {
            if (loc.x === 0 || !map[loc.y][loc.x-1].open || map[loc.y][loc.x-1].room != room) {
                map[loc.y][loc.x].edges.w = WALL;
            } else {
                map[loc.y][loc.x].edges.w = OPEN;
            }
        }
    }
};

// Get a random integer between the supplied min and max
function rangedRandom(min, max, random) {
    return Math.floor((random() * (max + 1 - min)) + min);
}

// Builds a door between these two (hopefully) adjacent zones
function buildDoorBetweenZones(map, zonePos1, zonePos2) {
    const zone1 = map[zonePos1.y][zonePos1.x];
    const zone2 = map[zonePos2.y][zonePos2.x];

    if (zonePos1.x == zonePos2.x && zonePos1.y > zonePos2.y) {
        // ZONE1 SOUTH OF ZONE2
        zone1.edges.n = DOOR;
        zone2.edges.s = DOOR;
    } else if (zonePos1.x == zonePos2.x && zonePos1.y < zonePos2.y) {
        // ZONE1 NORTH OF ZONE2
        zone1.edges.s = DOOR;
        zone2.edges.n = DOOR;
    } else if (zonePos1.y == zonePos2.y && zonePos1.x > zonePos2.x) {
        // ZONE1 EAST OF ZONE2
        zone1.edges.w = DOOR;
        zone2.edges.e = DOOR;
    } else if (zonePos1.y == zonePos2.y && zonePos1.x < zonePos2.x) {
        // ZONE1 WEST OF ZONE2
        zone1.edges.e = DOOR;
        zone2.edges.w = DOOR;
    } else {
        console.log('BUILD DOOR FAILURE', zone1, zone2);
    }
}

// Randomizes an array
function shuffle(array, random) {
    const arr = array.slice(); // clone array
    let i = arr.length, j, tempi, tempj;
    if ( i == 0 ) return false;
    while ( --i ) {
        j         = Math.floor( random() * ( i + 1 ) );
        tempi     = arr[i];
        tempj     = arr[j];
        arr[i]    = tempj;
        arr[j]    = tempi;
    }
    return arr;
}

// Builds a big empty square array, an entire map
function initialize(width, height) {
    const map = [];

    for (let y = 0; y < height; y++) {
        map[y] = [];

        for (let x = 0; x < width; x++) {
            map[y][x] = {
                open: false,
                room: null,
                exit: null,
                zone: null,
                edges: {
                    n: null,
                    e: null,
                    s: null,
                    w: null,
                }
            };
        }
    }

    return map;
}

export default function ALGORITHM_METROIDVANIA(tileMap, options) {
    tileMap.fill(0); // Fill with walls
    const maxDimension = Math.max(tileMap.width, tileMap.height);
    if(maxDimension <= 5){
        return;
    }
    let fractional = Math.sqrt(maxDimension);
    if(fractional%2 !== 1) fractional++;
    const size = maxDimension < 10?Math.floor(maxDimension/2):10;
    const doorDiff = maxDimension < 10?1:2;
    const roomSizeHeight = Math.floor(tileMap.width / size);
    const roomSizeWidth = Math.floor(tileMap.height / size);
    const numRoomsWide = Math.floor(tileMap.width/roomSizeHeight);
    const numRoomsHigh = Math.floor(tileMap.height/roomSizeWidth);
    const maxCount = Math.floor(numRoomsWide*numRoomsHigh*0.8);
    const minCount = Math.floor(maxCount/4);
    const generator = new Metroidvania({
        roomWidth: roomSizeWidth,
        roomHeight: roomSizeHeight,
        maxFails: 25000,
        width: numRoomsWide,        // Max number of zones wide
        height: numRoomsWide,       // Max number of zones tall
        gridHeight: tileMap.height,
        gridWidth: tileMap.width,
        minZonesPerRoom: 1,         // Minimum number of zones per room
        maxZonesPerRoom: 3,         // Maximum number of zones per room
        minRoomsPerMap: minCount,   // Minimum number of rooms per map
        maxRoomsPerMap: maxCount,   // Maximum number of rooms per map
        newDoors: doorDiff,         // # doors to add to prevent tedious linear mazes
        roomDiff: doorDiff,         // When adding a new door, room ID distance
        roomDiffOdds: 1/2           // Odds of inserting a new door on opportunity
    });
    const built = generator.build(()=>{
        return tileMap.random();
    });
    const flattened = built.world.reduce(((agg, line)=> agg.concat(line)), []);
    built.world = null;
    tileMap.world = built;
    for(let lcv=0; lcv < tileMap.data.length; lcv++){
        tileMap.data[lcv] = flattened[lcv];
    }
}
