import { defaultTileMap, WALL, DOOR, OPEN, EXIT, DIRECTIONS } from '../util/tileBuilder.js';
 
const TILE = defaultTileMap;

export const inDoorRange = (n, max, range)=>{
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

export const buildRoom = (options={}, roomHeight, roomWidth)=>{
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

// Builds a door between these two (hopefully) adjacent zones
export const buildDoorBetweenZones = (map, zonePos1, zonePos2)=>{
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