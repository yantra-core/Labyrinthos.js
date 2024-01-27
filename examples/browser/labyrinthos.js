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

},{"./lib/Tile.js":2,"./lib/TileMap.js":3,"./lib/labyrinthos.js":4}],2:[function(require,module,exports){
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
var Tile = exports["default"] = /*#__PURE__*/_createClass(function Tile(type) {
  _classCallCheck(this, Tile);
  this.type = type; // Integer representing the tile type
});

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mersenne = _interopRequireDefault(require("./util/mersenne.js"));
var _generateTiledJSON = _interopRequireDefault(require("./util/generateTiledJSON.js"));
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
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } // Randomness
var TileMap = exports["default"] = /*#__PURE__*/function () {
  function TileMap() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$x = _ref.x,
      x = _ref$x === void 0 ? 0 : _ref$x,
      _ref$y = _ref.y,
      y = _ref$y === void 0 ? 0 : _ref$y,
      width = _ref.width,
      height = _ref.height,
      depth = _ref.depth,
      tileWidth = _ref.tileWidth,
      tileHeight = _ref.tileHeight,
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
    this.is3D = is3D;
    this.mersenneTwister = new _mersenne["default"]();
    this.data = this.initializeDataArray({
      width: width,
      height: height,
      is3D: is3D
    });

    // ASCII representations for tiles 0-10
    // TODO: Is there a better default set of ASCII characters we can use?
    this.defaultRogueLike = ['-', '#', '+', '0', '<', '>', '$', '#', '@', '&', '?'];
  }
  _createClass(TileMap, [{
    key: "initializeDataArray",
    value: function initializeDataArray() {
      // Create a single-dimensional array
      var data;
      if (this.is3D) {
        data = init3DArray(this.width, this.height, this.depth);
      } else {
        data = init2DArray(this.width, this.height);
      }
      return data;
    }
  }, {
    key: "fill",
    value: function fill(value) {
      if (this.is3D) {
        for (var z = 0; z < this.depth; z++) {
          //  this.fill2D(value, z);
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
    key: "random",
    value: function random(max) {
      return this.mersenneTwister.rand(max);
    }
  }, {
    key: "seed",
    value: function seed(value) {
      this.mersenneTwister.seed(value);
      // this.mersenneTwister.seed_array([value]); // also can seed from arrays
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
      var asciiLookup = format || this.defaultRogueLike;
      var asciiMap = '';
      for (var y = 0; y < this.height; y++) {
        for (var x = 0; x < this.width; x++) {
          var tile = this.data[y * this.width + x];
          asciiMap += asciiLookup[tile % asciiLookup.length]; // Use modulo to wrap around if tile index exceeds lookup table
        }
        asciiMap += '\n'; // New line at the end of each row
      }
      return asciiMap;
    }
  }, {
    key: "toJSON",
    value: function toJSON() {
      return JSON.stringify({
        width: this.width,
        height: this.height,
        tileWidth: this.tileWidth,
        tileHeight: this.tileHeight,
        is3D: this.is3D,
        data: this.data
      }, null, 2);
    }
  }, {
    key: "toTiledJSON",
    value: function toTiledJSON() {
      return (0, _generateTiledJSON["default"])(this);
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

},{"./util/generateTiledJSON.js":18,"./util/mersenne.js":19}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _Tile = _interopRequireDefault(require("./Tile.js"));
var _TileMap = _interopRequireDefault(require("./TileMap.js"));
var _AldousBroder = _interopRequireDefault(require("./mazes/AldousBroder.js"));
var _BinaryTree = _interopRequireDefault(require("./mazes/BinaryTree.js"));
var _CellularAutomata = _interopRequireDefault(require("./mazes/CellularAutomata.js"));
var _EllersAlgorithm = _interopRequireDefault(require("./mazes/EllersAlgorithm.js"));
var _GrowingTree = _interopRequireDefault(require("./mazes/GrowingTree.js"));
var _RecursiveBacktrack = _interopRequireDefault(require("./mazes/RecursiveBacktrack.js"));
var _RecursiveDivision = _interopRequireDefault(require("./mazes/RecursiveDivision.js"));
var _ThomasHunter = _interopRequireDefault(require("./mazes/ThomasHunter.js"));
var _Circle = _interopRequireDefault(require("./shapes/Circle.js"));
var _Square = _interopRequireDefault(require("./shapes/Square.js"));
var _Triangle = _interopRequireDefault(require("./shapes/Triangle.js"));
var _FaultLine = _interopRequireDefault(require("./terrains/FaultLine.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// Mazes

// import HuntAndKill from './mazes/HuntAndKill.js';

// import SpiralBacktrack from './mazes/SpiralBacktrack.js';

// import TremauxsAlgorithm from './mazes/TremauxsAlgorithm.js';
// import VoronoiDiagram from './mazes/VoronoiDiagram.js';

// Shapes

// import Hexagon from './shapes/Hexagon.js';

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
labyrinthos.mazes.BinaryTree = _BinaryTree["default"];
labyrinthos.mazes.CellularAutomata = _CellularAutomata["default"];
labyrinthos.mazes.EllersAlgorithm = _EllersAlgorithm["default"];
labyrinthos.mazes.GrowingTree = _GrowingTree["default"];
// labyrinthos.mazes.HuntAndKill = HuntAndKill;
labyrinthos.mazes.RecursiveBacktrack = _RecursiveBacktrack["default"];
labyrinthos.mazes.RecursiveDivision = _RecursiveDivision["default"];
// labyrinthos.mazes.SpiralBacktrack = SpiralBacktrack;
labyrinthos.mazes.ThomasHunter = _ThomasHunter["default"];
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
labyrinthos.utils = {};
// labyrinthos.utils.mapImageToTileMap = mapImageToTileMap;

labyrinthos.Tile = _Tile["default"];
labyrinthos.TileMap = _TileMap["default"];
var _default = exports["default"] = labyrinthos;

},{"./Tile.js":2,"./TileMap.js":3,"./mazes/AldousBroder.js":5,"./mazes/BinaryTree.js":6,"./mazes/CellularAutomata.js":7,"./mazes/EllersAlgorithm.js":8,"./mazes/GrowingTree.js":9,"./mazes/RecursiveBacktrack.js":10,"./mazes/RecursiveDivision.js":11,"./mazes/ThomasHunter.js":12,"./shapes/Circle.js":13,"./shapes/Square.js":14,"./shapes/Triangle.js":15,"./terrains/FaultLine.js":16}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = ALGORITHM_ALDOUS_BRODER;
function ALGORITHM_ALDOUS_BRODER(tileMap, options) {
  tileMap.fill(1); // Fill with walls
  var visitedCells = 0;
  var totalCells = tileMap.width * tileMap.height / 4; // Assumes a grid where every other cell is open
  var currentX = 2 * Math.floor(Math.random() * Math.floor(tileMap.width / 2));
  var currentY = 2 * Math.floor(Math.random() * Math.floor(tileMap.height / 2));
  tileMap.data[currentY * tileMap.width + currentX] = 0; // Open starting cell
  visitedCells++;
  while (visitedCells < totalCells) {
    var directions = [[2, 0], [-2, 0], [0, 2], [0, -2]];
    var randomDirection = directions[Math.floor(Math.random() * directions.length)];
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

},{}],6:[function(require,module,exports){
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

},{}],7:[function(require,module,exports){
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

},{}],8:[function(require,module,exports){
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

},{}],9:[function(require,module,exports){
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

},{}],10:[function(require,module,exports){
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

},{}],11:[function(require,module,exports){
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

},{}],12:[function(require,module,exports){
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
  var visitedCells = 0;
  var totalCells = tileMap.width * tileMap.height / 4; // Assumes a grid where every other cell is open
  var fractional = Math.sqrt(Math.max(tileMap.width, tileMap.height));
  if (fractional % 2 !== 1) fractional++;
  var roomNumber = tileMap.width / fractional * tileMap.width / fractional / 2;
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
      min_width: options.roomMinWidth || fractional - 2,
      max_width: options.roomMaxWidth || fractional + 2,
      min_height: options.roomMinHeight || fractional - 2,
      max_height: options.roomMinHeight || fractional + 2
    }
  });
  var built = generator.build(function () {
    return tileMap.mersenneTwister.rand();
  });

  //console.log(built.world.map((line)=>line.join('')).join('\n'));
  var flattened = built.world.reduce(function (agg, line) {
    return agg.concat(line);
  }, []);
  for (var lcv = 0; lcv < tileMap.data.length; lcv++) {
    tileMap.data[lcv] = flattened[lcv];
  }
}

},{}],13:[function(require,module,exports){
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

},{}],14:[function(require,module,exports){
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

},{}],15:[function(require,module,exports){
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

},{}],16:[function(require,module,exports){
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

},{}],17:[function(require,module,exports){
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

},{}],18:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = generateTiledJSON;
function generateTiledJSON(tileMap) {
  var tiledJSON = {
    "compressionlevel": -1,
    "height": tileMap.height,
    "infinite": false,
    "layers": [{
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
    }],
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
    "nextlayerid": 2,
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
      }],
      "tilewidth": 16
    }],
    "tilewidth": 16,
    "type": "map",
    "version": "1.10",
    "width": tileMap.width
    // Add your tilesets and other necessary properties here
  };
  return tiledJSON;
}

},{}],19:[function(require,module,exports){
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
    if (typeof S != 'number') {
      throw new Error("seed(S) must take numeric argument; is " + _typeof(S));
    }
    this.currentSeed = S;
    gen.init_genrand(S);
  };
  this.seed_array = function (A) {
    if (_typeof(A) != 'object') {
      throw new Error("seed_array(A) must take array of numbers; is " + _typeof(A));
    }
    this.currentSeed = A;
    gen.init_by_array(A, A.length);
  };
}
var _default = exports["default"] = Mersenne;

},{"./MersenneTwister19937.js":17}]},{},[1])(1)
});
