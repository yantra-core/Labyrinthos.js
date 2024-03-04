/**
 * Metroidvania.js - Abbey Hawk Sparrow 2024
 * Originally written by Thomas Hunter II
 *
 * Originally written on June 12, 2013
 * Originally hosted at https://github.com/PhobosRising/javascript-roguelike-map-generator
 */
 
import { buildRoom, inDoorRange, buildDoorBetweenZones } from '../util/roomGeneration.js';
import { 
    defaultTileMap, 
    WALL, DOOR, OPEN, EXIT, DIRECTIONS, 
    toCharGrid, 
    Grid
} from '../util/tileBuilder.js';

import { platformGenerator } from '../util/platformGenerator.js';
 
const TILE = defaultTileMap;

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
        this.scale(data, roomWidth, roomHeight);
        return data;
    }
    
    scale(built, roomWidth, roomHeight){
        built.scaledExits = {};
        let chr = null;
        const offsetX = (coord)=>  coord + Math.floor(this.options.roomWidth/2);
        const offsetY = (coord)=> coord + Math.floor(this.options.roomHeight/2);
        const scaleX = (coord)=>  coord * this.options.roomWidth;
        const scaleY = (coord)=> coord * this.options.roomHeight;
        ['north', 'south', 'east', 'west'].forEach((direction)=>{
            chr = direction[0];
            const scaled = {
                x: built.exits[chr].x * this.options.roomWidth,
                y: (built.exits[chr].y * this.options.roomHeight)
            };
            built.scaledExits[direction] = [];
            switch(direction){
                case 'north':
                    scaled.x = offsetX(scaled.x);
                    built.scaledExits[direction].push(scaled);
                    built.scaledExits[direction].push({
                        x: scaled.x-1,
                        y: scaled.y
                    });
                    break;
                case 'south':
                    scaled.x = offsetX(scaled.x);
                    scaled.y += this.options.roomHeight-1;
                    built.scaledExits[direction].push(scaled);
                    built.scaledExits[direction].push({
                        x: scaled.x-1,
                        y: scaled.y
                    });
                    break;
                case 'east':
                    scaled.y = offsetY(scaled.y);
                    scaled.x += this.options.roomWidth-1;
                    built.scaledExits[direction].push(scaled);
                    built.scaledExits[direction].push({
                        x: scaled.x,
                        y: scaled.y-1
                    });
                    break;
                case 'west':
                    scaled.y = offsetY(scaled.y);
                    built.scaledExits[direction].push(scaled);
                    built.scaledExits[direction].push({
                        x: scaled.x,
                        y: scaled.y-1
                    });
                    break;
            }
        });
        built.scaledRooms = built.rooms.map((roomGroup)=>{
            return roomGroup.map(({x, y})=> ({x: scaleX(x), y: scaleY(y)}));
        });
    }
    
}

export default function ALGORITHM_METROIDVANIA(tileMap, options = {}) {
    // Constants for clarity and adaptability
    const WALL_FILL_VALUE = 0;
    const MIN_DIMENSION_THRESHOLD = 5;
    const SIZE_THRESHOLD = 10;
    const DOOR_DIFF_SMALL = 1;
    const DOOR_DIFF_LARGE = 2;
    const MAX_FAILS_ALLOWED = 25000;
    const ROOM_OCCUPANCY_RATIO = 0.8;
    const MIN_ROOM_RATIO = 0.25;

    // Fill tileMap with walls
    tileMap.fill(WALL_FILL_VALUE);

    const maxDimension = Math.max(tileMap.width, tileMap.height);
    if (maxDimension <= MIN_DIMENSION_THRESHOLD) {
        return;
    }

    let adjustedDimension = Math.sqrt(maxDimension);
    if (adjustedDimension % 2 !== 1) adjustedDimension++;
    const size = maxDimension < SIZE_THRESHOLD ? Math.floor(maxDimension / 2) : SIZE_THRESHOLD;
    const doorDiff = maxDimension < SIZE_THRESHOLD ? DOOR_DIFF_SMALL : DOOR_DIFF_LARGE;

    const roomSizeHeight = Math.floor(tileMap.width / size);
    const roomSizeWidth = Math.floor(tileMap.height / size);
    const numRoomsWide = Math.floor(tileMap.width / roomSizeHeight);
    const numRoomsHigh = Math.floor(tileMap.height / roomSizeWidth);

    const maxRoomCount = Math.floor(numRoomsWide * numRoomsHigh * ROOM_OCCUPANCY_RATIO);
    const minRoomCount = Math.floor(maxRoomCount * MIN_ROOM_RATIO);

    // Generator configuration with corrected height assignment
    const generator = new Metroidvania({
        roomWidth: roomSizeWidth,
        roomHeight: roomSizeHeight,
        maxFails: MAX_FAILS_ALLOWED,
        width: numRoomsWide,        // Max number of zones wide
        height: numRoomsHigh,       // Max number of zones tall (fixed typo)
        gridHeight: tileMap.height,
        gridWidth: tileMap.width,
        minZonesPerRoom: 1,
        maxZonesPerRoom: 3,
        minRoomsPerMap: minRoomCount,
        maxRoomsPerMap: maxRoomCount,
        newDoors: doorDiff,
        roomDiff: doorDiff,
        roomDiffOdds: 0.5
    });

    let built = null;
    const maxRetries = options.retries || 4; // safe number, 5-8 is fine, 10 can start to pause slower systems
    for (let attempt = 0; attempt < maxRetries; attempt++) {
        try {
            built = generator.build(() => tileMap.random());
            break; // Exit loop if build succeeds
        } catch (error) {
            if (attempt === maxRetries - 1) throw error; // Rethrow error on last attempt
        }
    }

    // Ensure built is not null before proceeding
    if (!built || !built.world) throw new Error('Failed to build world');

    const flattened = built.world.reduce((agg, line) => agg.concat(line), []);
    // Note: The next line might not be needed as it nullifies built.world, consider removing
    // built.world = null;

    // Map the flattened world back to the tileMap
    tileMap.world = built;
    for (let i = 0; i < tileMap.data.length; i++) {
        tileMap.data[i] = flattened[i];
    }
}
