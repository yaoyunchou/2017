/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var matrixToolkit = {
	/**
  * 
  * 生成行
  * @param {number} [v=0] 
  * @returns 
  */
	makeRow: function makeRow() {
		var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
		var lenght = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 9;

		var array = new Array(lenght);
		array.fill(v);
		return array;
	},


	/**
  * 类数组利用Array的方法进行map映射，
  * from的第二个参数是一个map
  * 
  * @param {number} [v=0] 
  * @returns 
  */
	makeMatrix: function makeMatrix() {
		var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

		var _this = this;

		var rows = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 9;
		var cols = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 9;

		return Array.from({
			length: rows
		}, function () {
			return _this.makeRow(v, cols);
		});
	},

	/**
  * 自己如何实现，看下发挥
  * fill() 方法用于将一个固定值替换数组的元素。
  * 所以在这里makeRow只运行一次，fill把makeRow返回的值当成一个固定值了。
  * 但是这里是保存的指向地址，所以当makeRow第二个值变的时候整体就变了！
  * 所以我们
  * a要么让makeRow运行多次。
  * b,要么每次在填入二维数组的时候拷贝一份makeRow的数据，生成新的数组实例
  * @param {number} [v=0] 
  */
	makeMatrix2: function makeMatrix2() {
		var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

		var arr2 = Array.from({
			length: 9
		}, function () {
			return this.makeRow();
		});
		//arr2.fill(makeRow(v));
		return arr2;
	},

	/**
  * Fisher-Yates 洗牌算法
  * 
  * @param {any} arr 
  */
	coordinate: function coordinate(x, y) {
		x = Math.floor(Math.random() * x);
		y = Math.floor(Math.random() * y);
		return { x: x, y: y };
	},
	isEqual: function isEqual(arr, obj) {
		var result = false;
		for (var i = 0; i < arr.lenght; i++) {
			result = arr[i].x === obj.x && arr[i].y === obj.y;
		}
		return result;
	}
};
/**
	 * 宫坐标系
	 */
var boxToolkit = {
	getBoxNum: function getBoxNum(rowIndex, columnIndex, matrix) {
		var resultArr = [];
		for (var i = 0; i < 3; i++) {
			for (var j = 0; j < 3; j++) {
				if (rowIndex + i - 1 >= 0 && rowIndex + i - 1 < matrix.length && columnIndex + j - 1 >= 0 && columnIndex + j - 1 < matrix[0].length && matrix[rowIndex + i - 1][columnIndex + j - 1].text() === 'false') {
					resultArr.push(matrix[rowIndex + i - 1][columnIndex + j - 1]);
				}
			}
		}
		matrix[rowIndex][columnIndex].text(resultArr.length || 0).css('textIndex', '0em');
		return resultArr.length || 0;
	},
	run: function run(rowIndex, columnIndex, matrix) {
		if (!this.getBoxNum.apply(this, arguments)) {
			for (var i = 0; i < 3; i++) {
				for (var j = 0; j < 3; j++) {
					if (rowIndex + i - 1 >= 0 && rowIndex + i - 1 < matrix.length >= 0 && columnIndex + j - 1 && columnIndex + j - 1 < matrix[0].length && !(i === 1 && j === 1)) {
						this.run(rowIndex + i - 1, columnIndex + j - 1, matrix);
					}
				}
			}
		}
	}
};

module.exports = function () {
	function Toolkit() {
		_classCallCheck(this, Toolkit);
	}

	_createClass(Toolkit, null, [{
		key: 'matrix',

		/**
   * 矩阵相关工具
   */
		get: function get() {
			return matrixToolkit;
		}
		/**
   * 宫坐标工具
   */

	}, {
		key: 'box',
		get: function get() {
			return boxToolkit;
		}
	}]);

	return Toolkit;
}();

// console.log(matrixToolkit.makeMatrix(0,16,9))

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Grid = __webpack_require__(2);
new Grid($('.container')).build();

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Toolkit = __webpack_require__(0);
var Generator = __webpack_require__(3);

var Grid = function () {
	function Grid(container) {
		var _this = this;

		_classCallCheck(this, Grid);

		this._$container = container;
		this._onlyUI = false;
		this._$container.on('click', 'button', function (e) {
			var $cell = $(e.target);
			console.log($cell.data('rowIndex') + '===' + $cell.data('columnIndex'));
			Toolkit.box.run($cell.data('rowIndex'), $cell.data('columnIndex'), _this._$cells);
		});
		// $(document).on('click', '.rebuild', this.build.bind(this));
		// $(document).on('click', '.checker', this.checker.bind(this));
		// $(document).on('click', '.clear', () => {this._$container.find('span').removeClass('err mark1 mark2')});
		// $(document).on('click', '.reset', () => {this._$container.find('span').not('.fixed').text('0').removeClass('err mark1 mark2').addClass('empty')});        
	}

	_createClass(Grid, [{
		key: 'build',
		value: function build() {
			var rows = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 9;
			var cols = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 9;

			var spanSize = $('body').width() * 0.1 + 'px';
			var spanFontSize = $('body').width() * 0.1 * 0.5 + 'px';
			var generator = new Generator(rows, cols);
			generator.makeMatrix();
			this._solutionMatrix = generator.matrix;
			this._$cells = this._solutionMatrix.map(function (rowValues, rowIndex) {
				return rowValues.map(function (cellValue, columnIndex) {
					return $('<button data-row-index="' + rowIndex + '" data-column-index="' + columnIndex + '">').css({
						width: spanSize,
						height: spanSize,
						lineHeight: spanSize,
						fontSize: spanFontSize
					}).addClass('btn btn-primary').text(cellValue);
				});
			});

			var $divArray = this._$cells.map(function ($spanArray) {
				return $("<div>").append($spanArray);
			});
			this._$container.empty();
			this._$container.append($divArray);
			this._onlyUI = false;
		}
	}]);

	return Grid;
}();

// const a = Array.from({length:9},(v,k)=>k+1);
// console.log(a);
// console.log(toolkit.shuffle(a));
// var b = toolkit.shuffle(a).sort();
// console.log(b);
// console.log(b.join(''));


//new Grid($('#container')).build();

module.exports = Grid;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//生成数独解决方案
var Toolkit = __webpack_require__(0);

var Generator = function () {
	function Generator() {
		var rows = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 9;
		var cols = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 9;

		_classCallCheck(this, Generator);

		this._rows = rows;
		this._cols = cols;
	}
	//构建数组


	_createClass(Generator, [{
		key: "makeMatrix",
		value: function makeMatrix() {
			var matrix = Toolkit.matrix.makeMatrix().map(function (rows, index) {
				return rows.map(function (col) {
					return true;
				});
			});
			var bombs = this.bombs();
			bombs.forEach(function (v, k) {
				matrix[v.x][v.y] = false;
			});
			this.matrix = matrix;
		}
	}, {
		key: "bombs",
		value: function bombs() {
			var bombs = [];
			switch (this._cols) {
				case 16:
					for (var i = 0; i < 40;) {
						var coordinate = Toolkit.matrix.coordinate(16, 16);
						if (Toolkit.matrix.isEqual(bombs, coordinate)) {
							continue;
						} else {
							bombs.push(coordinate);
						}
						i++;
					}
					break;
				case 30:
					for (var _i = 0; _i < 99;) {
						var _coordinate = Toolkit.matrix.coordinate(16, 30);
						if (Toolkit.matrix.isEqual(bombs, _coordinate)) {
							continue;
						} else {
							bombs.push(_coordinate);
						}
						_i++;
					}
					break;

				default:
					for (var _i2 = 0; _i2 < 10;) {
						var _coordinate2 = Toolkit.matrix.coordinate(9, 9);
						if (Toolkit.matrix.isEqual(bombs, _coordinate2)) {
							continue;
						} else {
							bombs.push(_coordinate2);
						}
						_i2++;
					}
					break;
			}
			return bombs;
		}
	}]);

	return Generator;
}();
// const generator = new Generator();
// generator.generator();


module.exports = Generator;

/***/ })
/******/ ]);
//# sourceMappingURL=index.0a1b7a916ece009bebf2.js.map