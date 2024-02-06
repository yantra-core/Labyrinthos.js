(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.LABY = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Tile", {
  enumerable: true,
  get: function get() {
    return _Tile["default"];
  }
});
Object.defineProperty(exports, "TileMap", {
  enumerable: true,
  get: function get() {
    return _TileMap["default"];
  }
});
Object.defineProperty(exports, "labyrinthos", {
  enumerable: true,
  get: function get() {
    return _labyrinthos["default"];
  }
});
exports.utils = exports.terrains = exports.shapes = exports.mazes = void 0;
var _labyrinthos = _interopRequireDefault(require("./lib/labyrinthos.js"));
var _Tile = _interopRequireDefault(require("./lib/Tile.js"));
var _TileMap = _interopRequireDefault(require("./lib/TileMap.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var mazes = exports.mazes = _labyrinthos["default"].mazes;
var terrains = exports.terrains = _labyrinthos["default"].terrains;
var shapes = exports.shapes = _labyrinthos["default"].shapes;
var utils = exports.utils = _labyrinthos["default"].utils;

},{"./lib/Tile.js":4,"./lib/TileMap.js":5,"./lib/labyrinthos.js":7}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Biome = exports["default"] = /*#__PURE__*/function () {
  function Biome() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      name = _ref.name,
      tileset = _ref.tileset,
      _ref$distribution = _ref.distribution,
      distribution = _ref$distribution === void 0 ? {} : _ref$distribution;
    _classCallCheck(this, Biome);
    this.name = name;
    this.tileset = tileset; // An instance of TileSet
    this.distribution = distribution; // Key: tile ID, Value: weight
  }

  // Method to set weighted distribution for tiles
  _createClass(Biome, [{
    key: "setDistribution",
    value: function setDistribution(distribution) {
      this.distribution = distribution;
    }
  }]);
  return Biome;
}();

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var LSystem = exports["default"] = /*#__PURE__*/function () {
  function LSystem(_ref) {
    var tileset = _ref.tileset,
      axiom = _ref.axiom,
      rules = _ref.rules,
      generations = _ref.generations;
    _classCallCheck(this, LSystem);
    this.tileset = tileset; // TileSet instance
    this.axiom = axiom; // Initial state (as a tile name)
    this.rules = rules; // Transformation rules (using tile names)
    this.generations = generations; // Number of iterations
  }

  // Helper function to resolve a tile name to its ID using the TileSet
  _createClass(LSystem, [{
    key: "getTileId",
    value: function getTileId(tileName) {
      var tile = this.tileset.getTileByName(tileName);
      return tile ? tile.id : null; // Return null if tile name not found in TileSet
    }
  }, {
    key: "applyRule",
    value: function applyRule(tileId, tileMap) {
      var _this$tileset$getTile;
      // Resolve the tile ID to its name
      var tileName = (_this$tileset$getTile = this.tileset.getTile(tileId)) === null || _this$tileset$getTile === void 0 ? void 0 : _this$tileset$getTile.name;

      // If there's a rule for this tile, apply it
      if (tileName && this.rules[tileName]) {
        var resultTiles;

        // Create a context object to pass to the rule function
        var context = {
          // Current tile's properties
          tileId: tileId,
          tileName: tileName,
          // Function to get the ID of a tile by name
          getTileId: this.getTileId.bind(this),
          // Random function utility
          random: function random(max) {
            var min = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
            return tileMap.random(max, min);
          },
          // Information about the tile map
          tileMap: {
            width: tileMap.width,
            height: tileMap.height,
            depth: tileMap.depth || 0 // Assuming depth property exists for 3D maps
          },
          // Function to get neighboring tiles (example for 2D, extend for 3D if needed)
          getNeighbors: function getNeighbors(x, y) {
            return [tileMap.getTileAt(x + 1, y),
            // Right
            tileMap.getTileAt(x - 1, y),
            // Left
            tileMap.getTileAt(x, y + 1),
            // Bottom
            tileMap.getTileAt(x, y - 1) // Top
            // Add more directions as needed, e.g., diagonal neighbors
            ];
          },
          // Current position (assuming you can derive x, y, z from tileId)
          position: {
            x: tileId % tileMap.width,
            y: Math.floor(tileId / tileMap.width),
            z: tileMap.depth ? Math.floor(tileId / (tileMap.width * tileMap.height)) : 0 // For 3D maps
          }
        };
        if (typeof this.rules[tileName] === 'function') {
          resultTiles = [this.rules[tileName](context)]; // returns string
        }
        if (typeof this.rules[tileName] === 'string') {
          resultTiles = this.rules[tileName].split(' ');
        }

        // For simplicity, let's just use the first tile specified in the rule
        // More complex logic could be added here to handle multiple tiles
        return this.getTileId(resultTiles[0]);
      }

      // Default to no change if no rule exists for this tile
      return tileId;
    }
  }, {
    key: "applyTo",
    value: function applyTo(tileMap) {
      var _this = this;
      for (var gen = 0; gen < this.generations; gen++) {
        // Apply rules to each tile in the map for each generation
        tileMap.data = tileMap.data.map(function (tileId) {
          return _this.applyRule(tileId, tileMap);
        });
      }
    }
  }]);
  return LSystem;
}();

},{}],4:[function(require,module,exports){
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
// Not actually used anywhere
// Tiles are currently just a data structure, so they don't need to be instantiated
var Tile = exports["default"] = /*#__PURE__*/_createClass(function Tile() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
    id = _ref.id,
    name = _ref.name;
  _classCallCheck(this, Tile);
  this.id = id;
  this.name = name;
});

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _generateTiledJSON = _interopRequireDefault(require("./util/generateTiledJSON.js"));
var _mersenne = _interopRequireDefault(require("./util/mersenne.js"));
var _noise = _interopRequireDefault(require("./util/noise.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } // Exports to Tiled Editor JSON format
// Randomness
// Perlin Noise
var TileMap = exports["default"] = /*#__PURE__*/function () {
  function TileMap() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$x = _ref.x,
      x = _ref$x === void 0 ? 0 : _ref$x,
      _ref$y = _ref.y,
      y = _ref$y === void 0 ? 0 : _ref$y,
      _ref$width = _ref.width,
      width = _ref$width === void 0 ? 16 : _ref$width,
      _ref$height = _ref.height,
      height = _ref$height === void 0 ? 16 : _ref$height,
      _ref$depth = _ref.depth,
      depth = _ref$depth === void 0 ? 1 : _ref$depth,
      _ref$tileWidth = _ref.tileWidth,
      tileWidth = _ref$tileWidth === void 0 ? 16 : _ref$tileWidth,
      _ref$tileHeight = _ref.tileHeight,
      tileHeight = _ref$tileHeight === void 0 ? 16 : _ref$tileHeight,
      _ref$is3D = _ref.is3D,
      is3D = _ref$is3D === void 0 ? false : _ref$is3D;
    _classCallCheck(this, TileMap);
    this.x = x;
    this.y = y;
    // this.z = 0;
    this.width = width;
    this.height = height;
    this.depth = depth;
    this.tileWidth = tileWidth;
    this.tileHeight = tileHeight;
    this.mersenneTwister = new _mersenne["default"]();
    this.Noise = new _noise["default"]();
    this.noise = this.Noise.noise;
    this.seedNoise = this.Noise.noiseSeed;
    this.data = this.initializeDataArray();
    // ASCII representations for tiles 0-10
    // TODO: Is there a better default set of ASCII characters we can use?
    this.defaultRogueLike = ['-', '#', '+', '0', '<', '>', '$', '⌂', '@', '&', '?'];
    this.seedRandom();
  }
  _createClass(TileMap, [{
    key: "initializeDataArray",
    value: function initializeDataArray() {
      // Create a single-dimensional array
      var data;
      if (this.depth > 1) {
        data = init3DArray(this.width, this.height, this.depth);
      } else {
        data = init2DArray(this.width, this.height);
      }
      return data;
    }
  }, {
    key: "fill",
    value: function fill(value) {
      if (this.depth > 1) {
        for (var z = 0; z < this.depth; z++) {
          this.fill3D(value, z);
        }
      } else {
        this.fill2D(value);
      }
    }
  }, {
    key: "fill2D",
    value: function fill2D(value) {
      for (var i = 0; i < this.height * this.width; i++) {
        this.data[i] = value;
      }
    }
  }, {
    key: "fill3D",
    value: function fill3D(value, z) {
      for (var i = 0; i < this.height * this.width; i++) {
        this.data[z][i] = value;
      }
    }
  }, {
    key: "random",
    value: function random(max) {
      return this.mersenneTwister.rand(max);
    }
  }, {
    key: "seed",
    value: function seed(value) {
      if (typeof value === 'undefined') {
        value = this.random(6400000000);
      }
      this.mersenneTwister.seed(value);
      this.seedNoise(value);
      // this.mersenneTwister.seed_array([value]); // also can seed from arrays
    }
  }, {
    key: "seedRandom",
    value: function seedRandom() {
      this.seed(this.random(6400000000));
    }
  }, {
    key: "use",
    value: function use(subMap, offsetX, offsetY) {
      // TODO: add support for if(this.is3D) support
      for (var y = 0; y < subMap.height; y++) {
        for (var x = 0; x < subMap.width; x++) {
          var targetX = x + offsetX;
          var targetY = y + offsetY;
          if (targetX < this.width && targetY < this.height) {
            this.data[targetY * this.width + targetX] = subMap.data[y * subMap.width + x];
          }
        }
      }
    }
  }, {
    key: "scaleToTileRange",
    value: function scaleToTileRange(tileSetRange) {
      var heightMap = this.data;
      var max = Math.max.apply(Math, _toConsumableArray(heightMap));
      var min = Math.min.apply(Math, _toConsumableArray(heightMap));
      var range = tileSetRange - 1; // Adjust for zero index

      for (var i = 0; i < heightMap.length; i++) {
        var normalizedHeight = (heightMap[i] - min) / (max - min);
        this.data[i] = Math.round(normalizedHeight * range) + 1; // +1 to adjust range
      }
    }
  }, {
    key: "mask",
    value: function mask(format) {
      var asciiMasks = []; // Initialize an array to hold ASCII masks for each layer

      if (this.depth > 1) {
        var asciiLookup = format || this.defaultRogueLike;

        // Iterate through each layer of depth
        for (var z = 0; z < this.depth; z++) {
          var asciiMap = "";
          for (var y = 0; y < this.height; y++) {
            for (var x = 0; x < this.width; x++) {
              var tile = this.data[z][y * this.width + x]; // Access the correct layer in the 3D array
              asciiMap += asciiLookup[tile % asciiLookup.length]; // Use modulo to wrap around if tile index exceeds lookup table
            }
            asciiMap += '\n'; // New line at the end of each row
          }
          asciiMasks.push(asciiMap); // Add the ASCII map of the current layer to the array
        }
        return asciiMasks; // Return the array of ASCII masks
      } else {
        // Handle the 2D case as before
        var _asciiMap = '';
        var _asciiLookup = format || this.defaultRogueLike;
        for (var _y = 0; _y < this.height; _y++) {
          for (var _x = 0; _x < this.width; _x++) {
            var _tile = this.data[_y * this.width + _x];
            _asciiMap += _asciiLookup[_tile % _asciiLookup.length];
          }
          _asciiMap += '\n';
        }
        // For consistency, wrap the 2D mask in an array as well
        return [_asciiMap];
      }
    }
  }, {
    key: "applyBiome",
    value: function applyBiome(biome) {
      var tileMap = this;
      var noiseValues = tileMap.data; // Array of noise values
      var weights = biome.distribution; // Object with tile names as keys and weights as values
      var tileNames = Object.keys(weights); // Array of tile names
      var totalWeight = tileNames.reduce(function (total, name) {
        return total + weights[name];
      }, 0);
      var weightedRanges = tileNames.map(function (name, index) {
        return {
          name: name,
          end: tileNames.slice(0, index + 1).reduce(function (sum, name) {
            return sum + weights[name];
          }, 0) / totalWeight
        };
      });
      var _loop = function _loop() {
        var noiseValue = noiseValues[i];
        var selectedTileName = weightedRanges.find(function (range) {
          return noiseValue <= range.end;
        }).name;
        var tileId = biome.tileset.getTileByName(selectedTileName).id;
        tileMap.data[i] = tileId;
      };
      for (var i = 0; i < noiseValues.length; i++) {
        _loop();
      }
    }
  }, {
    key: "getTileAt",
    value: function getTileAt(x, y, z) {
      if (this.is3D) {
        return this.data[z][y * this.width + x];
      } else {
        return this.data[y * this.width + x];
      }
    }
  }, {
    key: "toJSON",
    value: function toJSON() {
      return JSON.stringify({
        width: this.width,
        height: this.height,
        tileWidth: this.tileWidth,
        tileHeight: this.tileHeight,
        data: this.data
      }, null, 2);
    }
  }, {
    key: "toTiledJSON",
    value: function toTiledJSON() {
      return (0, _generateTiledJSON["default"])(this);
    }
  }, {
    key: "query",
    value: function query() {
      var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        x = _ref2.x,
        y = _ref2.y,
        width = _ref2.width,
        height = _ref2.height,
        z = _ref2.z,
        tileName = _ref2.tileName;
      var results = [];
      if (x !== undefined && y !== undefined && width !== undefined && height !== undefined) {
        for (var offsetY = 0; offsetY < height; offsetY++) {
          for (var offsetX = 0; offsetX < width; offsetX++) {
            var queryX = x + offsetX;
            var queryY = y + offsetY;
            if (queryX >= this.width || queryY >= this.height) {
              results.push(undefined); // Add undefined for out-of-bounds indices
            } else {
              var index = queryY * this.width + queryX; // Calculate the correct index in the 1D array
              if (this.is3D) {
                if (z !== undefined && this.data[z] && this.data[z][index] !== undefined) {
                  results.push(this.data[z][index]);
                } else {
                  results.push(undefined);
                }
              } else {
                if (this.data[index] !== undefined) {
                  results.push(this.data[index]);
                } else {
                  results.push(undefined);
                }
              }
            }
          }
        }
      }

      // create a new TileMap instance from the results
      var subsection = new TileMap({
        width: width,
        height: height,
        is3D: this.is3D
      });
      subsection.data = results;
      return subsection;
    }
  }, {
    key: "query3D",
    value:
    // query3D is WIP - not fully implemented yet, see: ./test/tilemap-query-test.js 
    function query3D() {
      var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        x = _ref3.x,
        y = _ref3.y,
        z = _ref3.z,
        width = _ref3.width,
        height = _ref3.height,
        depth = _ref3.depth,
        tileName = _ref3.tileName;
      var results = [];
      if (x !== undefined && y !== undefined && z !== undefined && width !== undefined && height !== undefined && depth !== undefined) {
        for (var offsetZ = 0; offsetZ < depth; offsetZ++) {
          for (var offsetY = 0; offsetY < height; offsetY++) {
            for (var offsetX = 0; offsetX < width; offsetX++) {
              var queryX = x + offsetX;
              var queryY = y + offsetY;
              var queryZ = z + offsetZ;
              if (queryX >= this.width || queryY >= this.height || queryZ >= this.depth) {
                results.push(undefined); // Add undefined for out-of-bounds indices
              } else {
                // Calculate the correct index in the 3D array
                var index = queryZ * this.width * this.height + queryY * this.width + queryX;
                if (this.data[index] !== undefined) {
                  results.push(this.data[index]);
                } else {
                  results.push(undefined);
                }
              }
            }
          }
        }
      }

      // Additional logic to filter results by tileName, if provided
      if (tileName !== undefined) {
        var tileId = this.getTileIdByName(tileName); // Assuming a getTileIdByName function exists to map tile names to IDs
        results = results.filter(function (tile) {
          return tile === tileId;
        });
      }
      return results;
    }

    // Helper function to find tiles by ID
  }, {
    key: "findTilesById",
    value: function findTilesById(tileId) {
      var positions = [];
      var depth = this.is3D ? this.data.length : 1;
      for (var z = 0; z < depth; z++) {
        var layer = this.is3D ? this.data[z] : this.data;
        for (var i = 0; i < layer.length; i++) {
          if (layer[i] === tileId) {
            var x = i % this.width;
            var y = Math.floor(i / this.width);
            positions.push(this.is3D ? {
              x: x,
              y: y,
              z: z
            } : {
              x: x,
              y: y
            });
          }
        }
      }
      return positions;
    }
  }, {
    key: "getTileIdByName",
    value:
    // Example method to get tile ID by name (you'll need to implement this based on your tileset)
    function getTileIdByName(tileName) {
      // This is a placeholder function. You should implement it based on how your tileset is structured.
      // For example, if you have a mapping of tile names to tile IDs, you would use that here.
      // Return an example tile ID for demonstration
      return 1; // Assume tile ID 1 corresponds to the given tile name
    }
  }]);
  return TileMap;
}();
function init2DArray(width, height) {
  // Create a single-dimensional array
  return new Array(width * height).fill(0); // Fill with default tile type, e.g., 0
}
function init3DArray(width, height, depth) {
  var arr = [];
  for (var z = 0; z < depth; z++) {
    arr.push(init2DArray(width, height));
  }
  return arr;
}

/* default roguelike `TileSet` mappings
{
  "void": 0,
  "wall": 1,
  "floor": 2,
  "door": 3,
  "special_door": 4,
  "enter": 5,
  "exit": 6,
  "entity": 7,
  "block": 8,
  "bush": 9,
  "grass": 10
}
*/

},{"./util/generateTiledJSON.js":25,"./util/mersenne.js":26,"./util/noise.js":27}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var TileSet = exports["default"] = /*#__PURE__*/function () {
  function TileSet() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$tiles = _ref.tiles,
      tiles = _ref$tiles === void 0 ? [] : _ref$tiles;
    _classCallCheck(this, TileSet);
    // tiles is array of tile objects with id, name, and properties, etc.
    this.tiles = tiles;
  }
  _createClass(TileSet, [{
    key: "addTile",
    value: function addTile(tile) {
      this.tiles.push(tile);
    }
  }, {
    key: "getTile",
    value: function getTile(id) {
      // search through array of tile objects for tile with matching id
      var tile = this.tiles.find(function (tile) {
        return tile.id === id;
      });
      return tile;
    }
  }, {
    key: "getTileByName",
    value: function getTileByName(name) {
      // search through array of tile objects for tile with matching name
      var tile = this.tiles.find(function (tile) {
        return tile.name === name;
      });
      return tile;
    }
  }]);
  return TileSet;
}();

},{}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _Tile = _interopRequireDefault(require("./Tile.js"));
var _TileMap = _interopRequireDefault(require("./TileMap.js"));
var _TileSet = _interopRequireDefault(require("./TileSet.js"));
var _Biome = _interopRequireDefault(require("./Biome.js"));
var _AldousBroder = _interopRequireDefault(require("./mazes/AldousBroder.js"));
var _AldousBroder3D = _interopRequireDefault(require("./mazes/AldousBroder3D.js"));
var _BinaryTree = _interopRequireDefault(require("./mazes/BinaryTree.js"));
var _CellularAutomata = _interopRequireDefault(require("./mazes/CellularAutomata.js"));
var _EllersAlgorithm = _interopRequireDefault(require("./mazes/EllersAlgorithm.js"));
var _GrowingTree = _interopRequireDefault(require("./mazes/GrowingTree.js"));
var _RecursiveBacktrack = _interopRequireDefault(require("./mazes/RecursiveBacktrack.js"));
var _RecursiveDivision = _interopRequireDefault(require("./mazes/RecursiveDivision.js"));
var _ThomasHunter = _interopRequireDefault(require("./mazes/ThomasHunter.js"));
var _BeattieSchoberth = _interopRequireDefault(require("./mazes/BeattieSchoberth.js"));
var _Metroidvania = _interopRequireDefault(require("./mazes/Metroidvania.js"));
var _Circle = _interopRequireDefault(require("./shapes/Circle.js"));
var _Square = _interopRequireDefault(require("./shapes/Square.js"));
var _Triangle = _interopRequireDefault(require("./shapes/Triangle.js"));
var _LSystem = _interopRequireDefault(require("./LSystem.js"));
var _FaultLine = _interopRequireDefault(require("./terrains/FaultLine.js"));
var _PerlinNoise = _interopRequireDefault(require("./terrains/PerlinNoise.js"));
var _noise = _interopRequireDefault(require("./util/noise.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// Mazes

// import HuntAndKill from './mazes/HuntAndKill.js';

// import SpiralBacktrack from './mazes/SpiralBacktrack.js';

// import TremauxsAlgorithm from './mazes/TremauxsAlgorithm.js';
// import VoronoiDiagram from './mazes/VoronoiDiagram.js';

// Shapes

// import Hexagon from './shapes/Hexagon.js';

// L-Systems

// Biomes
// TODO: Add biomes
// Forest, Swamp, Plains, Mountain, Island

// Terrains
// https://en.wikipedia.org/wiki/Diamond-square_algorithm
// import DiamondSquare from './terrains/DiamondSquare.js';

// Utilities / Various

// import mapImageToTileMap from './util/mapImageToTileMap.js';

var labyrinthos = {};
labyrinthos.mazes = {};
labyrinthos.mazes.AldousBroder = _AldousBroder["default"];
labyrinthos.mazes.AldousBroder3D = _AldousBroder3D["default"];
labyrinthos.mazes.BinaryTree = _BinaryTree["default"];
labyrinthos.mazes.CellularAutomata = _CellularAutomata["default"];
labyrinthos.mazes.EllersAlgorithm = _EllersAlgorithm["default"];
labyrinthos.mazes.GrowingTree = _GrowingTree["default"];
// labyrinthos.mazes.HuntAndKill = HuntAndKill;
labyrinthos.mazes.RecursiveBacktrack = _RecursiveBacktrack["default"];
labyrinthos.mazes.RecursiveDivision = _RecursiveDivision["default"];
// labyrinthos.mazes.SpiralBacktrack = SpiralBacktrack;
labyrinthos.mazes.BeattieSchoberth = _BeattieSchoberth["default"];
labyrinthos.mazes.ThomasHunter = _ThomasHunter["default"];
labyrinthos.mazes.Metroidvania = _Metroidvania["default"];
labyrinthos.mazes.PlatformZones = _Metroidvania["default"]; // legacy API support
// labyrinthos.mazes.TremauxsAlgorithm = TremauxsAlgorithm;
// labyrinthos.mazes.VoronoiDiagram = VoronoiDiagram;

labyrinthos.shapes = {};
labyrinthos.shapes.Circle = _Circle["default"];
labyrinthos.shapes.Square = _Square["default"];
// labyrinthos.shapes.Hexagon = Hexagon;
labyrinthos.shapes.Triangle = _Triangle["default"];
labyrinthos.terrains = {};
// labyrinthos.terrains.DiamondSquare = DiamondSquare;
labyrinthos.terrains.FaultLine = _FaultLine["default"];
labyrinthos.terrains.PerlinNoise = _PerlinNoise["default"];
labyrinthos.utils = {};
labyrinthos.utils.noise = _noise["default"];
// labyrinthos.utils.mapImageToTileMap = mapImageToTileMap;

labyrinthos.Biome = _Biome["default"];
labyrinthos.LSystem = _LSystem["default"];
labyrinthos.Tile = _Tile["default"];
labyrinthos.TileMap = _TileMap["default"];
labyrinthos.TileSet = _TileSet["default"];
var _default = exports["default"] = labyrinthos;

},{"./Biome.js":2,"./LSystem.js":3,"./Tile.js":4,"./TileMap.js":5,"./TileSet.js":6,"./mazes/AldousBroder.js":8,"./mazes/AldousBroder3D.js":9,"./mazes/BeattieSchoberth.js":10,"./mazes/BinaryTree.js":11,"./mazes/CellularAutomata.js":12,"./mazes/EllersAlgorithm.js":13,"./mazes/GrowingTree.js":14,"./mazes/Metroidvania.js":15,"./mazes/RecursiveBacktrack.js":16,"./mazes/RecursiveDivision.js":17,"./mazes/ThomasHunter.js":18,"./shapes/Circle.js":19,"./shapes/Square.js":20,"./shapes/Triangle.js":21,"./terrains/FaultLine.js":22,"./terrains/PerlinNoise.js":23,"./util/noise.js":27}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = ALGORITHM_ALDOUS_BRODER;
// AldousBroder.js - Marak Squires 2024
// "Aldous-Broder algorithm" - https://en.wikipedia.org/wiki/Maze_generation_algorithm#Aldous-Broder_algorithm
function ALGORITHM_ALDOUS_BRODER(tileMap, options) {
  tileMap.fill(1); // Fill with walls
  var visitedCells = 0;
  var totalCells = tileMap.width * tileMap.height / 4; // Assumes a grid where every other cell is open
  var currentX = 2 * Math.floor(tileMap.random() * Math.floor(tileMap.width / 2));
  var currentY = 2 * Math.floor(tileMap.random() * Math.floor(tileMap.height / 2));
  tileMap.data[currentY * tileMap.width + currentX] = 0; // Open starting cell
  visitedCells++;
  while (visitedCells < totalCells) {
    var directions = [[2, 0], [-2, 0], [0, 2], [0, -2]];
    var randomDirection = directions[Math.floor(tileMap.random() * directions.length)];
    var newX = currentX + randomDirection[0];
    var newY = currentY + randomDirection[1];
    if (newX >= 0 && newX < tileMap.width && newY >= 0 && newY < tileMap.height) {
      if (tileMap.data[newY * tileMap.width + newX] === 1) {
        // Open path between current cell and new cell
        tileMap.data[(currentY + randomDirection[1] / 2) * tileMap.width + (currentX + randomDirection[0] / 2)] = 0;
        tileMap.data[newY * tileMap.width + newX] = 0; // Open new cell
        visitedCells++;
      }
      currentX = newX;
      currentY = newY;
    }
  }
}

},{}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = ALGORITHM_ALDOUS_BRODER_3D;
// AldousBroder3D.js - Marak Squires 2024
// "Aldous-Broder algorithm" - https://en.wikipedia.org/wiki/Maze_generation_algorithm#Aldous-Broder_algorithm
function ALGORITHM_ALDOUS_BRODER_3D(tileMap, options) {
  tileMap.fill(1); // Fill with walls
  var visitedCells = 0;
  var totalCells = tileMap.width * tileMap.height * tileMap.depth / 8; // Assumes a grid where every other cell is open in 3D
  var currentX = 2 * Math.floor(Math.random() * Math.floor(tileMap.width / 2));
  var currentY = 2 * Math.floor(Math.random() * Math.floor(tileMap.height / 2));
  var currentZ = 2 * Math.floor(Math.random() * Math.floor(tileMap.depth / 2));
  tileMap.data[currentZ][currentY * tileMap.width + currentX] = 0; // Open starting cell
  visitedCells++;
  while (visitedCells < totalCells) {
    var directions = [[2, 0, 0], [-2, 0, 0], [0, 2, 0], [0, -2, 0], [0, 0, 2], [0, 0, -2]];
    var randomDirection = directions[Math.floor(Math.random() * directions.length)];
    var newX = currentX + randomDirection[0];
    var newY = currentY + randomDirection[1];
    var newZ = currentZ + randomDirection[2];
    if (newX >= 0 && newX < tileMap.width && newY >= 0 && newY < tileMap.height && newZ >= 0 && newZ < tileMap.depth) {
      if (tileMap.data[newZ][newY * tileMap.width + newX] === 1) {
        // Open path between current cell and new cell
        tileMap.data[currentZ + randomDirection[2] / 2][(currentY + randomDirection[1] / 2) * tileMap.width + (currentX + randomDirection[0] / 2)] = 0;
        tileMap.data[newZ][newY * tileMap.width + newX] = 0; // Open new cell
        visitedCells++;
      }
      currentX = newX;
      currentY = newY;
      currentZ = newZ;
    }
  }
}

},{}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BeattieSchoberthBuilder = exports.BeattieSchoberth = void 0;
exports["default"] = ALGORITHM_BEATTIE_SCHOBERTH;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * Originally written for a game called "Isolated" in collaboration with Andrew Beattie and Greg Schoberth
 *
 * Originally written on June 12, 2013
 * Originally hosted at https://github.com/PhobosRising/javascript-roguelike-map-generator
 */

var MAX_X = 201;
var MAX_Y = 201;
var DIR = ['n', 'e', 's', 'w'];

//const rand = require('../../utility/random/index.js');
var BeattieSchoberth = exports.BeattieSchoberth = /*#__PURE__*/function () {
  function BeattieSchoberth(_ref) {
    var rooms = _ref.rooms,
      keys = _ref.keys;
    _classCallCheck(this, BeattieSchoberth);
    this.maxRooms = rooms;
    this.maxKeys = keys;
    if (this.maxRooms < 2) {
      console.error("Room count ".concat(this.maxRooms, " needs to be at least two (entrance and exit)."));
      this.maxRooms = 2;
    }
    if (this.maxKeys > this.maxRooms - 2) {
      console.error("Key count ".concat(this.maxKeys, " is greater than rooms ").concat(this.maxRooms, " minus two (entrance and exit). Reducing keys by two."));
      this.maxKeys = this.maxRooms - 2;
    }
    this.build = this.generate;
    this.reset();
  }
  _createClass(BeattieSchoberth, [{
    key: "render",
    value: function render() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var bld = arguments.length > 1 ? arguments[1] : undefined;
      var NULL_KEY = '\x1b[1;37m';
      var ENTER_EXIT = '\x1b[7m';
      var KEY_COLORS = {
        0: '\x1b[1;31m' || options['0'],
        1: '\x1b[1;32m' || options['1'],
        2: '\x1b[1;34m' || options['2'],
        3: '\x1b[1;33m' || options['3'],
        4: '\x1b[1;35m' || options['4'],
        5: '\x1b[1;36m' || options['5']
      };
      var generated = bld || this.generate();
      var grid = generated.grid;
      var result = '';
      for (var y = 0; y < generated.size.height; y++) {
        var row1 = ''; // room numbers and hyphens
        var row2 = ''; // pipes
        for (var x = 0; x < generated.size.width; x++) {
          var roomId = grid[y][x];
          var room = generated.rooms[roomId];
          if (!room) {
            row1 += '    ';
            row2 += '    ';
            continue;
          }
          var color = KEY_COLORS[room.keyInRoom] || NULL_KEY;
          if (room.entrance || room.exit) {
            color = ENTER_EXIT;
          }
          row1 += color + String(roomId).padStart(3, '0') + '\x1b[0m';
          //row1 += colors[color](String(roomId).padStart(3, '0'));

          if (room.doors.e !== null) {
            var door = generated.doors[room.doors.e];
            var _color = KEY_COLORS[door.key] || NULL_KEY;
            //row1 += colors[color]('-');
            row1 += _color + '-' + '\x1b[0m';
          } else {
            row1 += ' ';
          }
          if (room.doors.s !== null) {
            var _door = generated.doors[room.doors.s];
            var _color2 = KEY_COLORS[_door.key] || NULL_KEY;
            //row2 += colors[color]('  | ');
            row2 += _color2 + '  | ' + '\x1b[0m';
          } else {
            row2 += '    ';
          }
        }
        result += row1 + '\n';
        result += row2 + '\n';
      }
      return result;
    }
  }, {
    key: "reset",
    value: function reset() {
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
        n: new Map(),
        // X => roomId
        e: new Map(),
        // Y => roomId
        s: new Map(),
        // X => roomId
        w: new Map() // Y => roomId
      };
      this.lockPool = new Map();
      this.maxDistance = 0;
    }
  }, {
    key: "generate",
    value: function generate(random) {
      this.random = random ? random : function () {
        return Math.random();
      };
      this.reset();

      /*const root = */
      this.addRoom(this.seed.x, this.seed.y);
      for (var i = 0; i < this.maxRooms - 1; i++) {
        var dir = DIR[Math.floor(random() * DIR.length)]; // Which direction are we adding a room from

        var x = void 0,
          y = void 0,
          parentRoom = void 0;
        if (dir === 'n') {
          // Sliding southward from north
          x = Math.floor(random() * (this.bounds.e - this.bounds.w)) + this.bounds.w;
          var parentRoomId = this.furthest.n.get(x);
          parentRoom = this.rooms[parentRoomId];
          y = parentRoom.y - 1;
        } else if (dir === 'e') {
          // Sliding westward from east
          y = Math.floor(random() * (this.bounds.s - this.bounds.n)) + this.bounds.n;
          var _parentRoomId = this.furthest.e.get(y);
          parentRoom = this.rooms[_parentRoomId];
          x = parentRoom.x + 1;
        } else if (dir === 's') {
          // Sliding northward from south
          x = Math.floor(random() * (this.bounds.e - this.bounds.w)) + this.bounds.w;
          var _parentRoomId2 = this.furthest.s.get(x);
          parentRoom = this.rooms[_parentRoomId2];
          y = parentRoom.y + 1;
        } else if (dir === 'w') {
          // Sliding eastward from west
          y = Math.floor(random() * (this.bounds.s - this.bounds.n)) + this.bounds.n;
          var _parentRoomId3 = this.furthest.w.get(y);
          parentRoom = this.rooms[_parentRoomId3];
          x = parentRoom.x - 1;
        }
        var newRoomId = this.addRoom(x, y);
        /*const d = */
        this.addDoor(parentRoom.id, newRoomId);
      }
      var CHILD_THRESHOLD = this.rooms.length / (this.maxKeys + 1);
      var lockedRoom = this.getHighestDistanceRoom();
      var roomToBeLocked = lockedRoom.id;
      this.setExit(roomToBeLocked);
      for (var _i = 0; _i < this.maxKeys; _i++) {
        var ascended = this.findRoomParentWithAtMostChildren(this.rooms[roomToBeLocked], CHILD_THRESHOLD);
        if (!ascended) {
          console.error('exhausted possible lockable rooms! giving up.');
          break;
        }
        this.removeRoomAndChildrenFromLockPool(ascended);
        this.decrementChildrenCountAllParents(ascended);
        var roomToPutKeyIn = this.getHighestDistanceRoom();
        if (!roomToPutKeyIn) {
          console.error('Cannot find a room to put a key in! Cancelling lock. Level should still be beatable.');
          break;
        }
        this.lock(ascended.id - 1, roomToPutKeyIn.id); // TODO: HACK: door between room and parent has ID of parentId - 1

        roomToBeLocked = roomToPutKeyIn.id;
      }
      var _this$squish = this.squish(),
        width = _this$squish.width,
        height = _this$squish.height;
      var grid = this.generateGrid(width, height);
      this.classifyRooms();
      return {
        size: {
          width: width,
          height: height
        },
        terminals: {
          entrance: this.entrance,
          exit: this.exit,
          deadends: this.deadends
        },
        //rooms: this.rooms,
        rooms: this.rooms.map(function (r) {
          // Hide internal data structures from outside world
          delete r.children;
          delete r.childrenCount;
          delete r.parent;
          return r;
        }),
        doors: this.doors.map(function (d) {
          d.rooms = d.rooms.map(function (r) {
            return r.id;
          });
          return d;
        }),
        keys: this.keys,
        grid: grid
      };
    }

    /**
    * Shrink the boundaries of the map
    * Set a new X/Y for every room
    * @return smallest {width,height} required to fit map
    */
  }, {
    key: "squish",
    value: function squish() {
      var width = this.bounds.e - this.bounds.w + 1;
      var height = this.bounds.s - this.bounds.n + 1;
      var xShift = this.bounds.w;
      var yShift = this.bounds.n;
      var _iterator = _createForOfIteratorHelper(this.rooms),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var room = _step.value;
          room.x -= xShift;
          room.y -= yShift;
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      return {
        width: width,
        height: height
      };
    }
  }, {
    key: "addRoom",
    value: function addRoom(x, y) {
      var roomId = this.rooms.length;
      this.stretch(x, y);
      this.further(x, y, roomId);
      var room = {
        id: roomId,
        x: x,
        y: y,
        children: new Set(),
        childrenCount: 0,
        parent: null,
        keyInRoom: null,
        template: 'F1',
        distance: roomId === 0 ? 0 : null,
        // Distance from room[0] / spawn
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
  }, {
    key: "further",
    value: function further(x, y, roomId) {
      var mostNorth = this.furthest.n.get(x);
      if (typeof mostNorth === 'undefined' || this.rooms[mostNorth].y > y) {
        this.furthest.n.set(x, roomId);
      }
      var mostEast = this.furthest.e.get(y);
      if (typeof mostEast === 'undefined' || this.rooms[mostEast].x < x) {
        this.furthest.e.set(y, roomId);
      }
      var mostSouth = this.furthest.s.get(x);
      if (typeof mostSouth === 'undefined' || this.rooms[mostSouth].y < y) {
        this.furthest.s.set(x, roomId);
      }
      var mostWest = this.furthest.w.get(y);
      if (typeof mostWest === 'undefined' || this.rooms[mostWest].x > x) {
        this.furthest.w.set(y, roomId);
      }
    }
  }, {
    key: "stretch",
    value: function stretch(x, y) {
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
  }, {
    key: "classifyRooms",
    value: function classifyRooms() {
      this.deadends = [];
      var _iterator2 = _createForOfIteratorHelper(this.rooms),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var room = _step2.value;
          var doors = 0;
          if (room.doors.n !== null) doors++;
          if (room.doors.e !== null) doors++;
          if (room.doors.s !== null) doors++;
          if (room.doors.w !== null) doors++;
          if (doors === 1) {
            // D (Dead End)
            this.deadends.push(room.id);
            if (room.doors.n !== null) {
              room.template = 'D1';
            } else if (room.doors.e !== null) {
              room.template = 'D2';
            } else if (room.doors.s !== null) {
              room.template = 'D3';
            } else if (room.doors.w !== null) {
              room.template = 'D4';
            }
          } else if (doors === 2) {
            // B (Bend) or C (Corridoor)
            if (room.doors.n !== null && room.doors.s !== null) {
              room.template = 'C1';
            } else if (room.doors.e !== null && room.doors.w !== null) {
              room.template = 'C2';
            } else if (room.doors.n !== null && room.doors.e !== null) {
              room.template = 'B1';
            } else if (room.doors.e !== null && room.doors.s !== null) {
              room.template = 'B2';
            } else if (room.doors.s !== null && room.doors.w !== null) {
              room.template = 'B3';
            } else if (room.doors.w !== null && room.doors.n !== null) {
              room.template = 'B4';
            }
          } else if (doors === 3) {
            // E
            if (room.doors.s === null) {
              room.template = 'E1';
            } else if (room.doors.w === null) {
              room.template = 'E2';
            } else if (room.doors.n === null) {
              room.template = 'E3';
            } else if (room.doors.e === null) {
              room.template = 'E4';
            }
          } else if (doors === 4) {
            // A (All)
            room.template = 'A1';
          } else {
            // F (Fucked)
            room.template = 'F1';
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    }

    /**
    * @param rooms Array of two door IDs
    *
    * @return doorId
    */
  }, {
    key: "addDoor",
    value: function addDoor(parentRoomId, childRoomId) {
      var parentRoom = this.rooms[parentRoomId];
      var childRoom = this.rooms[childRoomId];
      var doorId = this.doors.length;
      var orientation = null;
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
        orientation: orientation,
        exit: false,
        rooms: [parentRoom, childRoom]
      });
      return doorId;
    }
  }, {
    key: "increaseChildrenCountAllParents",
    value: function increaseChildrenCountAllParents(room) {
      //eslint-disable-next-line no-cond-assign
      while (room = room.parent) {
        room.childrenCount++;
      }
    }
  }, {
    key: "registerRoomDistanceLockPool",
    value: function registerRoomDistanceLockPool(roomId) {
      var room = this.rooms[roomId];
      var distance = room.distance;
      if (!this.lockPool.get(distance)) {
        this.lockPool.set(distance, new Set());
      }
      this.lockPool.get(distance).add(room);
      if (distance > this.maxDistance) {
        this.maxDistance = distance;
      }
    }
  }, {
    key: "removeFromLockPool",
    value: function removeFromLockPool(room) {
      var distance = room.distance;
      var pool = this.lockPool.get(distance);
      if (!pool) {
        console.error("no pool of depth ".concat(distance));
        return;
      }
      pool["delete"](room);

      //if (pool.size === 0) {
      //console.log('pool is now empty, removing pool');
      //console.log(`this should be deepest room total! my: ${distance}, max: ${this.maxDistance}`);
      //this.lockPool.delete(pool);
      ////this.maxDistance--; // get removed out of order
      //}
    }
  }, {
    key: "getHighestDistanceRoom",
    value: function getHighestDistanceRoom() {
      // TODO: This is slow, iterates every distance pool
      for (var i = this.maxDistance; i > 0; i--) {
        var collection = this.lockPool.get(i);
        if (!collection.size) {
          continue;
        }
        var item = collection.values().next().value;
        return item;
      }
      return null;
    }
  }, {
    key: "findRoomParentWithAtMostChildren",
    value: function findRoomParentWithAtMostChildren(room, count) {
      if (!room) {
        throw new Error('bad room');
      }
      var parent;
      //eslint-disable-next-line no-cond-assign
      while (parent = room.parent) {
        if (parent.childrenCount + 1 > count) {
          return room;
        }
        room = parent;
      }
      return room;
    }
  }, {
    key: "decrementChildrenCountAllParents",
    value: function decrementChildrenCountAllParents(room) {
      var decrementCount = room.childrenCount + 1;
      while (room) {
        room.childrenCount -= decrementCount;
        room = room.parent;
      }
    }
  }, {
    key: "removeRoomAndChildrenFromLockPool",
    value: function removeRoomAndChildrenFromLockPool(room) {
      this.removeFromLockPool(room);
      var _iterator3 = _createForOfIteratorHelper(room.children),
        _step3;
      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var child = _step3.value;
          this.removeFromLockPool(child);
          this.removeRoomAndChildrenFromLockPool(child);
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
    }

    /**
    * Locks a door, putting the key in the specified room
    * @return keyId
    */
  }, {
    key: "lock",
    value: function lock(doorId, roomId) {
      var door = this.doors[doorId];
      var location = this.rooms[roomId];
      var keyId = this.keys.length;
      if (!door) {
        throw new Error("Invalid door ".concat(doorId));
      }
      if (!location) {
        throw new Error("Invalid room ".concat(roomId));
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
  }, {
    key: "generateGrid",
    value: function generateGrid(width, height) {
      var grid = [];
      for (var y = 0; y < height; y++) {
        var row = [];
        for (var x = 0; x < width; x++) {
          row.push(null);
        }
        grid.push(row);
      }
      var self = this;
      function addRoomToGrid(roomId) {
        var room = self.rooms[roomId];
        grid[room.y][room.x] = room.id;
        var _iterator4 = _createForOfIteratorHelper(room.children),
          _step4;
        try {
          for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
            var child = _step4.value;
            addRoomToGrid(child.id);
          }
        } catch (err) {
          _iterator4.e(err);
        } finally {
          _iterator4.f();
        }
      }
      addRoomToGrid(0);
      return grid;
    }
  }, {
    key: "setExit",
    value: function setExit(roomId) {
      var room = this.rooms[roomId];
      if (!room) {
        throw new Error("invalid room id ".concat(roomId));
      }
      room.exit = true;
      if (room.doors.n !== null) this.doors[room.doors.n].exit = true;
      if (room.doors.e !== null) this.doors[room.doors.e].exit = true;
      if (room.doors.s !== null) this.doors[room.doors.s].exit = true;
      if (room.doors.w !== null) this.doors[room.doors.w].exit = true;
      this.exit = roomId;
    }
  }]);
  return BeattieSchoberth;
}();
var TILE = {
  VOID: 0,
  WALL: 1,
  FLOOR: 2,
  DOOR: 3,
  SPECIAL_DOOR: 4,
  ENTER: 5,
  EXIT: 6
};
var toCharGrid = function toCharGrid() {
  var string = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return string.split('\n').map(function (line) {
    return line.split('');
  });
};
var Grid = /*#__PURE__*/function () {
  function Grid() {
    var str = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    _classCallCheck(this, Grid);
    this.grid = toCharGrid(str);
  }
  _createClass(Grid, [{
    key: "overlay",
    value: function overlay(subgrid, y, x) {
      var grid = Array.isArray(subgrid) ? subgrid : toCharGrid(subgrid);
      for (var row = 0; row < grid.length; row++) {
        for (var col = 0; col < grid[row].length; col++) {
          if (!this.grid[x + row]) this.grid[x + row] = [];
          this.grid[x + row][y + col] = grid[row][col];
        }
      }
    }
  }, {
    key: "fill",
    value: function fill(tile, max_width, max_height) {
      for (var y = 0; y < max_height; y++) {
        this.grid[y] = [];
        for (var x = 0; x < max_width; x++) {
          this.grid[y][x] = tile;
        }
      }
    }
  }, {
    key: "toString",
    value: function toString() {
      return this.grid.map(function (chars) {
        return chars.join('');
      }).join('\n');
    }
  }]);
  return Grid;
}();
var BeattieSchoberthBuilder = exports.BeattieSchoberthBuilder = /*#__PURE__*/function () {
  function BeattieSchoberthBuilder() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, BeattieSchoberthBuilder);
    this.adventure = new BeattieSchoberth(config);
    this.options = config;
    this.max_height = config.maxHeight;
    this.max_width = config.maxWidth;
  }
  _createClass(BeattieSchoberthBuilder, [{
    key: "renderWorld",
    value: function renderWorld() {
      var _this = this;
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var blt = arguments.length > 1 ? arguments[1] : undefined;
      var opt = function opt(name) {
        return options[name] || _this.options[name];
      };
      var width = opt('width');
      var height = opt('height');
      var roomWidth = opt('roomWidth');
      var roomHeight = opt('roomHeight');
      var built = blt || this.build();
      var generated = built;
      var grid = generated.grid;
      var output = new Grid();
      var rendered = null;
      output.fill(TILE.VOID, width, height);
      for (var y = 0; y < generated.size.height; y++) {
        for (var x = 0; x < generated.size.width; x++) {
          var roomId = grid[y][x];
          var room = generated.rooms[roomId];
          if (room) {
            rendered = this.buildRoom({
              doors: room.doors
            });
          } else {
            rendered = this.emptyRoom({});
          }
          output.overlay(rendered, x * roomWidth, y * roomHeight);
        }
      }
      return output.grid;
    }
  }, {
    key: "buildRoom",
    value: function buildRoom() {
      var _this2 = this;
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var inDoorRange = function inDoorRange(n, max, range) {
        var half = Math.floor(max / 2);
        var odd = !!(max % 2);
        var halfRange = Math.floor(range / 2);
        if (odd) {
          if (n === half && range) {
            //in center
            return true;
          } else {
            if (n < half) {
              return n > half - halfRange;
            } else {
              return n < half + halfRange;
            }
          }
        } else {
          if (n <= half) {
            return n >= half - halfRange;
          } else {
            return n < half + halfRange;
          }
        }
      };
      var opt = function opt(name) {
        return options[name] || _this2.options[name];
      };
      var width = opt('roomWidth');
      var height = opt('roomHeight');
      var lines = [];
      for (var y = 0; y < height; y++) {
        var row = [];
        for (var x = 0; x < width; x++) {
          if (x === 0 || x === width - 1) {
            //TODO: doors
            if (x === 0) {
              if (options.doors.w && inDoorRange(y, height, 2)) {
                row.push(TILE.DOOR);
              } else {
                row.push(TILE.WALL);
              }
            } else {
              if (options.doors.e && inDoorRange(y, height, 2)) {
                row.push(TILE.DOOR);
              } else {
                row.push(TILE.WALL);
              }
            }
          } else {
            if (y === 0 || y === height - 1) {
              if (y === 0) {
                if (options.doors.n && inDoorRange(x, width, 2)) {
                  row.push(TILE.DOOR);
                } else {
                  row.push(TILE.WALL);
                }
              } else {
                if (options.doors.s && inDoorRange(x, width, 2)) {
                  row.push(TILE.DOOR);
                } else {
                  row.push(TILE.WALL);
                }
              }
            } else {
              row.push(TILE.FLOOR);
            }
          }
        }
        lines.push(row);
      }
      return lines;
    }
  }, {
    key: "emptyRoom",
    value: function emptyRoom() {
      var _this3 = this;
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var opt = function opt(name) {
        return options[name] || _this3.options[name];
      };
      var width = opt('roomWidth');
      var height = opt('roomHeight');
      var result = [];
      for (var y = 0; y < height; y++) {
        var row = [];
        for (var x = 0; x < width; x++) {
          row.push(TILE.VOID);
        }
        result.push(row);
      }
      return result;
    }
  }, {
    key: "build",
    value: function build(rand) {
      var adventureBuild = this.adventure.build(rand);
      adventureBuild.world = this.renderWorld({}, adventureBuild);
      return adventureBuild;
    }
  }]);
  return BeattieSchoberthBuilder;
}();
function ALGORITHM_BEATTIE_SCHOBERTH(tileMap, options) {
  var fractional = Math.floor(Math.sqrt(Math.max(tileMap.width, tileMap.height)));
  var builder = new BeattieSchoberthBuilder({
    rooms: fractional * 2,
    keys: 3,
    special: 2,
    width: tileMap.width,
    height: tileMap.height,
    roomHeight: options.roomHeight || fractional,
    roomWidth: options.roomWidth || fractional
  });
  var built = builder.build(function () {
    return tileMap.random();
  });
  var flattened = built.world.reduce(function (agg, line) {
    return agg.concat(line);
  }, []);
  built.world = null;
  for (var lcv = 0; lcv < tileMap.data.length; lcv++) {
    tileMap.data[lcv] = flattened[lcv];
  }
  tileMap.world = built;
}

},{}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = ALGORITHM_BINARY_TREE;
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function ALGORITHM_BINARY_TREE(tileMap, options) {
  tileMap.fill(1); // Fill with walls

  for (var y = 0; y < tileMap.height; y += 2) {
    for (var x = 0; x < tileMap.width; x += 2) {
      tileMap.data[y * tileMap.width + x] = 0; // Open cell

      var neighbors = [];
      if (x + 2 < tileMap.width) neighbors.push([2, 0]); // East
      if (y + 2 < tileMap.height) neighbors.push([0, 2]); // South

      if (neighbors.length > 0) {
        var randomIndex = Math.floor(tileMap.random() * neighbors.length);
        var _neighbors$randomInde = _slicedToArray(neighbors[randomIndex], 2),
          dx = _neighbors$randomInde[0],
          dy = _neighbors$randomInde[1];
        tileMap.data[(y + dy) * tileMap.width + (x + dx)] = 0; // Open path to the selected neighbor
        tileMap.data[(y + dy / 2) * tileMap.width + (x + dx / 2)] = 0; // Open wall between current cell and selected neighbor
      }
    }
  }
}

},{}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = generateCellularAutomataMap;
// CellularAutomata.js - Marak Squires 2024
function generateCellularAutomataMap(tileMap, options) {
  var floorTileId = 1;
  var wallTileId = 0;
  var wallChance = options.wallChance || 0.45;
  var iterations = options.iterations || 4;
  var neighborThreshold = options.neighborThreshold || 4;

  // Randomly initialize map
  for (var y = 0; y < tileMap.height; y++) {
    for (var x = 0; x < tileMap.width; x++) {
      tileMap.data[y * tileMap.width + x] = tileMap.random() < wallChance ? wallTileId : floorTileId;
    }
  }

  // Cellular automata iteration
  for (var i = 0; i < iterations; i++) {
    var newData = new Array(tileMap.width * tileMap.height).fill(floorTileId);
    for (var _y = 0; _y < tileMap.height; _y++) {
      for (var _x = 0; _x < tileMap.width; _x++) {
        var wallNeighbors = 0;
        for (var dy = -1; dy <= 1; dy++) {
          for (var dx = -1; dx <= 1; dx++) {
            if (dx === 0 && dy === 0) continue;
            var nx = _x + dx;
            var ny = _y + dy;
            if (nx >= 0 && nx < tileMap.width && ny >= 0 && ny < tileMap.height) {
              wallNeighbors += tileMap.data[ny * tileMap.width + nx] === wallTileId ? 1 : 0;
            } else {
              wallNeighbors++;
            }
          }
        }
        newData[_y * tileMap.width + _x] = wallNeighbors >= neighborThreshold ? wallTileId : floorTileId;
      }
    }
    tileMap.data = newData;
  }
}

},{}],13:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = generateEllersAlgorithmMap;
// EllersAlgorithm.js - Marak Squires 2024
function generateEllersAlgorithmMap(tileMap, options) {
  var floorTileId = 1;
  var wallTileId = 0;
  tileMap.data.fill(wallTileId);
  var sets = {};
  function makeSet(x, y) {
    var id = "".concat(x, ",").concat(y);
    sets[id] = {
      id: id,
      cells: [id]
    };
    return sets[id];
  }
  function findSet(x, y) {
    var id = "".concat(x, ",").concat(y);
    return sets[id] || makeSet(x, y);
  }
  function unionSets(x1, y1, x2, y2) {
    var set1 = findSet(x1, y1);
    var set2 = findSet(x2, y2);
    if (set1.id === set2.id) return;

    // Merge two sets
    set2.cells.forEach(function (cellId) {
      set1.cells.push(cellId);
      sets[cellId] = set1;
    });
  }
  for (var y = 0; y < tileMap.height; y += 2) {
    // Join cells horizontally
    for (var x = 0; x < tileMap.width - 2; x += 2) {
      if (tileMap.random() > 0.5) {
        unionSets(x, y, x + 2, y);
        tileMap.data[y * tileMap.width + x + 1] = floorTileId;
      }
    }

    // Join cells vertically
    if (y < tileMap.height - 2) {
      var setVisited = {};
      for (var _x = 0; _x < tileMap.width; _x += 2) {
        var currentSet = findSet(_x, y).id;
        if (!setVisited[currentSet] && tileMap.random() > 0.5) {
          unionSets(_x, y, _x, y + 2);
          tileMap.data[(y + 1) * tileMap.width + _x] = floorTileId;
          setVisited[currentSet] = true;
        }
      }
    }
  }

  // Ensure all paths are connected in the last row
  for (var _x2 = 0; _x2 < tileMap.width - 2; _x2 += 2) {
    if (findSet(_x2, tileMap.height - 1).id !== findSet(_x2 + 2, tileMap.height - 1).id) {
      unionSets(_x2, tileMap.height - 1, _x2 + 2, tileMap.height - 1);
      tileMap.data[(tileMap.height - 1) * tileMap.width + _x2 + 1] = floorTileId;
    }
  }
}

},{}],14:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = generateGrowingTreeAlgorithmMap;
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function generateGrowingTreeAlgorithmMap(tileMap, options) {
  var floorTileId = 1; // Open cell
  var wallTileId = 0; // Wall

  tileMap.data.fill(wallTileId); // Initialize all tiles as walls

  // Function to carve a passage between two points
  function carvePassage(x1, y1, x2, y2) {
    tileMap.data[y1 * tileMap.width + x1] = floorTileId;
    // Carve passage to the next cell (midpoint for the wall and the cell itself)
    tileMap.data[Math.floor((y1 + y2) / 2) * tileMap.width + Math.floor((x1 + x2) / 2)] = floorTileId;
    tileMap.data[y2 * tileMap.width + x2] = floorTileId;
  }
  var currentX = Math.floor(tileMap.random() * tileMap.width);
  var currentY = Math.floor(tileMap.random() * tileMap.height);
  var cellsStack = [[currentX, currentY]]; // Start with a single cell in stack
  var _loop = function _loop() {
    var _cellsStack = _slicedToArray(cellsStack[cellsStack.length - 1], 2),
      cx = _cellsStack[0],
      cy = _cellsStack[1]; // Use the latest cell
    var neighbors = [];

    // Directions: N, S, E, W
    var directions = [[0, -2], [0, 2], [2, 0], [-2, 0]];
    directions.forEach(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
        dx = _ref2[0],
        dy = _ref2[1];
      var nx = cx + dx,
        ny = cy + dy;
      if (nx >= 0 && nx < tileMap.width && ny >= 0 && ny < tileMap.height && tileMap.data[ny * tileMap.width + nx] === wallTileId) {
        neighbors.push([nx, ny]);
      }
    });
    if (neighbors.length > 0) {
      var randomIndex = Math.floor(tileMap.random() * neighbors.length);
      var _neighbors$randomInde = _slicedToArray(neighbors[randomIndex], 2),
        nextX = _neighbors$randomInde[0],
        nextY = _neighbors$randomInde[1];
      carvePassage(cx, cy, nextX, nextY);
      cellsStack.push([nextX, nextY]);
    } else {
      cellsStack.pop(); // No neighbors found, backtrack
    }
  };
  while (cellsStack.length > 0) {
    _loop();
  }
}

},{}],15:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = ALGORITHM_METROIDVANIA;
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * Metroidvania.js - Abbey Hawk Sparrow 2024
 * Originally written by Thomas Hunter II
 *
 * Originally written on June 12, 2013
 * Originally hosted at https://github.com/PhobosRising/javascript-roguelike-map-generator
 */

var WALL = 'wall';
var DOOR = 'door';
var OPEN = 'open';
var EXIT = 'exit';
var DIRECTIONS = ['n', 'e', 's', 'w'];
var TILE = {
  VOID: 0,
  WALL: 1,
  FLOOR: 2,
  DOOR: 3,
  SPECIAL_DOOR: 4,
  ENTER: 5,
  EXIT: 6
};
var toCharGrid = function toCharGrid() {
  var string = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return string.split('\n').map(function (line) {
    return line.split('');
  });
};
var Grid = /*#__PURE__*/function () {
  function Grid() {
    var str = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    _classCallCheck(this, Grid);
    this.grid = toCharGrid(str);
  }
  _createClass(Grid, [{
    key: "overlay",
    value: function overlay(subgrid, y, x) {
      var grid = Array.isArray(subgrid) ? subgrid : toCharGrid(subgrid);
      for (var row = 0; row < grid.length; row++) {
        for (var col = 0; col < grid[row].length; col++) {
          if (!this.grid[x + row]) this.grid[x + row] = [];
          this.grid[x + row][y + col] = grid[row][col];
        }
      }
    }
  }, {
    key: "fill",
    value: function fill(tile, max_width, max_height) {
      for (var y = 0; y < max_height; y++) {
        this.grid[y] = [];
        for (var x = 0; x < max_width; x++) {
          this.grid[y][x] = tile;
        }
      }
    }
  }, {
    key: "toString",
    value: function toString(incoming) {
      return (incoming || this.grid).map(function (chars) {
        return chars.join('');
      }).join('\n');
    }
  }]);
  return Grid;
}();
var Metroidvania = /*#__PURE__*/function () {
  function Metroidvania() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, Metroidvania);
    this.options = config;
  }
  _createClass(Metroidvania, [{
    key: "render",
    value: function render() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var blt = arguments.length > 1 ? arguments[1] : undefined;
      var built = blt || this.build();
      var world = built.map;
      var result = '';
      // Crude mechanism for drawing level
      for (var y = 0; y < world.length; y++) {
        var row = '';
        for (var x = 0; x < world[y].length; x++) {
          if (world[y][x].edges.e || world[y][x].edges.w || world[y][x].edges.n || world[y][x].edges.s) row += '#';else row += ' ';
        }
        result += row + '\n';
        //console.log(row + '| ' + y);
      }
      return result;
    }
  }, {
    key: "build",
    value: function build(random) {
      this.random = random;
      var data = platformGenerator(this.options, random);
      var grid = new Grid();
      var roomWidth = this.options.roomWidth || 10;
      var roomHeight = this.options.roomHeight || 10;
      grid.fill(TILE.VOID, this.options.gridWidth, this.options.gridHeight);
      for (var col = 0; col < data.rooms.length; col++) {
        for (var row = 0; row < data.rooms[col].length; row++) {
          var location = data.rooms[col][row];
          var roomData = data.map[location.y][location.x];
          var room = buildRoom(roomData, this.options.roomHeight, this.options.roomWidth
          /*{
          room: roomData,
          roomWidth: this.options.roomWidth,
          roomHeight: this.options.roomHeight
          }*/);
          grid.overlay(room, location.x * this.options.roomHeight, location.y * this.options.roomWidth);
        }
      }
      data.world = grid.grid;
      return data;
    }
  }]);
  return Metroidvania;
}();
var inDoorRange = function inDoorRange(n, max, range) {
  var half = Math.floor(max / 2);
  var odd = !!(max % 2);
  var halfRange = Math.floor(range / 2);
  if (odd) {
    if (n === half && range) {
      //in center
      return true;
    } else {
      if (n < half) {
        return n > half - halfRange;
      } else {
        return n < half + halfRange;
      }
    }
  } else {
    if (n <= half) {
      return n >= half - halfRange;
    } else {
      return n < half + halfRange;
    }
  }
};
var buildRoom = function buildRoom() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var roomHeight = arguments.length > 1 ? arguments[1] : undefined;
  var roomWidth = arguments.length > 2 ? arguments[2] : undefined;
  var width = roomHeight;
  var height = roomWidth;
  var lines = [];
  for (var y = 0; y < height; y++) {
    var row = [];
    for (var x = 0; x < width; x++) {
      if (x === 0 || x === width - 1) {
        //TODO: doors
        if (x === 0) {
          if (options.edges.w === 'open') {
            if (y === 0 || y === height - 1) row.push(TILE.WALL);else row.push(TILE.FLOOR);
          } else {
            if ((options.edges.w === 'door' || options.edges.w === 'exit') && inDoorRange(y, height, 2)) {
              if (options.edges.w === 'door') {
                row.push(TILE.DOOR);
              } else {
                row.push(TILE.EXIT);
              }
            } else {
              row.push(TILE.WALL);
            }
          }
        } else {
          if (options.edges.e === 'open') {
            if (y === 0 || y === height - 1) row.push(TILE.WALL);else row.push(TILE.FLOOR);
          } else {
            if ((options.edges.e === 'door' || options.edges.e === 'exit') && inDoorRange(y, height, 2)) {
              if (options.edges.e === 'door') {
                row.push(TILE.DOOR);
              } else {
                row.push(TILE.EXIT);
              }
            } else {
              row.push(TILE.WALL);
            }
          }
        }
      } else {
        if (y === 0 || y === height - 1) {
          if (y === 0) {
            if (options.edges.n === 'open') {
              row.push(TILE.FLOOR);
            } else {
              if ((options.edges.n === 'door' || options.edges.n === 'exit') && inDoorRange(x, width, 2)) {
                if (options.edges.n === 'door') {
                  row.push(TILE.DOOR);
                } else {
                  row.push(TILE.EXIT);
                }
              } else {
                row.push(TILE.WALL);
              }
            }
          } else {
            if (options.edges.s === 'open') {
              row.push(TILE.FLOOR);
            } else {
              if ((options.edges.s === 'door' || options.edges.s === 'exit') && inDoorRange(x, width, 2)) {
                if (options.edges.s === 'door') {
                  row.push(TILE.DOOR);
                } else {
                  row.push(TILE.EXIT);
                }
              } else {
                row.push(TILE.WALL);
              }
            }
          }
        } else {
          row.push(TILE.FLOOR);
        }
      }
    }
    lines.push(row);
  }
  return lines;
};
var platformGenerator = function platformGenerator() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var random = arguments.length > 1 ? arguments[1] : undefined;
  var MAP_WIDTH = config.width || 20;
  var MAP_HEIGHT = config.height || 20;
  var MIN_ZONES_PER_ROOM = config.minZonesPerRoom || 1;
  var MAX_ZONES_PER_ROOM = config.maxZonesPerRoom || 4;
  var MIN_ROOMS_PER_MAP = config.minRoomsPerMap || 10;
  var MAX_ROOMS_PER_MAP = config.maxRoomsPerMap || 20;

  // If we don't get at least this many random doors, start over
  var NEW_DOOR_MIN_THRESHOLD = config.newDoors || 3;

  // How this really should work is the odds of creating a door are higher as the room id's get farther apart
  var ROOM_ID_DIFF_RANDOM_DOOR_THRESHOLD = config.roomDiff || 3; // How different should two rooms be?
  var ROOM_ID_DIFF_RANDOM_DOOR_ODDS = config.roomDiffOdds || 1 / 5; // What are the odds we'll act upon this?

  var failCount = 0;
  var result = null;
  while (!result) {
    result = build(initialize(MAP_WIDTH, MAP_HEIGHT));
  }
  return result;
  function build(map) {
    // Determin the total number of rooms in the beginning
    var number_of_rooms = rangedRandom(MIN_ROOMS_PER_MAP, MAX_ROOMS_PER_MAP, random);

    // The cursor is this special little pointer for the next zone being built
    var cursor = {
      x: Math.floor(MAP_WIDTH / 2),
      y: Math.floor(MAP_WIDTH / 2)
    };
    var exits = {
      n: {
        // negative Y
        x: cursor.x,
        y: cursor.y
      },
      s: {
        // positive Y
        x: cursor.x,
        y: cursor.y
      },
      e: {
        // positive X
        x: cursor.x,
        y: cursor.y
      },
      w: {
        // negative X
        x: cursor.x,
        y: cursor.y
      }
    };

    // Each placed zone will have its own id
    var zone_id = 0;

    // An array of room id's, and the room locations within it
    var all_room_zones = [];

    // Run this loop once per room we're going to build
    for (var room = 0; room < number_of_rooms; room++) {
      // determine the number of zones in this room at the beginning
      var number_of_zones = rangedRandom(MIN_ZONES_PER_ROOM, MAX_ZONES_PER_ROOM, random);
      var zones_in_this_room = [];

      // Run this loop once per zone within this room
      for (var zone_number = 0; zone_number < number_of_zones; zone_number++) {
        if (!cursor) {
          return null;
        }
        var zone = map[cursor.y][cursor.x];
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
          if (config.maxFails && failCount > config.maxFails) throw new Error('Failed too many times to generate this configuration');
          return false;
        }
      }

      // Build walls between this room and other rooms / void
      for (var _i = 0, _zones_in_this_room = zones_in_this_room; _i < _zones_in_this_room.length; _i++) {
        var zone_location = _zones_in_this_room[_i];
        buildWallsForZone(map, zone_location);
      }
      all_room_zones[room] = zones_in_this_room;

      // Move cursor to an area outside but next to this room, and add door
      if (room != number_of_rooms - 1) {
        cursor = findNakedAdjacent(map, zones_in_this_room, random);
      }
    }

    // Lets add some random doors between rooms, otherwise it's too linear
    var new_door_count = 0;
    for (var _i2 = 0, _all_room_zones = all_room_zones; _i2 < _all_room_zones.length; _i2++) {
      var room_zones = _all_room_zones[_i2];
      var _iterator = _createForOfIteratorHelper(room_zones),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var coords = _step.value;
          if (coords.x === 0 || coords.y === 0 || coords.x >= MAP_WIDTH - 1 || coords.y >= MAP_HEIGHT - 1) {
            // Don't attempt to build random doors on extremes. Could be more specific though, doesn't always need to be avoided.
            continue;
          }
          var this_zone = map[coords.y][coords.x];
          var this_room_id = this_zone.room;
          var comparedZone = null;

          // South
          comparedZone = map[coords.y + 1][coords.x];
          if (comparedZone.open && Math.abs(comparedZone.room - this_room_id) > ROOM_ID_DIFF_RANDOM_DOOR_THRESHOLD && Math.random() <= ROOM_ID_DIFF_RANDOM_DOOR_ODDS) {
            buildDoorBetweenZones(map, coords, {
              x: coords.x,
              y: coords.y + 1
            });
            new_door_count++;
          }

          // North
          comparedZone = map[coords.y - 1][coords.x];
          if (comparedZone.open && Math.abs(comparedZone.room - this_room_id) > ROOM_ID_DIFF_RANDOM_DOOR_THRESHOLD && Math.random() <= ROOM_ID_DIFF_RANDOM_DOOR_ODDS) {
            buildDoorBetweenZones(map, coords, {
              x: coords.x,
              y: coords.y - 1
            });
            new_door_count++;
          }

          // West
          comparedZone = map[coords.y][coords.x - 1];
          if (comparedZone.open && Math.abs(comparedZone.room - this_room_id) > ROOM_ID_DIFF_RANDOM_DOOR_THRESHOLD && Math.random() <= ROOM_ID_DIFF_RANDOM_DOOR_ODDS) {
            buildDoorBetweenZones(map, coords, {
              x: coords.x - 1,
              y: coords.y
            });
            new_door_count++;
          }

          // East
          comparedZone = map[coords.y][coords.x + 1];
          if (comparedZone.open && Math.abs(comparedZone.room - this_room_id) > ROOM_ID_DIFF_RANDOM_DOOR_THRESHOLD && Math.random() <= ROOM_ID_DIFF_RANDOM_DOOR_ODDS) {
            buildDoorBetweenZones(map, coords, {
              x: coords.x + 1,
              y: coords.y
            });
            new_door_count++;
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
    if (new_door_count < NEW_DOOR_MIN_THRESHOLD) {
      failCount++;
      if (config.maxFails && failCount > config.maxFails) throw new Error('Failed too many times to generate this configuration');
      //console.log('UNMET DOOR THRESHOLD: ' + new_door_count + ' OF ' + //NEW_DOOR_MIN_THRESHOLD + '. Rebuild...');
      return false;
    }

    // Build our exits
    for (var _i3 = 0, _DIRECTIONS = DIRECTIONS; _i3 < _DIRECTIONS.length; _i3++) {
      var dir = _DIRECTIONS[_i3];
      map[exits[dir].y][exits[dir].x].edges[dir] = EXIT;
      map[exits[dir].y][exits[dir].x].exit = true;
    }
    return {
      map: map,
      exits: exits,
      failCount: failCount,
      rooms: all_room_zones
    };
  }

  // Finds an open zone which is adjacent to one of the supplied zones
  function findNakedAdjacent(map, zones, random) {
    zones = shuffle(zones, random);
    var _iterator2 = _createForOfIteratorHelper(zones),
      _step2;
    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var current_zone = _step2.value;
        var newZone = moveCursor(map, current_zone, random);
        if (newZone) {
          buildDoorBetweenZones(map, current_zone, newZone);
          return newZone;
        }
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
    return false;
  }

  // Move the cursor to an available adjacent zone
  function moveCursor(map, cursor, random) {
    var adjacents = shuffle([{
      d: 'n',
      x: 0,
      y: 1
    }, {
      d: 'e',
      x: 1,
      y: 0
    }, {
      d: 's',
      x: 0,
      y: -1
    }, {
      d: 'w',
      x: -1,
      y: 0
    }], random);
    var direction = null;
    var newCursor = null;
    //eslint-disable-next-line no-cond-assign
    while (direction = adjacents.pop()) {
      newCursor = {
        x: cursor.x + direction.x,
        y: cursor.y + direction.y
      };
      if (newCursor.x < 0 || newCursor.y < 0 || newCursor.x >= MAP_WIDTH || newCursor.y >= MAP_HEIGHT) {
        // When this happens, we should just move the cursor somewhere else
        //console.log('CURSOR OUT OF BOUNDS. Rebuild...');
        failCount++;
        if (config.maxFails && failCount > config.maxFails) throw new Error('Failed too many times to generate this configuration');
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
    var room = map[loc.y][loc.x].room;

    // NORTH
    if (map[loc.y][loc.x].edges.n != DOOR) {
      if (loc.y === 0 || !map[loc.y - 1][loc.x].open || map[loc.y - 1][loc.x].room != room) {
        map[loc.y][loc.x].edges.n = WALL;
      } else {
        map[loc.y][loc.x].edges.n = OPEN;
      }
    }

    // EAST
    if (map[loc.y][loc.x].edges.e != DOOR) {
      if (loc.x >= MAP_WIDTH - 1 || !map[loc.y][loc.x + 1].open || map[loc.y][loc.x + 1].room != room) {
        map[loc.y][loc.x].edges.e = WALL;
      } else {
        map[loc.y][loc.x].edges.e = OPEN;
      }
    }

    // SOUTH
    if (map[loc.y][loc.x].edges.s != DOOR) {
      if (loc.y >= MAP_HEIGHT - 1 || !map[loc.y + 1][loc.x].open || map[loc.y + 1][loc.x].room != room) {
        map[loc.y][loc.x].edges.s = WALL;
      } else {
        map[loc.y][loc.x].edges.s = OPEN;
      }
    }

    // WEST
    if (map[loc.y][loc.x].edges.w != DOOR) {
      if (loc.x === 0 || !map[loc.y][loc.x - 1].open || map[loc.y][loc.x - 1].room != room) {
        map[loc.y][loc.x].edges.w = WALL;
      } else {
        map[loc.y][loc.x].edges.w = OPEN;
      }
    }
  }
};

// Get a random integer between the supplied min and max
function rangedRandom(min, max, random) {
  return Math.floor(random() * (max + 1 - min) + min);
}

// Builds a door between these two (hopefully) adjacent zones
function buildDoorBetweenZones(map, zonePos1, zonePos2) {
  var zone1 = map[zonePos1.y][zonePos1.x];
  var zone2 = map[zonePos2.y][zonePos2.x];
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
  var arr = array.slice(); // clone array
  var i = arr.length,
    j,
    tempi,
    tempj;
  if (i == 0) return false;
  while (--i) {
    j = Math.floor(random() * (i + 1));
    tempi = arr[i];
    tempj = arr[j];
    arr[i] = tempj;
    arr[j] = tempi;
  }
  return arr;
}

// Builds a big empty square array, an entire map
function initialize(width, height) {
  var map = [];
  for (var y = 0; y < height; y++) {
    map[y] = [];
    for (var x = 0; x < width; x++) {
      map[y][x] = {
        open: false,
        room: null,
        exit: null,
        zone: null,
        edges: {
          n: null,
          e: null,
          s: null,
          w: null
        }
      };
    }
  }
  return map;
}
function ALGORITHM_METROIDVANIA(tileMap, options) {
  tileMap.fill(0); // Fill with walls
  var maxDimension = Math.max(tileMap.width, tileMap.height);
  if (maxDimension <= 5) {
    return;
  }
  var fractional = Math.sqrt(maxDimension);
  if (fractional % 2 !== 1) fractional++;
  var size = maxDimension < 10 ? Math.floor(maxDimension / 2) : 10;
  var doorDiff = maxDimension < 10 ? 1 : 2;
  var roomSizeHeight = Math.floor(tileMap.width / size);
  var roomSizeWidth = Math.floor(tileMap.height / size);
  var numRoomsWide = Math.floor(tileMap.width / roomSizeHeight);
  var numRoomsHigh = Math.floor(tileMap.height / roomSizeWidth);
  var maxCount = Math.floor(numRoomsWide * numRoomsHigh * 0.8);
  var minCount = Math.floor(maxCount / 4);
  var generator = new Metroidvania({
    roomWidth: roomSizeWidth,
    roomHeight: roomSizeHeight,
    maxFails: 25000,
    width: numRoomsWide,
    // Max number of zones wide
    height: numRoomsWide,
    // Max number of zones tall
    gridHeight: tileMap.height,
    gridWidth: tileMap.width,
    minZonesPerRoom: 1,
    // Minimum number of zones per room
    maxZonesPerRoom: 3,
    // Maximum number of zones per room
    minRoomsPerMap: minCount,
    // Minimum number of rooms per map
    maxRoomsPerMap: maxCount,
    // Maximum number of rooms per map
    newDoors: doorDiff,
    // # doors to add to prevent tedious linear mazes
    roomDiff: doorDiff,
    // When adding a new door, room ID distance
    roomDiffOdds: 1 / 2 // Odds of inserting a new door on opportunity
  });
  var built = generator.build(function () {
    return tileMap.random();
  });
  var flattened = built.world.reduce(function (agg, line) {
    return agg.concat(line);
  }, []);
  built.world = null;
  tileMap.world = built;
  for (var lcv = 0; lcv < tileMap.data.length; lcv++) {
    tileMap.data[lcv] = flattened[lcv];
  }
}

},{}],16:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = generateMap;
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function generateMap(tileMap, options) {
  var stack = [];
  var visited = Array.from({
    length: tileMap.height
  }, function () {
    return Array(tileMap.width).fill(false);
  });
  var visitCell = function visitCell(x, y) {
    visited[y][x] = true;
    stack.push([x, y]);
    while (stack.length > 0) {
      var _stack = _slicedToArray(stack[stack.length - 1], 2),
        cx = _stack[0],
        cy = _stack[1];
      var neighbors = getNeighbors(cx, cy);
      if (neighbors.length > 0) {
        var _neighbors$Math$floor = _slicedToArray(neighbors[Math.floor(tileMap.random(neighbors.length))], 2),
          nx = _neighbors$Math$floor[0],
          ny = _neighbors$Math$floor[1];
        removeWall(cx, cy, nx, ny);
        visited[ny][nx] = true;
        stack.push([nx, ny]);
      } else {
        stack.pop();
      }
    }
  };
  var getNeighbors = function getNeighbors(x, y) {
    var neighbors = [];
    if (x > 0 && !visited[y][x - 1]) neighbors.push([x - 1, y]);
    if (y > 0 && !visited[y - 1][x]) neighbors.push([x, y - 1]);
    if (x < tileMap.width - 1 && !visited[y][x + 1]) neighbors.push([x + 1, y]);
    if (y < tileMap.height - 1 && !visited[y + 1][x]) neighbors.push([x, y + 1]);
    return neighbors;
  };
  var removeWall = function removeWall(x, y, nx, ny) {
    var index1 = y * tileMap.width + x;
    var index2 = ny * tileMap.width + nx;
    tileMap.data[Math.min(index1, index2)] = 0; // Assuming 1 is a wall and 0 is an open path
  };

  // Start from a random cell
  var startX = Math.floor(tileMap.random(tileMap.width));
  var startY = Math.floor(tileMap.random(tileMap.height));
  visitCell(startX, startY);
}

},{}],17:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = generateRecursiveDivisionMap;
// RecursiveDivision.js - Marak Squires 2024
function generateRecursiveDivisionMap(tileMap, options) {
  var floorTileId = 1; // TODO: change to 0
  var wallTileId = 0; // TODO: change to 1

  tileMap.data.fill(floorTileId);
  var addWalls = function addWalls(x1, y1, x2, y2) {
    if (x2 - x1 < 2 || y2 - y1 < 2) return;
    var horizontal = x2 - x1 < y2 - y1;
    var wx = horizontal ? x1 : Math.floor(tileMap.random(x2 - x1 - 2)) + x1 + 1;
    var wy = horizontal ? Math.floor(tileMap.random(y2 - y1 - 2)) + y1 + 1 : y1;
    var px = horizontal ? Math.floor(tileMap.random(x2 - x1)) + x1 : wx;
    var py = horizontal ? wy : Math.floor(tileMap.random(y2 - y1)) + y1;
    for (var x = x1; x < x2; x++) {
      for (var y = y1; y < y2; y++) {
        if (horizontal && x === wx && y !== py || !horizontal && y === wy && x !== px) {
          tileMap.data[y * tileMap.width + x] = wallTileId;
        }
      }
    }
    if (horizontal) {
      addWalls(x1, y1, x2, wy);
      addWalls(x1, wy, x2, y2);
    } else {
      addWalls(x1, y1, wx, y2);
      addWalls(wx, y1, x2, y2);
    }
  };
  addWalls(0, 0, tileMap.width, tileMap.height);
}

},{}],18:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = ALGORITHM_THOMAS_HUNTER;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
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
var Roguelike = /*#__PURE__*/function () {
  function Roguelike() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, Roguelike);
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
  _createClass(Roguelike, [{
    key: "render",
    value: function render() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var blt = arguments.length > 1 ? arguments[1] : undefined;
      var built = blt || this.build();
      var world = built.world;

      //var end = new Date();

      var result = '';
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
        result += row + '\n';
        //console.log(row + '| ' + y);
      }
      return result;
    }
  }, {
    key: "build",
    value: function build(random) {
      this.random = random ? random : function () {
        return Math.random();
      };
      this.world = null; // 2D array representing the world
      this.rooms = {}; // Object containing rooms where the key is the Room ID
      this.doors = {}; // Object containing doors where the key is the Door ID
      this.walls = []; // Array of all walls, where each items is an [X,Y] pair
      this.enter = null; // {x, y, room_id} object pointing to level entrance
      this.exit = null; // {x, y, room_id} object pointing to level exit
      this.special = null; // {room_id, door_id} object pointing to special area
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
  }, {
    key: "createVoid",
    value: function createVoid() {
      var world = [];
      for (var y = 0; y < this.max_height; y++) {
        world[y] = [];
        for (var x = 0; x < this.max_width; x++) {
          world[y][x] = TILE.VOID;
        }
      }
      this.world = world;
    }
  }, {
    key: "addStarterRoom",
    value: function addStarterRoom() {
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
  }, {
    key: "getRoomDimensions",
    value: function getRoomDimensions() {
      return {
        width: this.randomOdd(this.room_min_width, this.room_max_width),
        height: this.randomOdd(this.room_min_height, this.room_max_height)
      };
    }
  }, {
    key: "addRoom",
    value: function addRoom(left, top, width, height) {
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
      for (var y = top; y < top + height; y++) {
        for (var x = left; x < left + width; x++) {
          //console.log('f');
          this.world[y][x] = TILE.FLOOR;
        }
      }
      return room_id;
    }

    /**
     * Adds one-off floors, e.g. for building hallways
     */
  }, {
    key: "addFloor",
    value: function addFloor(x, y) {
      this.world[y][x] = TILE.FLOOR;
    }
  }, {
    key: "generateRooms",
    value: function generateRooms() {
      var retries = this.retry_count;
      while (this.room_id < this.room_ideal_count) {
        //console.log('!')
        if (!this.generateRoom() && --retries <= 0) {
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
  }, {
    key: "generateRoom",
    value: function generateRoom() {
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
      while (false === (collide_room = this.collides(top + y_dir, left + x_dir, dimen.width, dimen.height))) {
        top += y_dir;
        left += x_dir;
        //console.log(name, top, left)
        // We slid the room out of bounds of the world
        if (this.invalid(top, left, dimen.width, dimen.height)) {
          //console.log('INVALID')
          return false;
        }
      }
      var new_room_id = this.addRoom(left, top, dimen.width, dimen.height);
      //console.log('world', this.world);
      this.addDoorBetweenRooms(x_dir, y_dir, collide_room, new_room_id);
      return true;
    }
  }, {
    key: "collides",
    value: function collides(top, left, width, height) {
      var target = {
        top: top,
        left: left,
        width: width,
        height: height
      };
      for (var i = 0; i < this.room_id; i++) {
        var room = this.rooms[i];
        /*console.log(target.left, room.left + room.width,
            target.left + target.width , room.left,
            target.top , room.top + room.height,
            target.top + target.height , room.top)*/
        if (!(target.left > room.left + room.width || target.left + target.width < room.left || target.top > room.top + room.height || target.top + target.height < room.top)) {
          return room.id; // truthy int
        }
      }
      return false;
    }
  }, {
    key: "invalid",
    value: function invalid(top, left, width, height) {
      if (top <= ROOM_GAP) {
        // Too far north
        return true;
      } else if (left <= ROOM_GAP) {
        // Too far west
        return true;
      } else if (top + height >= this.max_height - ROOM_GAP) {
        // Too far east
        return true;
      } else if (left + width >= this.max_width - ROOM_GAP) {
        // Too far south
        return true;
      }

      // A O.K.
      return false;
    }

    /**
     * Finds boundaries between floors and void, adding walls
     */
  }, {
    key: "buildWalls",
    value: function buildWalls() {
      var rooms = this.rooms;
      //var world = this.world;

      // Do this for halls and rooms
      for (var i = 0; i < this.room_id; i++) {
        var room = rooms[i];

        // Top Wall (Long)
        for (var tx = room.left - 1; tx < room.left + room.width + 1; tx++) {
          this.addWall(tx, room.top - 1, room);
        }

        // Right Wall (Short)
        for (var ry = room.top; ry < room.top + room.height; ry++) {
          this.addWall(room.left + room.width, ry, room);
        }

        // Bottom Wall (Long)
        for (var bx = room.left - 1; bx < room.left + room.width + 1; bx++) {
          this.addWall(bx, room.top + room.height, room);
        }

        // Left Wall (Short)
        for (var ly = room.top; ly < room.top + room.height; ly++) {
          this.addWall(room.left - 1, ly, room);
        }
      }
    }
  }, {
    key: "addWall",
    value: function addWall(x, y, room) {
      // Walls should only appear once in the global walls list and world grid
      if (this.world[y][x] === TILE.VOID) {
        this.world[y][x] = TILE.WALL;
        this.walls.push([x, y]);
      }
      if (this.world[y][x] === TILE.VOID || this.world[y][x] === TILE.WALL) {
        room.walls.push([x, y]);
      }
    }
  }, {
    key: "addDoorBetweenRooms",
    value: function addDoorBetweenRooms(x_dir, y_dir, existing_room_id, new_room_id) {
      var existing_room = this.rooms[existing_room_id];
      var new_room = this.rooms[new_room_id];
      var x, y, orientation;
      if (x_dir === 1) {
        // eastward
        x = existing_room.left - 1;
        y = this.randomFn(Math.max(existing_room.top, new_room.top) + 1, Math.min(existing_room.top + existing_room.height, new_room.top + new_room.height) - 2);
        orientation = 'h'; // horizontal
      } else if (x_dir === -1) {
        // stabbing westward
        x = new_room.left - 1;
        y = this.randomFn(Math.max(new_room.top, existing_room.top) + 1, Math.min(new_room.top + new_room.height, existing_room.top + existing_room.height) - 2);
        orientation = 'h'; // horizontal
      } else if (y_dir === -1) {
        // northward
        x = this.randomFn(Math.max(existing_room.left, new_room.left) + 1, Math.min(existing_room.left + existing_room.width, new_room.left + new_room.width) - 2);
        y = new_room.top - 1;
        orientation = 'v'; // vertical
      } else if (y_dir === 1) {
        // southward
        x = this.randomFn(Math.max(new_room.left, existing_room.left) + 1, Math.min(new_room.left + new_room.width, existing_room.left + existing_room.width) - 2);
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
  }, {
    key: "addSpecialRooms",
    value: function addSpecialRooms() {
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
      if (this.want_special && deadends.length >= 2) {
        // Enter + Exit + Special
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
      if (typeof enter_room_id === 'undefined') {
        //throw new Error('Unable to find a dead end room for Enter!');
        return;
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
        //throw new Error('Unable to find a dead end room for Exit!');
        return;
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
  }, {
    key: "randomNonEdgeInRoom",
    value: function randomNonEdgeInRoom(room_id) {
      var room = this.rooms[room_id];
      return {
        x: this.randomFn(room.left + 1, room.left + room.width - 2),
        y: this.randomFn(room.top + 1, room.top + room.height - 2)
      };
    }
  }, {
    key: "addDoor",
    value: function addDoor(x, y, room1, room2, orientation) {
      this.world[y][x] = TILE.DOOR;
      var door_id = this.door_id++;
      this.doors[door_id] = {
        x: x,
        y: y,
        id: door_id,
        orientation: orientation,
        rooms: [room1, room2]
      };
      this.rooms[room1].doors.push(door_id);
      this.rooms[room2].doors.push(door_id);
      return door_id;
    }

    /**
     * Pick a number between min and max, inclusive
     * e.g. 1,7 => 1,2,3,4,5,6,7
     */
  }, {
    key: "randomFn",
    value: function randomFn(min_raw, max_raw) {
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
  }, {
    key: "randomOdd",
    value: function randomOdd(min_raw, max_raw) {
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
      var r = this.random();
      //console.log('R', r);
      var result = Math.floor(r * (max + 1 - min) + min);
      result *= 2;
      result += 1;
      return result;
    }
  }, {
    key: "shuffle",
    value: function shuffle(o) {
      for (var j, x, i = o.length; i; j = Math.floor(this.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    }
  }]);
  return Roguelike;
}();
function ALGORITHM_THOMAS_HUNTER(tileMap, options) {
  tileMap.fill(1); // Fill with walls
  var maxDimension = Math.max(tileMap.width, tileMap.height);
  if (maxDimension <= 5) {
    return;
  }
  var fractional = Math.floor(Math.sqrt(Math.max(tileMap.width, tileMap.height)));
  if (fractional % 2 !== 1) fractional++;
  var roomNumber = Math.floor(tileMap.width / fractional * tileMap.width / fractional / 2);
  var rangius = Math.ceil(fractional / 2);
  var generator = new Roguelike({
    width: tileMap.width,
    // Max Width of the world
    height: tileMap.height,
    // Max Height of the world
    retry: 100,
    // How many times should we try to add a room?
    special: true,
    // Should we generate a "special" room?
    room: {
      // Give up once we get this number of rooms
      ideal: options.roomCount || roomNumber,
      min_width: options.roomMinWidth || fractional - rangius,
      max_width: options.roomMaxWidth || fractional + rangius,
      min_height: options.roomMinHeight || fractional - rangius,
      max_height: options.roomMinHeight || fractional + rangius
    }
  });
  var built = generator.build(function () {
    return tileMap.random();
  });

  //console.log(built.world.map((line)=>line.join('')).join('\n'));
  var flattened = built.world.reduce(function (agg, line) {
    return agg.concat(line);
  }, []);
  built.world = null;
  tileMap.world = built;
  for (var lcv = 0; lcv < tileMap.data.length; lcv++) {
    tileMap.data[lcv] = flattened[lcv];
  }
}

},{}],19:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = SHAPE_CIRCLE;
function SHAPE_CIRCLE(tileMap, options) {
  tileMap.fill(1);
  var radius = Math.min(tileMap.width, tileMap.height) / 2;
  var centerX = tileMap.width / 2;
  var centerY = tileMap.height / 2;
  for (var y = 0; y < tileMap.height; y++) {
    for (var x = 0; x < tileMap.width; x++) {
      if (Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2) <= Math.pow(radius, 2)) {
        tileMap.data[y * tileMap.width + x] = 0;
      }
    }
  }
}

},{}],20:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = SHAPE_SQUARE;
function SHAPE_SQUARE(tileMap, options) {
  tileMap.fill(0); // Filling the map with empty tiles
  var size = Math.min(tileMap.width, tileMap.height);
  var startX = Math.floor((tileMap.width - size) / 2);
  var startY = Math.floor((tileMap.height - size) / 2);
  for (var y = startY; y < startY + size; y++) {
    for (var x = startX; x < startX + size; x++) {
      tileMap.data[y * tileMap.width + x] = 1; // Fill with a different tile
    }
  }
}

},{}],21:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = SHAPE_TRIANGLE;
function SHAPE_TRIANGLE(tileMap, options) {
  tileMap.fill(0);
  var height = tileMap.height;
  var width = tileMap.width;
  for (var y = 0; y < height; y++) {
    for (var x = 0; x <= y; x++) {
      tileMap.data[y * width + x] = 1;
    }
  }
}

},{}],22:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = generateFaultLineMap;
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function generateFaultLineMap(tileMap, options) {
  var iterations = options.iterations || 100;
  var heightIncrease = options.heightIncrease || 0.01;

  // Initialize the height map
  var heightMap = new Array(tileMap.width * tileMap.height).fill(0);
  for (var i = 0; i < iterations; i++) {
    // Randomly create a fault line using tileMap.random()
    var a = tileMap.random() - 0.5;
    var b = tileMap.random() - 0.5;
    var d = tileMap.random();

    // Adjust the height on one side of the fault line
    for (var y = 0; y < tileMap.height; y++) {
      for (var x = 0; x < tileMap.width; x++) {
        if (a * x + b * y - d > 0) {
          heightMap[y * tileMap.width + x] += heightIncrease;
        }
      }
    }
  }

  // Normalize and apply to tileMap
  applyHeightToTileMap(tileMap, heightMap);
}
function applyHeightToTileMap(tileMap, heightMap) {
  var max = Math.max.apply(Math, _toConsumableArray(heightMap));
  var min = Math.min.apply(Math, _toConsumableArray(heightMap));
  for (var i = 0; i < heightMap.length; i++) {
    // Normalize the height values
    var normalizedHeight = (heightMap[i] - min) / (max - min);
    tileMap.data[i] = normalizedHeight;
  }
}

},{}],23:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = generatePerlinNoiseMap;
function generatePerlinNoiseMap(tileMap, options) {
  var scale = options.scale || 0.1; // Determines the "zoom level" of the noise

  for (var y = 0; y < tileMap.height; y++) {
    for (var x = 0; x < tileMap.width; x++) {
      // Generate Perlin noise value for each tile
      var noiseValue = tileMap.noise(x * scale, y * scale);

      // Optionally transform noiseValue here to suit your needs

      // Assign noise value to tileMap data
      tileMap.data[y * tileMap.width + x] = noiseValue;
    }
  }
}

},{}],24:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
// this program is a JavaScript version of Mersenne Twister, with concealment and encapsulation in class,
// an almost straight conversion from the original program, mt19937ar.c,
// translated by y. okada on July 17, 2006.
// and modified a little at july 20, 2006, but there are not any substantial differences.
// in this program, procedure descriptions and comments of original source code were not removed.
// lines commented with //c// were originally descriptions of c procedure. and a few following lines are appropriate JavaScript descriptions.
// lines commented with /* and */ are original comments.
// lines commented with // are additional comments in this JavaScript version.
// before using this version, create at least one instance of MersenneTwister19937 class, and initialize the each state, given below in c comments, of all the instances.
/*
   A C-program for MT19937, with initialization improved 2002/1/26.
   Coded by Takuji Nishimura and Makoto Matsumoto.

   Before using, initialize the state by using init_genrand(seed)
   or init_by_array(init_key, key_length).

   Copyright (C) 1997 - 2002, Makoto Matsumoto and Takuji Nishimura,
   All rights reserved.

   Redistribution and use in source and binary forms, with or without
   modification, are permitted provided that the following conditions
   are met:

     1. Redistributions of source code must retain the above copyright
        notice, this list of conditions and the following disclaimer.

     2. Redistributions in binary form must reproduce the above copyright
        notice, this list of conditions and the following disclaimer in the
        documentation and/or other materials provided with the distribution.

     3. The names of its contributors may not be used to endorse or promote
        products derived from this software without specific prior written
        permission.

   THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
   "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
   LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
   A PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT OWNER OR
   CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
   EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
   PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
   PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
   LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
   NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
   SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.


   Any feedback is very welcome.
   http://www.math.sci.hiroshima-u.ac.jp/~m-mat/MT/emt.html
   email: m-mat @ math.sci.hiroshima-u.ac.jp (remove space)
*/

function MersenneTwister19937() {
  /* constants should be scoped inside the class */
  var N, M, MATRIX_A, UPPER_MASK, LOWER_MASK;
  /* Period parameters */
  //c//#define N 624
  //c//#define M 397
  //c//#define MATRIX_A 0x9908b0dfUL   /* constant vector a */
  //c//#define UPPER_MASK 0x80000000UL /* most significant w-r bits */
  //c//#define LOWER_MASK 0x7fffffffUL /* least significant r bits */
  N = 624;
  M = 397;
  MATRIX_A = 0x9908b0df; /* constant vector a */
  UPPER_MASK = 0x80000000; /* most significant w-r bits */
  LOWER_MASK = 0x7fffffff; /* least significant r bits */
  //c//static unsigned long mt[N]; /* the array for the state vector  */
  //c//static int mti=N+1; /* mti==N+1 means mt[N] is not initialized */
  var mt = new Array(N); /* the array for the state vector  */
  var mti = N + 1; /* mti==N+1 means mt[N] is not initialized */

  function unsigned32(n1)
  // returns a 32-bits unsiged integer from an operand to which applied a bit operator.
  {
    return n1 < 0 ? (n1 ^ UPPER_MASK) + UPPER_MASK : n1;
  }
  function subtraction32(n1, n2)
  // emulates lowerflow of a c 32-bits unsiged integer variable, instead of the operator -. these both arguments must be non-negative integers expressible using unsigned 32 bits.
  {
    return n1 < n2 ? unsigned32(0x100000000 - (n2 - n1) & 0xffffffff) : n1 - n2;
  }
  function addition32(n1, n2)
  // emulates overflow of a c 32-bits unsiged integer variable, instead of the operator +. these both arguments must be non-negative integers expressible using unsigned 32 bits.
  {
    return unsigned32(n1 + n2 & 0xffffffff);
  }
  function multiplication32(n1, n2)
  // emulates overflow of a c 32-bits unsiged integer variable, instead of the operator *. these both arguments must be non-negative integers expressible using unsigned 32 bits.
  {
    var sum = 0;
    for (var i = 0; i < 32; ++i) {
      if (n1 >>> i & 0x1) {
        sum = addition32(sum, unsigned32(n2 << i));
      }
    }
    return sum;
  }

  /* initializes mt[N] with a seed */
  //c//void init_genrand(unsigned long s)
  this.init_genrand = function (s) {
    //c//mt[0]= s & 0xffffffff;
    mt[0] = unsigned32(s & 0xffffffff);
    for (mti = 1; mti < N; mti++) {
      mt[mti] =
      //c//(1812433253 * (mt[mti-1] ^ (mt[mti-1] >> 30)) + mti);
      addition32(multiplication32(1812433253, unsigned32(mt[mti - 1] ^ mt[mti - 1] >>> 30)), mti);
      /* See Knuth TAOCP Vol2. 3rd Ed. P.106 for multiplier. */
      /* In the previous versions, MSBs of the seed affect   */
      /* only MSBs of the array mt[].                        */
      /* 2002/01/09 modified by Makoto Matsumoto             */
      //c//mt[mti] &= 0xffffffff;
      mt[mti] = unsigned32(mt[mti] & 0xffffffff);
      /* for >32 bit machines */
    }
  };

  /* initialize by an array with array-length */
  /* init_key is the array for initializing keys */
  /* key_length is its length */
  /* slight change for C++, 2004/2/26 */
  //c//void init_by_array(unsigned long init_key[], int key_length)
  this.init_by_array = function (init_key, key_length) {
    //c//int i, j, k;
    var i, j, k;
    //c//init_genrand(19650218);
    this.init_genrand(19650218);
    i = 1;
    j = 0;
    k = N > key_length ? N : key_length;
    for (; k; k--) {
      //c//mt[i] = (mt[i] ^ ((mt[i-1] ^ (mt[i-1] >> 30)) * 1664525))
      //c//	+ init_key[j] + j; /* non linear */
      mt[i] = addition32(addition32(unsigned32(mt[i] ^ multiplication32(unsigned32(mt[i - 1] ^ mt[i - 1] >>> 30), 1664525)), init_key[j]), j);
      mt[i] =
      //c//mt[i] &= 0xffffffff; /* for WORDSIZE > 32 machines */
      unsigned32(mt[i] & 0xffffffff);
      i++;
      j++;
      if (i >= N) {
        mt[0] = mt[N - 1];
        i = 1;
      }
      if (j >= key_length) {
        j = 0;
      }
    }
    for (k = N - 1; k; k--) {
      //c//mt[i] = (mt[i] ^ ((mt[i-1] ^ (mt[i-1] >> 30)) * 1566083941))
      //c//- i; /* non linear */
      mt[i] = subtraction32(unsigned32((dbg = mt[i]) ^ multiplication32(unsigned32(mt[i - 1] ^ mt[i - 1] >>> 30), 1566083941)), i);
      //c//mt[i] &= 0xffffffff; /* for WORDSIZE > 32 machines */
      mt[i] = unsigned32(mt[i] & 0xffffffff);
      i++;
      if (i >= N) {
        mt[0] = mt[N - 1];
        i = 1;
      }
    }
    mt[0] = 0x80000000; /* MSB is 1; assuring non-zero initial array */
  };

  /* moved outside of genrand_int32() by jwatte 2010-11-17; generate less garbage */
  var mag01 = [0x0, MATRIX_A];

  /* generates a random number on [0,0xffffffff]-interval */
  //c//unsigned long genrand_int32(void)
  this.genrand_int32 = function () {
    //c//unsigned long y;
    //c//static unsigned long mag01[2]={0x0UL, MATRIX_A};
    var y;
    /* mag01[x] = x * MATRIX_A  for x=0,1 */

    if (mti >= N) {
      /* generate N words at one time */
      //c//int kk;
      var kk;
      if (mti == N + 1) /* if init_genrand() has not been called, */
        //c//init_genrand(5489); /* a default initial seed is used */
        {
          this.init_genrand(5489);
        } /* a default initial seed is used */

      for (kk = 0; kk < N - M; kk++) {
        //c//y = (mt[kk]&UPPER_MASK)|(mt[kk+1]&LOWER_MASK);
        //c//mt[kk] = mt[kk+M] ^ (y >> 1) ^ mag01[y & 0x1];
        y = unsigned32(mt[kk] & UPPER_MASK | mt[kk + 1] & LOWER_MASK);
        mt[kk] = unsigned32(mt[kk + M] ^ y >>> 1 ^ mag01[y & 0x1]);
      }
      for (; kk < N - 1; kk++) {
        //c//y = (mt[kk]&UPPER_MASK)|(mt[kk+1]&LOWER_MASK);
        //c//mt[kk] = mt[kk+(M-N)] ^ (y >> 1) ^ mag01[y & 0x1];
        y = unsigned32(mt[kk] & UPPER_MASK | mt[kk + 1] & LOWER_MASK);
        mt[kk] = unsigned32(mt[kk + (M - N)] ^ y >>> 1 ^ mag01[y & 0x1]);
      }
      //c//y = (mt[N-1]&UPPER_MASK)|(mt[0]&LOWER_MASK);
      //c//mt[N-1] = mt[M-1] ^ (y >> 1) ^ mag01[y & 0x1];
      y = unsigned32(mt[N - 1] & UPPER_MASK | mt[0] & LOWER_MASK);
      mt[N - 1] = unsigned32(mt[M - 1] ^ y >>> 1 ^ mag01[y & 0x1]);
      mti = 0;
    }
    y = mt[mti++];

    /* Tempering */
    //c//y ^= (y >> 11);
    //c//y ^= (y << 7) & 0x9d2c5680;
    //c//y ^= (y << 15) & 0xefc60000;
    //c//y ^= (y >> 18);
    y = unsigned32(y ^ y >>> 11);
    y = unsigned32(y ^ y << 7 & 0x9d2c5680);
    y = unsigned32(y ^ y << 15 & 0xefc60000);
    y = unsigned32(y ^ y >>> 18);
    return y;
  };

  /* generates a random number on [0,0x7fffffff]-interval */
  //c//long genrand_int31(void)
  this.genrand_int31 = function () {
    //c//return (genrand_int32()>>1);
    return this.genrand_int32() >>> 1;
  };

  /* generates a random number on [0,1]-real-interval */
  //c//double genrand_real1(void)
  this.genrand_real1 = function () {
    //c//return genrand_int32()*(1.0/4294967295.0);
    return this.genrand_int32() * (1.0 / 4294967295.0);
    /* divided by 2^32-1 */
  };

  /* generates a random number on [0,1)-real-interval */
  //c//double genrand_real2(void)
  this.genrand_real2 = function () {
    //c//return genrand_int32()*(1.0/4294967296.0);
    return this.genrand_int32() * (1.0 / 4294967296.0);
    /* divided by 2^32 */
  };

  /* generates a random number on (0,1)-real-interval */
  //c//double genrand_real3(void)
  this.genrand_real3 = function () {
    //c//return ((genrand_int32()) + 0.5)*(1.0/4294967296.0);
    return (this.genrand_int32() + 0.5) * (1.0 / 4294967296.0);
    /* divided by 2^32 */
  };

  /* generates a random number on [0,1) with 53-bit resolution*/
  //c//double genrand_res53(void)
  this.genrand_res53 = function () {
    //c//unsigned long a=genrand_int32()>>5, b=genrand_int32()>>6;
    var a = this.genrand_int32() >>> 5,
      b = this.genrand_int32() >>> 6;
    return (a * 67108864.0 + b) * (1.0 / 9007199254740992.0);
  };
  /* These real versions are due to Isaku Wada, 2002/01/09 added */
}

//  Exports: Public API

//  Export the twister class
//exports.MersenneTwister19937 = MersenneTwister19937;
var _default = exports["default"] = MersenneTwister19937;

},{}],25:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = generateTiledJSON;
function generateTiledJSON(tileMap) {
  var layers = [];
  // Check if tileMap.data is a 3D array
  if (typeof tileMap.data[0][0] !== 'undefined') {
    var depth = tileMap.data.length; // Assuming the depth is the first dimension of the 3D array
    for (var z = 0; z < depth; z++) {
      layers.push({
        "data": tileMap.data[z].flat(),
        // Flatten the 2D array to 1D for the layer data
        "height": tileMap.height,
        "id": z + 1,
        // ID should be unique for each layer, hence z + 1
        "name": "Tile Layer ".concat(z + 1),
        "opacity": 1,
        "type": "tilelayer",
        "visible": true,
        "width": tileMap.width,
        "x": 0,
        "y": 0,
        "parallaxoriginy": z / depth // Set the parallaxoriginy based on z-index
      });
    }
  } else {
    // If it's not a 3D array, just use the original layer
    layers.push({
      "data": tileMap.data,
      "height": tileMap.height,
      "id": 1,
      "name": "Tile Layer 1",
      "opacity": 1,
      "type": "tilelayer",
      "visible": true,
      "width": tileMap.width,
      "x": 0,
      "y": 0
    });
  }
  var tiledJSON = {
    "compressionlevel": -1,
    "height": tileMap.height,
    "infinite": false,
    "layers": layers,
    "nextlayerid": layers.length + 1,
    "nextobjectid": 1,
    "orientation": "orthogonal",
    "renderorder": "right-down",
    "tiledversion": "1.10.2",
    "tileheight": 16,
    "tilesets": [{
      "columns": 0,
      "firstgid": 1,
      "grid": {
        "height": 1,
        "orientation": "orthogonal",
        "width": 1
      },
      "margin": 0,
      "name": "grass-land",
      "spacing": 0,
      "tilecount": 2,
      "tileheight": 16,
      "tiles": [
        // Custom tile set mappings
      ],
      "tilewidth": 16
    }],
    "tilewidth": 16,
    "type": "map",
    "version": "1.10",
    "width": tileMap.width
  };
  tiledJSON.tilesets[0].tiles = [
  // TODO: custom tile set mappings
  {
    "id": 0,
    "image": "tile-bush.png",
    "imageheight": 16,
    "imagewidth": 16
  }, {
    "id": 1,
    "image": "tile-grass.png",
    "imageheight": 16,
    "imagewidth": 16
  }, {
    "id": 2,
    "image": "tile-block.png",
    "imageheight": 16,
    "imagewidth": 16
  }, {
    "id": 3,
    "image": "tile-path-brown.png",
    "imageheight": 16,
    "imagewidth": 16
  }, {
    "id": 4,
    "image": "tile-path-green.png",
    "imageheight": 16,
    "imagewidth": 16
  }];
  return tiledJSON;
}

/* infinite style map with chunks
  "editorsettings": {
    "chunksize": {
      "height": 8,
      "width": 8
    }
  },

  "layers": [{
    "chunks": [{
      "data": tileMap.data,  // Your tileMap data
      "height": tileMap.height,
      "width": tileMap.width,
      "x": 0,
      "y": 0
    }],
    "height": tileMap.height,
    "name": "Tile Layer 1",
    "opacity": 1,
    "startx": 0,
    "starty": 0,
    "type": "tilelayer",
    "visible": true,
    "width": tileMap.width,
    "x": 0,
    "y": 0
  }],
  */

},{}],26:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _MersenneTwister = _interopRequireDefault(require("./MersenneTwister19937.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); } // var Gen = require('../vendor/mersenne').MersenneTwister19937;
function Mersenne() {
  var gen = new _MersenneTwister["default"]();
  var seed = new Date().getTime() % 1000000000;
  this.currentSeed = seed;
  gen.init_genrand(seed);
  this.rand = function (max, min) {
    if (typeof max === 'undefined') {
      return gen.genrand_real2(); // Returns a floating-point number between 0 and 1
    }
    if (typeof min === 'undefined') {
      min = 0;
    }
    return Math.floor(gen.genrand_real2() * (max - min) + min);
  };
  this.seed = function (S) {
    // check incoming value of seed and coherce to number
    // try to convert seed to number, if not number, consider as string
    var _seed = Number(S);
    if (isNaN(_seed)) {
      // convert into hash
      _seed = this.stringToSeed(S);
    }
    if (typeof _seed != 'number') {
      throw new Error("seed(S) must take numeric argument; is " + _typeof(S));
    }
    this.currentSeed = _seed;
    gen.init_genrand(_seed);
  };
  this.seed_array = function (A) {
    if (_typeof(A) != 'object') {
      throw new Error("seed_array(A) must take array of numbers; is " + _typeof(A));
    }
    this.currentSeed = A;
    gen.init_by_array(A, A.length);
  };
  this.stringToSeed = function (str) {
    // Simple hash function to convert a string to a number
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
      var _char = str.charCodeAt(i);
      hash = (hash << 5) - hash + _char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
  };
}
var _default = exports["default"] = Mersenne;

},{"./MersenneTwister19937.js":24}],27:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
//////////////////////////////////////////////////////////////
// From p5.js - LGPL-2.1 license
// https://github.com/processing/p5.js
// https://github.com/processing/p5.js/blob/3d45ce9b130a007668bfac7768fbcdd6b8ff41ec/src/math/noise.js
// http://mrl.nyu.edu/~perlin/noise/
// Adapting from PApplet.java
// which was adapted from toxi
// which was adapted from the german demo group farbrausch
// as used in their demo "art": http://www.farb-rausch.de/fr010src.zip

// someday we might consider using "improved noise"
// http://mrl.nyu.edu/~perlin/paper445.pdf
// See: https://github.com/shiffman/The-Nature-of-Code-Examples-p5.js/
//      blob/main/introduction/Noise1D/noise.js

/**
 * @module Math
 * @submodule Noise
 * @for p5
 * @requires core
 */

var p5 = function p5() {};
var PERLIN_YWRAPB = 4;
var PERLIN_YWRAP = 1 << PERLIN_YWRAPB;
var PERLIN_ZWRAPB = 8;
var PERLIN_ZWRAP = 1 << PERLIN_ZWRAPB;
var PERLIN_SIZE = 4095;
var perlin_octaves = 4; // default to medium smooth
var perlin_amp_falloff = 0.5; // 50% reduction/octave

var scaled_cosine = function scaled_cosine(i) {
  return 0.5 * (1.0 - Math.cos(i * Math.PI));
};
var perlin; // will be initialized lazily by noise() or noiseSeed()

/**
 * Returns random numbers that can be tuned to feel more organic. The values
 * returned will always be between 0 and 1.
 *
 * Values returned by <a href="#/p5/random">random()</a> and
 * <a href="#/p5/randomGaussian">randomGaussian()</a> can change by large
 * amounts between function calls. By contrast, values returned by `noise()`
 * can be made "smooth". Calls to `noise()` with similar inputs will produce
 * similar outputs. `noise()` is used to create textures, motion, shapes,
 * terrains, and so on. Ken Perlin invented `noise()` while animating the
 * original <em>Tron</em> film in the 1980s.
 *
 * `noise()` returns the same value for a given input while a sketch is
 * running. It produces different results each time a sketch runs. The
 * <a href="#/p5/noiseSeed">noiseSeed()</a> function can be used to generate
 * the same sequence of Perlin noise values each time a sketch runs.
 *
 * The character of the noise can be adjusted in two ways. The first way is to
 * scale the inputs. `noise()` interprets inputs as coordinates. The sequence
 * of noise values will be smoother when the input coordinates are closer. The
 * second way is to use the <a href="#/p5/noiseDetail">noiseDetail()</a>
 * function.
 *
 * The version of `noise()` with one parameter computes noise values in one
 * dimension. This dimension can be thought of as space, as in `noise(x)`, or
 * time, as in `noise(t)`.
 *
 * The version of `noise()` with two parameters computes noise values in two
 * dimensions. These dimensions can be thought of as space, as in
 * `noise(x, y)`, or space and time, as in `noise(x, t)`.
 *
 * The version of `noise()` with three parameters computes noise values in
 * three dimensions. These dimensions can be thought of as space, as in
 * `noise(x, y, z)`, or space and time, as in `noise(x, y, t)`.
 *
 * @method noise
 * @param  {Number} x   x-coordinate in noise space.
 * @param  {Number} [y] y-coordinate in noise space.
 * @param  {Number} [z] z-coordinate in noise space.
 * @return {Number}     Perlin noise value at specified coordinates.
 * @example
 * <div>
 * <code>
 * function draw() {
 *   background(200);
 *
 *   let x = 100 * noise(0.005 * frameCount);
 *   let y = 100 * noise(0.005 * frameCount + 10000);
 *
 *   strokeWeight(5);
 *   point(x, y);
 *
 *   describe('A black dot moves randomly on a gray square.');
 * }
 * </code>
 * </div>
 *
 * <div>
 * <code>
 * function draw() {
 *   background(200);
 *
 *   let noiseLevel = 100;
 *   let noiseScale = 0.005;
 *   // Scale input coordinate.
 *   let nt = noiseScale * frameCount;
 *   // Compute noise value.
 *   let x = noiseLevel * noise(nt);
 *   let y = noiseLevel * noise(nt + 10000);
 *   // Render.
 *   strokeWeight(5);
 *   point(x, y);
 *
 *   describe('A black dot moves randomly on a gray square.');
 * }
 * </code>
 * </div>
 *
 * <div>
 * <code>
 * function draw() {
 *   let noiseLevel = 100;
 *   let noiseScale = 0.02;
 *   // Scale input coordinate.
 *   let x = frameCount;
 *   let nx = noiseScale * x;
 *   // Compute noise value.
 *   let y = noiseLevel * noise(nx);
 *   // Render.
 *   line(x, 0, x, y);
 *
 *   describe('A hilly terrain drawn in gray against a black sky.');
 * }
 * </code>
 * </div>
 *
 * <div>
 * <code>
 * function draw() {
 *   background(200);
 *
 *   let noiseLevel = 100;
 *   let noiseScale = 0.002;
 *   for (let x = 0; x < width; x += 1) {
 *     // Scale input coordinates.
 *     let nx = noiseScale * x;
 *     let nt = noiseScale * frameCount;
 *     // Compute noise value.
 *     let y = noiseLevel * noise(nx, nt);
 *     // Render.
 *     line(x, 0, x, y);
 *   }
 *
 *   describe('A calm sea drawn in gray against a black sky.');
 * }
 * </code>
 * </div>
 *
 * <div>
 * <code>
 * let noiseLevel = 255;
 * let noiseScale = 0.01;
 * for (let y = 0; y < height; y += 1) {
 *   for (let x = 0; x < width; x += 1) {
 *     // Scale input coordinates.
 *     let nx = noiseScale * x;
 *     let ny = noiseScale * y;
 *     // Compute noise value.
 *     let c = noiseLevel * noise(nx, ny);
 *     // Render.
 *     stroke(c);
 *     point(x, y);
 *   }
 * }
 *
 * describe('A gray cloudy pattern.');
 * </code>
 * </div>
 *
 * <div>
 * <code>
 * function draw() {
 *   let noiseLevel = 255;
 *   let noiseScale = 0.009;
 *   for (let y = 0; y < height; y += 1) {
 *     for (let x = 0; x < width; x += 1) {
 *       // Scale input coordinates.
 *       let nx = noiseScale * x;
 *       let ny = noiseScale * y;
 *       let nt = noiseScale * frameCount;
 *       // Compute noise value.
 *       let c = noiseLevel * noise(nx, ny, nt);
 *       // Render.
 *       stroke(c);
 *       point(x, y);
 *     }
 *   }
 *
 *   describe('A gray cloudy pattern that changes.');
 * }
 * </code>
 * </div>
 */

p5.prototype.noise = function () {
  var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var z = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  if (perlin == null) {
    perlin = new Array(PERLIN_SIZE + 1);
    for (var i = 0; i < PERLIN_SIZE + 1; i++) {
      perlin[i] = Math.random();
    }
  }
  if (x < 0) {
    x = -x;
  }
  if (y < 0) {
    y = -y;
  }
  if (z < 0) {
    z = -z;
  }
  var xi = Math.floor(x),
    yi = Math.floor(y),
    zi = Math.floor(z);
  var xf = x - xi;
  var yf = y - yi;
  var zf = z - zi;
  var rxf, ryf;
  var r = 0;
  var ampl = 0.5;
  var n1, n2, n3;
  for (var o = 0; o < perlin_octaves; o++) {
    var of = xi + (yi << PERLIN_YWRAPB) + (zi << PERLIN_ZWRAPB);
    rxf = scaled_cosine(xf);
    ryf = scaled_cosine(yf);
    n1 = perlin[of & PERLIN_SIZE];
    n1 += rxf * (perlin[of + 1 & PERLIN_SIZE] - n1);
    n2 = perlin[of + PERLIN_YWRAP & PERLIN_SIZE];
    n2 += rxf * (perlin[of + PERLIN_YWRAP + 1 & PERLIN_SIZE] - n2);
    n1 += ryf * (n2 - n1);
    of += PERLIN_ZWRAP;
    n2 = perlin[of & PERLIN_SIZE];
    n2 += rxf * (perlin[of + 1 & PERLIN_SIZE] - n2);
    n3 = perlin[of + PERLIN_YWRAP & PERLIN_SIZE];
    n3 += rxf * (perlin[of + PERLIN_YWRAP + 1 & PERLIN_SIZE] - n3);
    n2 += ryf * (n3 - n2);
    n1 += scaled_cosine(zf) * (n2 - n1);
    r += n1 * ampl;
    ampl *= perlin_amp_falloff;
    xi <<= 1;
    xf *= 2;
    yi <<= 1;
    yf *= 2;
    zi <<= 1;
    zf *= 2;
    if (xf >= 1.0) {
      xi++;
      xf--;
    }
    if (yf >= 1.0) {
      yi++;
      yf--;
    }
    if (zf >= 1.0) {
      zi++;
      zf--;
    }
  }
  return r;
};

/**
 * Adjusts the character of the noise produced by the
 * <a href="#/p5/noise">noise()</a> function.
 *
 * Perlin noise values are created by adding layers of noise together. The
 * noise layers, called octaves, are similar to harmonics in music. Lower
 * octaves contribute more to the output signal. They define the overall
 * intensity of the noise. Higher octaves create finer-grained details.
 *
 * By default, noise values are created by combining four octaves. Each higher
 * octave contributes half as much (50% less) compared to its predecessor.
 * `noiseDetail()` changes the number of octaves and the falloff amount. For
 * example, calling `noiseDetail(6, 0.25)` ensures that
 * <a href="#/p5/noise">noise()</a> will use six octaves. Each higher octave
 * will contribute 25% as much (75% less) compared to its predecessor. Falloff
 * values between 0 and 1 are valid. However, falloff values greater than 0.5
 * might result in noise values greater than 1.
 *
 * @method noiseDetail
 * @param {Number} lod number of octaves to be used by the noise.
 * @param {Number} falloff falloff factor for each octave.
 * @example
 * <div>
 * <code>
 * let noiseLevel = 255;
 * let noiseScale = 0.02;
 * for (let y = 0; y < height; y += 1) {
 *   for (let x = 0; x < width / 2; x += 1) {
 *     // Scale input coordinates.
 *     let nx = noiseScale * x;
 *     let ny = noiseScale * y;
 *
 *     // Compute noise value.
 *     noiseDetail(6, 0.25);
 *     let c = noiseLevel * noise(nx, ny);
 *     // Render left side.
 *     stroke(c);
 *     point(x, y);
 *
 *     // Compute noise value.
 *     noiseDetail(4, 0.5);
 *     c = noiseLevel * noise(nx, ny);
 *     // Render right side.
 *     stroke(c);
 *     point(x + width / 2, y);
 *   }
 * }
 *
 * describe('Two gray cloudy patterns. The pattern on the right is cloudier than the pattern on the left.');
 * </code>
 * </div>
 */
p5.prototype.noiseDetail = function (lod, falloff) {
  if (lod > 0) {
    perlin_octaves = lod;
  }
  if (falloff > 0) {
    perlin_amp_falloff = falloff;
  }
};

/**
 * Sets the seed value for <a href="#/p5/noise">noise()</a>. By default,
 * <a href="#/p5/noise">noise()</a> produces different results each time
 * a sketch is run. Calling `noiseSeed()` with a constant
 * argument, such as `noiseSeed(99)`, makes <a href="#/p5/noise">noise()</a>
 * produce the same results each time a sketch is run.
 *
 * @method noiseSeed
 * @param {Number} seed   seed value.
 * @example
 * <div>
 * <code>
 * function setup() {
 *   noiseSeed(99);
 *   background(255);
 * }
 *
 * function draw() {
 *   let noiseLevel = 100;
 *   let noiseScale = 0.005;
 *   // Scale input coordinate.
 *   let nt = noiseScale * frameCount;
 *   // Compute noise value.
 *   let x = noiseLevel * noise(nt);
 *   // Render.
 *   line(x, 0, x, height);
 *
 *   describe('A black rectangle that grows randomly, first to the right and then to the left.');
 * }
 * </code>
 * </div>
 */
p5.prototype.noiseSeed = function (seed) {
  // Linear Congruential Generator
  // Variant of a Lehman Generator
  var lcg = function () {
    // Set to values from http://en.wikipedia.org/wiki/Numerical_Recipes
    // m is basically chosen to be large (as it is the max period)
    // and for its relationships to a and c
    var m = 4294967296;
    // a - 1 should be divisible by m's prime factors
    var a = 1664525;
    // c and m should be co-prime
    var c = 1013904223;
    var seed, z;
    return {
      setSeed: function setSeed(val) {
        // pick a random seed if val is undefined or null
        // the >>> 0 casts the seed to an unsigned 32-bit integer
        z = seed = (val == null ? Math.random() * m : val) >>> 0;
      },
      getSeed: function getSeed() {
        return seed;
      },
      rand: function rand() {
        // define the recurrence relationship
        z = (a * z + c) % m;
        // return a float in [0, 1)
        // if z = m then z / m = 0 therefore (z % m) / m < 1 always
        return z / m;
      }
    };
  }();
  lcg.setSeed(seed);
  perlin = new Array(PERLIN_SIZE + 1);
  for (var i = 0; i < PERLIN_SIZE + 1; i++) {
    perlin[i] = lcg.rand();
  }
};
var _default = exports["default"] = p5;

},{}]},{},[1])(1)
});
