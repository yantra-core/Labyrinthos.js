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

export default function ALGORITHM_METROIDVANIA(tileMap, options={}) {
    try{
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
        let built = null;
        if(options.retries){
            let generated = false;
            let currentTry = 0;
            while(currentTry < options.retries && !generated){
                try{
                    currentTry++
                    built = generator.build(()=>{
                        return tileMap.random();
                    });
                    generated = true;
                }catch(ex){ console.log('RTX', ex)}
            }
        }else{
            built = generator.build(()=>{
                return tileMap.random();
            });
        }
        const flattened = built.world.reduce(((agg, line)=> agg.concat(line)), []);
        built.world = null;
        if(!built) throw new Error('failed to build world');
        tileMap.world = built;
        for(let lcv=0; lcv < tileMap.data.length; lcv++){
            tileMap.data[lcv] = flattened[lcv];
        }
    }catch(ex){
        console.log('MV generation error', ex);
    }
}
