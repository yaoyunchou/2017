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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
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

		var array = new Array(9);
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
		var _this = this;

		var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

		return Array.from({
			length: 9
		}, function () {
			return _this.makeRow(v);
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
	shuffle: function shuffle(arr) {
		var endIndex = arr.length - 2;
		for (var i = 0; i <= endIndex; i++) {
			var j = i + parseInt(Math.random() * (arr.length - i));
			var _ref = [arr[j], arr[i]];
			arr[i] = _ref[0];
			arr[j] = _ref[1];
		}
		return arr;
	},
	checkFillable: function checkFillable(matrix, n, rowIndex, colIndex) {
		var row = matrix[rowIndex];
		var column = this.makeRow().map(function (value, key) {
			return matrix[key][colIndex];
		});
		var box = boxToolkit.getBoxCells(boxToolkit.convertBoxIndex(rowIndex, colIndex), matrix);
		// for(let i=0;i<9;i++){

		// }
		var checkFlog = true;
		for (var i = 0; i < 9; i++) {
			if (row[i] === n || column[i] === n || box[i] === n) {
				checkFlog = false;
			}
		}
		return checkFlog;
	}
};
/**
	 * 宫坐标系
	 */
var boxToolkit = {
	getBoxCells: function getBoxCells(boxIndex, matrix) {
		var startRowIndex = parseInt(boxIndex / 3) * 3;
		var startColIndex = boxIndex % 3 * 3;
		var result = [];
		for (var i = 0; i < 9; i++) {
			result.push(matrix[startRowIndex + parseInt(i / 3)][startColIndex + i % 3]);
		}
		return result;
	},
	convertBoxIndex: function convertBoxIndex(rowIndex, colIndex) {
		return parseInt(rowIndex / 3) * 3 + parseInt(colIndex / 3);
	},
	convertFromboxIndex: function convertFromboxIndex(boxIndex, cellIndex) {
		var colIndex = boxIndex % 3 * 3 + cellIndex % 3;
		var rowIndex = Math.floor(boxIndex / 3) * 3 + Math.floor(cellIndex / 3);
		return {
			rowIndex: rowIndex,
			colIndex: colIndex
		};
	}
};

module.exports = function () {
	function Toolkit() {
		_classCallCheck(this, Toolkit);
	}

	_createClass(Toolkit, null, [{
		key: "matrix",

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
		key: "box",
		get: function get() {
			return boxToolkit;
		}
	}]);

	return Toolkit;
}();

//测试
// console.log(boxToolkit.convertBoxIndex(5,3));
// var su = matrixToolkit.makeMatrix().map(rows=>rows.map((vlaue,key)=>key+1));
// var col =  matrixToolkit.makeRow().map((value,key)=>su[key][3]);
// console.log(col);
// console.log(su);
// console.log(4 in su);

// console.log(boxToolkit.getBoxCells(4,su));
console.log(boxToolkit.convertFromboxIndex(5, 4));

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//生成数独解决方案
var Toolkit = __webpack_require__(0);

var Generator = function () {
    function Generator() {
        _classCallCheck(this, Generator);
    }

    _createClass(Generator, [{
        key: "generator",
        value: function generator() {
            while (!this.innerGenerator()) {
                console.log("tru agin");
            }
        }
    }, {
        key: "innerGenerator",
        value: function innerGenerator() {
            this.matrix = Toolkit.matrix.makeMatrix();
            //获取一个随机列表
            this.orders = Toolkit.matrix.makeMatrix().map(function (row) {
                return row.map(function (vlue, key) {
                    return key;
                });
            }).map(function (row) {
                return Toolkit.matrix.shuffle(row);
            });
            // while (condition) {

            // }
            for (var n = 1; n <= 9; n++) {
                if (!this.fillNumber(n)) {
                    return false;
                }
            }
            return true;
        }
    }, {
        key: "fillNumber",
        value: function fillNumber(n) {
            return this.fillRow(n, 0);
        }
    }, {
        key: "fillRow",
        value: function fillRow(n, rowIndex) {
            if (rowIndex > 8) {
                return true;
            }
            var row = this.matrix[rowIndex];
            var order = this.orders[rowIndex];
            for (var i = 0; i < 9; i++) {
                var colIndex = order[i];
                //如果这个位置已经有值则跳过
                if (row[colIndex]) {
                    continue;
                }
                //检查这个位置是否可以填n  ,我们在工具中加一个检查方法
                if (!Toolkit.matrix.checkFillable(this.matrix, n, rowIndex, colIndex)) {
                    continue;
                }
                row[colIndex] = n;
                //当前行填写n成功  递归调用fillRow  l来进行下一行的填写；、
                if (!this.fillRow(n, rowIndex + 1)) {
                    row[colIndex] = 0;
                    continue;
                }
                return true;
            }
            return false;
        }
    }]);

    return Generator;
}();

var generator = new Generator();
generator.generator();
module.exports = generator.matrix;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var oolkit = __webpack_require__(0);
var Grid = __webpack_require__(3);

var PopupNumber = __webpack_require__(6);
var grid = new Grid($('#container'));
grid.build();
var popup = new PopupNumber($("#popupNumbers"));

grid.bindPopup(popup);
grid.getOrientation();
var a = 100;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Toolkit = __webpack_require__(0);
var Sudoku = __webpack_require__(4);
var Checker = __webpack_require__(5);

var Grid = function () {
	function Grid(container) {
		var _this = this;

		_classCallCheck(this, Grid);

		this._$container = container;
		this._onlyUI = false;
		$(document).on('click', '.rebuild', this.build.bind(this));
		$(document).on('click', '.checker', this.checker.bind(this));
		$(document).on('click', '.clear', function () {
			_this._$container.find('span').removeClass('err mark1 mark2');
		});
		$(document).on('click', '.reset', function () {
			_this._$container.find('span').not('.fixed').text('0').removeClass('err mark1 mark2').addClass('empty');
		});
	}

	_createClass(Grid, [{
		key: 'build',
		value: function build() {
			var spanSize = $('body').width() * 0.1 + 'px';
			var spanFontSize = $('body').width() * 0.1 * 0.5 + 'px';
			if (!this._onlyUI) {
				var sudoku = new Sudoku();
				sudoku.make();
				this._solutionMatrix = sudoku.solutionMatrix;
			}

			var $cells = this._solutionMatrix.map(function (rowValues) {
				return rowValues.map(function (cellValue) {
					if (cellValue) {
						return $('<span>').css({
							width: spanSize,
							height: spanSize,
							lineHeight: spanSize,
							fontSize: spanFontSize
						}).addClass('fixed').text(cellValue);
					} else {
						return $('<span>').css({
							width: spanSize,
							height: spanSize,
							lineHeight: spanSize,
							fontSize: spanFontSize
						}).addClass('empty').text(cellValue);
					}
				});
			});
			console.log($cells);
			var $divArray = $cells.map(function ($spanArray) {
				return $("<div>").append($spanArray);
			});
			this._$container.empty();
			this._$container.append($divArray);
			this._onlyUI = false;
		}
	}, {
		key: 'bindPopup',
		value: function bindPopup(popupNumber) {
			this._$container.on('click', 'span', function (e) {
				var $cell = $(e.target);
				if ($cell.hasClass('fixed')) {
					return;
				}
				popupNumber.popup($cell);
			});
		}
	}, {
		key: 'checker',
		value: function checker() {
			var domArr = [];
			var $rows = this._$container.find('div');
			this._$container.find('div').find('span').removeClass('err');
			$rows.map(function (index, div) {
				console.log($(div).find('span').map(function (index, cell) {
					return parseInt($(cell).text());
				}).toArray());
				domArr.push($(div).find('span').map(function (index, cell) {
					return parseInt($(cell).text());
				}).toArray());
			});
			var checker = new Checker(domArr);
			checker.check();
			if (checker._isSuccess) {
				alert('恭喜过关！');
			} else {
				console.log(checker._matrixMakes);
				for (var row = 0; row < 9; row++) {
					for (var col = 0; col < 9; col++) {
						if (!checker._matrixMakes[row][col]) {
							$rows.eq(row).find('span').eq(col).not('.fixed').addClass('err');
						}
					}
				}
			}
		}
	}, {
		key: 'getOrientation',
		value: function getOrientation() {
			var that = this;
			$(window).bind('resize', function () {
				that._onlyUI = true;
				that.build();
			});
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
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//生成数独游戏
var matrix = __webpack_require__(1);

//1.生成解决方案：Generator 


//2随机去除部分的数据，按比例

module.exports = function () {
    function Sudoku() {
        _classCallCheck(this, Sudoku);

        this.solutionMatrix = matrix;
    }

    _createClass(Sudoku, [{
        key: "make",
        value: function make() {
            var level = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 5;

            //生成迷盘
            this.solutionMatrix = this.solutionMatrix.map(function (row) {
                return row.map(function (cell) {
                    return Math.random() * 9 < level ? 0 : cell;
                });
            });
        }
    }]);

    return Sudoku;
}();

// const sudoku = new Sudoku();
// sudoku.make();

// console.log(sudoku.solutionMatrix);

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//检查数独的方案
var Toolkit = __webpack_require__(0);
var matrix = __webpack_require__(1);

function checkArray(array) {
    var length = array.length;
    var marks = new Array(length);
    marks.fill(true);
    for (var i = 0; i < 9; i++) {
        if (!marks[i]) {
            continue;
        }
        var v = array[i];
        //是否有效 0无效， 1-9有效
        if (!v) {
            marks[i] = false;
        }
        //是否重复
        for (var j = i + 1; j < 9; j++) {
            if (array[i] === array[j]) {
                marks[i] = false;
                marks[j] = false;
            }
        }
    }
    return marks;
}
/**
 * 输入 matrix 用户完成9*9的数独数据
 * 处理：对matrix 行列 宫进行检查  并填入makes
 * 输出：检查是否成功 makes
 */
module.exports = function () {
    function Checker(matrix) {
        _classCallCheck(this, Checker);

        this._matrix = matrix;
        this._matrixMakes = Toolkit.matrix.makeMatrix(true);
    }

    _createClass(Checker, [{
        key: "check",
        value: function check() {
            this.checkRows();
            this.checkCols();
            this.checkBoxes();

            this._isSuccess = this._matrixMakes.every(function (row) {
                return row.every(function (mark) {
                    return mark;
                });
            });
            return this._isSuccess;
        }
    }, {
        key: "checkRows",
        value: function checkRows() {
            for (var i = 0; i < 9; i++) {
                this._matrixMakes[i] = checkArray(this._matrix[i]).map(function (v) {
                    return v;
                });
            }
        }
    }, {
        key: "checkCols",
        value: function checkCols() {
            var _this = this;

            var _loop = function _loop(i) {
                var colArr = [];
                for (var j = 0; j < 9; j++) {
                    colArr.push(_this._matrix[j][i]);
                }
                checkArray(colArr).forEach(function (value, key) {
                    this._matrixMakes[key][i] = value;
                }, _this);;
            };

            for (var i = 0; i < 9; i++) {
                _loop(i);
            }
        }
    }, {
        key: "checkBoxes",
        value: function checkBoxes() {
            var _this2 = this;

            var _loop2 = function _loop2(boxIndex) {
                var boxArr = Toolkit.box.getBoxCells(boxIndex, _this2._matrix);
                checkArray(boxArr).forEach(function (value, key) {
                    var _Toolkit$box$convertF = Toolkit.box.convertFromboxIndex(boxIndex, key),
                        rowIndex = _Toolkit$box$convertF.rowIndex,
                        colIndex = _Toolkit$box$convertF.colIndex;

                    if (!value) {
                        this._matrixMakes[rowIndex][colIndex] = false;
                    }
                }, _this2);
            };

            for (var boxIndex = 0; boxIndex < 9; boxIndex++) {
                _loop2(boxIndex);
            }
        }
    }, {
        key: "matrixMakes",
        get: function get() {
            return this._matrixMakes;
        }
    }, {
        key: "isSuccess",
        get: function get() {
            return this._isSuccess;
        }
    }]);

    return Checker;
}();

// var checker = new Checker(matrix);
// checker.check();

// console.log(checker._matrixMakes);
// matrix[0][5] = matrix[5][4] =4;
// matrix[0][0] = 0;
// var checker2 = new Checker(matrix);
// checker2.check();
// console.log(checker2._matrix);
// console.log(checker2._matrixMakes);

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//用于弹框


module.exports = function () {
    function PopupNumbers($panel) {
        var _this = this;

        _classCallCheck(this, PopupNumbers);

        this._$panel = $panel;
        this._$panel.hide();
        this._$panel.on('click', 'span', function (e) {
            var $span = $(e.target);
            _this._$panel.hide();
            if ($span.hasClass('mark1')) {
                if (_this._targetCell.hasClass('mark1')) {
                    _this._targetCell.removeClass('mark1 mark2 err');
                } else _this._targetCell.removeClass('err').addClass('mark1');
                return;
            }
            if ($span.hasClass('mark2')) {
                if (_this._targetCell.hasClass('mark2')) {
                    _this._targetCell.removeClass('mark1 mark2');
                } else _this._targetCell.removeClass('err').addClass('mark2');
                return;
            }
            if ($span.hasClass('empty')) {
                _this._targetCell.removeClass('mark1 mark2 err').addClass('empty').text("0");
                return;
            }
            _this._targetCell.removeClass("empty err").text($span.text());
        });
    }

    _createClass(PopupNumbers, [{
        key: 'popup',
        value: function popup($cell) {
            this._targetCell = $cell;

            var _$cell$position = $cell.position(),
                left = _$cell$position.left,
                top = _$cell$position.top;

            var width = $cell.width();
            var height = $cell.height();
            if ($('body').width() - left - width > 121) {
                left = left + width;
            } else {
                left = left - 121;
            }
            if (top > 300) {
                top = top - 161;
            }
            this._$panel.show();
            this._$panel.css({
                left: left, top: top
            });
        }
    }]);

    return PopupNumbers;
}();

/***/ })
/******/ ]);
//# sourceMappingURL=indexdb1eab4a00c28e8fa328.js.map