//
// TileMap
//
// Interface for the constructor options
interface TileMapOptions {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  depth?: number;
  tileWidth?: number;
  tileHeight?: number;
}

// TileMap class definition
declare class TileMap {
  x: number;
  y: number;
  width: number;
  height: number;
  depth: number;
  tileWidth: number;
  tileHeight: number;
  data: number[][] | number[];
  defaultRogueLike: string[];

  constructor(options?: TileMapOptions);

  initializeDataArray(): number[][] | number[];
  fill(value: number): void;
  fill2D(value: number): void;
  fill3D(value: number, z: number): void;
  random(max: number): number;
  seed(value: number): void;
  seedRandom(): void;
  use(subMap: TileMap, offsetX: number, offsetY: number): void;
  scaleToTileRange(tileSetRange: number): void;
  mask(format?: string[]): string[];
  applyBiome(biome: Biome): void; // Define the 'biome' type more precisely if possible
  getTileAt(x: number, y: number, z?: number): number;
  toJSON(): string;
  toTiledJSON(): any; // Define the return type more precisely if possible
  query(options: { x?: number; y?: number; width?: number; height?: number; z?: number; tileName?: string }): TileMap;
  query3D(options: { x?: number; y?: number; z?: number; width?: number; height?: number; depth?: number; tileName?: string }): any[]; // Define the return type more precisely if possible
  findTilesById(tileId: number): Array<{ x: number; y: number; z?: number }>;
  getTileIdByName(tileName: string): number;
}

//
// TileSet
//

// Interface for Tile objects
interface Tile {
  id: number;
  name: string;
  // Add other properties here as needed, such as 'properties' if they have a specific structure
}

// Interface for the constructor options
interface TileSetOptions {
  tiles?: Tile[];
}

// TileSet class definition
declare class TileSet {
  tiles: Tile[];
  constructor(options?: TileSetOptions);
  addTile(tile: Tile): void;
  getTile(id: number): Tile | undefined;
  getTileByName(name: string): Tile | undefined;
}

//
// LSystem
//

// Interface for the constructor options of LSystem
interface LSystemOptions {
  tileset: TileSet;
  axiom: string;
  rules: { [tileName: string]: string | ((context: RuleContext) => string) };
  generations: number;
}

// Interface for the context object passed to rule functions
interface RuleContext {
  tileId: number;
  tileName: string;
  getTileId: (tileName: string) => number | null;
  random: (max: number, min?: number) => number;
  tileMap: {
    width: number;
    height: number;
    depth: number;
  };
  getNeighbors: (x: number, y: number) => (number | undefined)[];
  position: {
    x: number;
    y: number;
    z: number;
  };
}

// LSystem class definition
declare class LSystem {
  tileset: TileSet;
  axiom: string;
  rules: { [tileName: string]: string | ((context: RuleContext) => string) };
  generations: number;

  constructor(options: LSystemOptions);

  getTileId(tileName: string): number | null;
  applyRule(tileId: number, tileMap: TileMap): number;
  applyTo(tileMap: TileMap): void;
}

//
// Biome
//

// Interface for the constructor options of Biome
interface BiomeOptions {
  name: string;
  tileset: TileSet;
  distribution?: { [tileId: number]: number }; // Assuming tile ID is a number and weight is also a number
}

// Biome class definition
declare class Biome {
  name: string;
  tileset: TileSet;
  distribution: { [tileId: number]: number };

  constructor(options: BiomeOptions);
  setDistribution(distribution: { [tileId: number]: number }): void;
}

//
// labyrinthos
//

// Define a generic type for maze generation functions
export type MazeGeneratorFunction = (tileMap: TileMap, options: any) => void; // Replace 'any' with a more specific type if you have a shared options structure


interface mazes {
  AldousBroder: MazeGeneratorFunction;
  AldousBroder3D: MazeGeneratorFunction;
  BinaryTree: MazeGeneratorFunction;
  CellularAutomata: MazeGeneratorFunction;
  EllersAlgorithm: MazeGeneratorFunction;
  GrowingTree: MazeGeneratorFunction;
  RecursiveBacktrack: MazeGeneratorFunction;
  RecursiveDivision: MazeGeneratorFunction;
  ThomasHunter: MazeGeneratorFunction;
  BeattieSchoberth: MazeGeneratorFunction;
  Metroidvania: MazeGeneratorFunction;
  // Add other mazes here following the same pattern
}

interface shapes {
  // Define shape generators here if they have a similar signature
  Circle: MazeGeneratorFunction;
  Square: MazeGeneratorFunction;
  Triangle: MazeGeneratorFunction;
}

interface terrains {
  FaultLine: MazeGeneratorFunction;
  PerlinNoise: MazeGeneratorFunction;
  // Define terrain generators here if they have a similar signature
}

interface Utils {
  // If the utilities have different signatures, define them individually
  // Otherwise, you can use a similar approach as with the mazes
}


interface labyrinthos {
  TileMap: typeof TileMap;
  TileSet: typeof TileSet;
  Biome: typeof Biome;
  LSystem: typeof LSystem;
  mazes: mazes;
  shapes: shapes;
  terrains: terrains;
  utils: Utils;
}

export {
  TileMap,
  TileSet,
  Biome,
  LSystem,
  mazes,
  labyrinthos
}

// import labyrinthos from './lib/labyrinthos';

//export default labyrinthos as Labyrinthos;
