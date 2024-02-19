export const defaultTileMap = {
    VOID: 0,
    WALL: 1,
    FLOOR: 2,
    DOOR: 3,
    SPECIAL_DOOR: 4,
    ENTER: 5,
    EXIT: 6
};

export const WALL = 'wall';
export const DOOR = 'door';
export const OPEN = 'open';
export const EXIT = 'exit';
 
export const DIRECTIONS = ['n', 'e', 's', 'w'];

export const toCharGrid = (string='')=>{
    return string.split('\n').map(
        line => line.split('')
    );
};


export class Grid{
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