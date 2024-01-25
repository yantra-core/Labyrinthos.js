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
exports.terrains = exports.shapes = exports.mazes = void 0;
var _labyrinthos = _interopRequireDefault(require("./lib/labyrinthos.js"));
var _Tile = _interopRequireDefault(require("./lib/Tile.js"));
var _TileMap = _interopRequireDefault(require("./lib/TileMap.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var mazes = exports.mazes = _labyrinthos["default"].mazes;
var terrains = exports.terrains = _labyrinthos["default"].terrains;
var shapes = exports.shapes = _labyrinthos["default"].shapes;

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

},{"./util/generateTiledJSON.js":16,"./util/mersenne.js":17}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _Tile = _interopRequireDefault(require("./Tile.js"));
var _TileMap = _interopRequireDefault(require("./TileMap.js"));
var _AldousBroder = _interopRequireDefault(require("./mazes/AldousBroder.js"));
var _BinaryTree = _interopRequireDefault(require("./mazes/BinaryTree.js"));
var _RecursiveBacktrack = _interopRequireDefault(require("./mazes/RecursiveBacktrack.js"));
var _RecursiveDivision = _interopRequireDefault(require("./mazes/RecursiveDivision.js"));
var _SpiralBacktrack = _interopRequireDefault(require("./mazes/SpiralBacktrack.js"));
var _Circle = _interopRequireDefault(require("./shapes/Circle.js"));
var _Square = _interopRequireDefault(require("./shapes/Square.js"));
var _Triangle = _interopRequireDefault(require("./shapes/Triangle.js"));
var _DiamondSquare = _interopRequireDefault(require("./terrains/DiamondSquare.js"));
var _FaultLine = _interopRequireDefault(require("./terrains/FaultLine.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// Mazes

// Shapes

// import Hexagon from './shapes/Hexagon.js';

// Biomes
// TODO: Add biomes
// Forest, Swamp, Plains, Mountain, Island

// Terrains
// https://en.wikipedia.org/wiki/Diamond-square_algorithm

var labyrinthos = {};
labyrinthos.mazes = {};
labyrinthos.mazes.AldousBroder = _AldousBroder["default"];
labyrinthos.mazes.BinaryTree = _BinaryTree["default"];
labyrinthos.mazes.RecursiveBacktrack = _RecursiveBacktrack["default"];
labyrinthos.mazes.RecursiveDivision = _RecursiveDivision["default"];
labyrinthos.mazes.SpiralBacktrack = _SpiralBacktrack["default"];
labyrinthos.shapes = {};
labyrinthos.shapes.Circle = _Circle["default"];
labyrinthos.shapes.Square = _Square["default"];
// labyrinthos.shapes.Hexagon = Hexagon;
labyrinthos.shapes.Triangle = _Triangle["default"];
labyrinthos.terrains = {};
// labyrinthos.terrains.DiamondSquare = DiamondSquare;
labyrinthos.terrains.FaultLine = _FaultLine["default"];
labyrinthos.Tile = _Tile["default"];
labyrinthos.TileMap = _TileMap["default"];
var _default = exports["default"] = labyrinthos;

},{"./Tile.js":2,"./TileMap.js":3,"./mazes/AldousBroder.js":5,"./mazes/BinaryTree.js":6,"./mazes/RecursiveBacktrack.js":7,"./mazes/RecursiveDivision.js":8,"./mazes/SpiralBacktrack.js":9,"./shapes/Circle.js":10,"./shapes/Square.js":11,"./shapes/Triangle.js":12,"./terrains/DiamondSquare.js":13,"./terrains/FaultLine.js":14}],5:[function(require,module,exports){
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
      if (x > 0) neighbors.push([-2, 0]);
      if (y > 0) neighbors.push([0, -2]);
      if (neighbors.length > 0) {
        var _neighbors$Math$floor = _slicedToArray(neighbors[Math.floor(Math.random() * neighbors.length)], 2),
          dx = _neighbors$Math$floor[0],
          dy = _neighbors$Math$floor[1];
        tileMap.data[(y + dy) * tileMap.width + (x + dx)] = 0;
      }
    }
  }
}

},{}],7:[function(require,module,exports){
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

},{}],8:[function(require,module,exports){
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

},{}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = generateSpiralMap;
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function generateSpiralMap(tileMap, options) {
  var stack = [];
  var visited = Array.from({
    length: tileMap.height
  }, function () {
    return Array(tileMap.width).fill(false);
  });
  var directionOrder = ['right', 'down', 'left', 'up']; // Initial direction order for spiral movement

  var visitCell = function visitCell(x, y) {
    visited[y][x] = true;
    stack.push([x, y]);
    while (stack.length > 0) {
      var _stack = _slicedToArray(stack[stack.length - 1], 2),
        cx = _stack[0],
        cy = _stack[1];
      var neighbors = getSpiralNeighbors(cx, cy, directionOrder);
      if (neighbors.length > 0) {
        var _neighbors$ = _slicedToArray(neighbors[0], 2),
          nx = _neighbors$[0],
          ny = _neighbors$[1]; // Always select the first neighbor in the spiral direction
        removeWall(cx, cy, nx, ny);
        visited[ny][nx] = true;
        stack.push([nx, ny]);
      } else {
        stack.pop();
        directionOrder = rotateDirectionOrder(directionOrder); // Rotate direction order for the next cell
      }
    }
  };
  var getSpiralNeighbors = function getSpiralNeighbors(x, y, directionOrder) {
    var neighborDirections = {
      'right': [x + 1, y],
      'down': [x, y + 1],
      'left': [x - 1, y],
      'up': [x, y - 1]
    };
    return directionOrder.map(function (dir) {
      return neighborDirections[dir];
    }).filter(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
        nx = _ref2[0],
        ny = _ref2[1];
      return nx >= 0 && nx < tileMap.width && ny >= 0 && ny < tileMap.height && !visited[ny][nx];
    });
  };
  var rotateDirectionOrder = function rotateDirectionOrder(order) {
    // Rotate the direction order to change the spiral direction
    return order.concat(order.shift());
  };
  var removeWall = function removeWall(x, y, nx, ny) {
    var index1 = y * tileMap.width + x;
    var index2 = ny * tileMap.width + nx;
    tileMap.data[Math.min(index1, index2)] = 0;
  };

  // Start from a random cell
  // Start from a random cell using tileMap.random()
  var startX = Math.floor(tileMap.random(tileMap.width));
  var startY = Math.floor(tileMap.random(tileMap.height));
  visitCell(startX, startY);
  //  visitCell(Math.floor(Math.random() * tileMap.width), Math.floor(Math.random() * tileMap.height));
}

},{}],10:[function(require,module,exports){
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

},{}],11:[function(require,module,exports){
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

},{}],12:[function(require,module,exports){
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

},{}],13:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = generateDiamondSquareMap;
// TODO: WIP - wasn't quite working right

function generateDiamondSquareMap(tileMap, options) {
  // Adjust size for the algorithm
  var size = Math.max(tileMap.width, tileMap.height) - 1;
  var roughness = options.roughness || 0.5;
  var data = diamondSquare(size, roughness);

  // Flatten the 2D array into the tileMap.data single-dimensional array
  for (var x = 0; x < tileMap.width; x++) {
    for (var y = 0; y < tileMap.height; y++) {
      tileMap.data[y * tileMap.width + x] = data[y][x];
    }
  }
}
function diamondSquare(size, roughness) {
  var data = create2DArray(size + 1, size + 1);
  var max = size - 1;
  var h = roughness;

  // Initial corner values
  data[0][0] = data[0][max] = data[max][0] = data[max][max] = 0.5;
  for (var sideLength = max; sideLength >= 2; sideLength /= 2, h /= 2.0) {
    var halfSide = Math.round(sideLength / 2);

    // Square steps
    for (var x = 0; x < max; x += sideLength) {
      for (var y = 0; y < max; y += sideLength) {
        var avg = average([data[x][y], data[(x + sideLength) % (max + 1)][y], data[x][(y + sideLength) % (max + 1)], data[(x + sideLength) % (max + 1)][(y + sideLength) % (max + 1)]]);
        data[(x + halfSide) % (max + 1)][(y + halfSide) % (max + 1)] = avg + Math.random() * 2 * h - h;
      }
    }

    // Diamond steps
    // ... same as before ...
  }
  return data;
}
function average(values) {
  var valid = values.filter(function (val) {
    return val !== undefined;
  });
  var sum = valid.reduce(function (a, b) {
    return a + b;
  }, 0);
  return sum / valid.length;
}

// ... rest of your existing code ...

function create2DArray(width, height) {
  var arr = new Array(height);
  for (var i = 0; i < height; i++) {
    arr[i] = new Array(width).fill(0);
  }
  return arr;
}

},{}],14:[function(require,module,exports){
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

},{}],15:[function(require,module,exports){
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

},{}],16:[function(require,module,exports){
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

},{}],17:[function(require,module,exports){
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

},{"./MersenneTwister19937.js":15}]},{},[1])(1)
});
