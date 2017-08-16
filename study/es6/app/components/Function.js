'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * Created by yaoyc on 2017/2/21.
 */
(function () {
	"use strict";
	/**+
  * @param x
  * @param y
  * @constructor
  */

	function Point() {
		var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
		var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

		this.x = x;
		this.y = y;
	}

	var p = new Point();
	console.info(p.x, p.y);

	var x = 99;

	/**
  * 如果参数默认值是变量，那么参数就不是传值的，而是每次都重新计算默认值表达式的值。也就是说，参数默认值是惰性求值的。
  * @param p
  */
	function foo() {
		var p = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : x + 1;

		console.log(p);
	}

	foo(); // 100
	function foo2(_ref) {
		var x = _ref.x,
		    _ref$y = _ref.y,
		    y = _ref$y === undefined ? 5 : _ref$y;

		console.log(x, y);
	}

	foo2({}); // undefined, 5
	foo2({ x: 1 }); // 1, 5
	foo2({ x: 1, y: 2 }); // 1, 2

	// 写法一
	function m1() {
		var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
		    _ref2$x = _ref2.x,
		    x = _ref2$x === undefined ? 0 : _ref2$x,
		    _ref2$y = _ref2.y,
		    y = _ref2$y === undefined ? 0 : _ref2$y;

		return [x, y];
	}

	// 写法二
	function m2() {
		var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { x: 0, y: 0 },
		    x = _ref3.x,
		    y = _ref3.y;

		return [x, y];
	}

	console.log(m1(), m2());
	{
		var x3 = 1;
		var foo3 = function foo3(x3) {
			var x3 = 3;

			function y() {
				x3 = 2;
				console.log(x3);
			}

			function x() {
				var x3 = 3;
				y();

				console.log(x3);
			}

			x();
		};

		foo3(); // 3
		console.log(x3);
	}
	{
		var throwIfMissing = function throwIfMissing() {
			console.log('Missing parameter');
			return;
		};

		var foo5 = function foo5() {
			var mustBeProvided = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : throwIfMissing();

			console.log(mustBeProvided);
		};

		foo5(undefined);
	}
	{
		/**
   * ES6 引入 rest 参数（形式为“...变量名”），用于获取函数的多余参数，这样就不需要使用arguments对象了。
   * rest 参数搭配的变量是一个数组，该变量将多余的参数放入数组中。
   * 扩展运算符（spread）是三个点（...）。它好比 rest 参数的逆运算，将一个数组
   * 特别注意rest参数是一个数组
   * @param array
   * @param items
   */
		var push = function push(array) {
			for (var _len = arguments.length, items = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
				items[_key - 1] = arguments[_key];
			}

			array.push.apply(array, items);
			return array;
		};
		console.log(push([], 1, 2, 3, 4));

		var add = function add(x, y) {
			console.log(x + y);
			return x + y;
		};

		var numbers = [4, 38];
		add.apply(undefined, numbers); // 42
	}
	{
		var x6 = 1;

		var f6 = function f6(x6) {
			var y6 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : x6;

			console.log(y6);
		};
		console.log(x6);
		f6(2); // 2
	}
	{
		var arr1 = ['a', 'b'];
		var arr2 = ['c'];
		var arr3 = ['d', 'e'];
		// ES5的合并数组
		arr1 = arr1.concat(arr2, arr3);
		// [ 'a', 'b', 'c', 'd', 'e' ]
		console.log(arr1);

		var arr21 = ['a', 'b'];
		var arr22 = ['c'];
		var arr23 = ['d', 'e'];
		// ES6的合并数组
		var arr24 = [].concat(arr21, arr22, arr23);
		console.log(arr24);
	}
	{
		var go = regeneratorRuntime.mark(function go() {
			return regeneratorRuntime.wrap(function go$(_context) {
				while (1) {
					switch (_context.prev = _context.next) {
						case 0:
							_context.next = 2;
							return 1;

						case 2:
							_context.next = 4;
							return 2;

						case 4:
							_context.next = 6;
							return 3;

						case 6:
						case 'end':
							return _context.stop();
					}
				}
			}, go, this);
		});
		//console.log([go().next().value,go()]);
		var item = go();
		console.log(item.next(), item.next(), item.next());
		console.log([].concat(_toConsumableArray(go()))); // [1, 2, 3]
		var _iteratorNormalCompletion = true;
		var _didIteratorError = false;
		var _iteratorError = undefined;

		try {
			for (var _iterator = go()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
				var _item = _step.value;

				console.log(_item);
			}
		} catch (err) {
			_didIteratorError = true;
			_iteratorError = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion && _iterator.return) {
					_iterator.return();
				}
			} finally {
				if (_didIteratorError) {
					throw _iteratorError;
				}
			}
		}
	}
	{
		/**
   * 箭头函数有几个使用注意点。
   *（1）函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象。
   *（2）不可以当作构造函数，也就是说，不可以使用new命令，否则会抛出一个错误。
   * （3）不可以使用arguments对象，该对象在函数体内不存在。如果要用，可以用Rest参数代替。
   * （4）不可以使用yield命令，因此箭头函数不能用作Generator函数。
   * 上面四点中，第一点尤其值得注意。this对象的指向是可变的，但是在箭头函数中，它是固定的。
   */
		/**
   *由于大括号被解释为代码块，所以如果箭头函数直接返回一个对象，必须在对象外面加上括号。
   * @param num1
   * @param num2
   * @returns {*}
   */
		var sum = function sum(num1, num2) {
			return { value: num1 + num2 };
		};
		console.log(sum(1, 20));
		// 正常函数写法
		var _arr = [1, 2, 3].map(function (x) {
			return x * x;
		});
		console.log(_arr);
		// 箭头函数写法
		var _arr2 = [1, 2, 3].map(function (x) {
			return x * x;
		});
		console.log(_arr2);

		var _foo = function foo() {
			var _this = this;

			console.log(this.id);
			setTimeout(function () {
				console.log('id:', _this.id);
			}, 100);
		};

		var id = 21;

		_foo.call({ id: 42 });
		// id: 42

		/**
   * Timer函数内部设置了两个定时器，分别使用了箭头函数和普通函数。
   * 前者的this绑定定义时所在的作用域（即Timer函数），后者的this指向运行时所在的作用域（即全局对象）。
   * 所以，3100毫秒之后，timer.s1被更新了3次，而timer.s2一次都没更新。
   * @constructor
   */
		var Timer = function Timer() {
			var _this2 = this;

			this.s1 = 0;
			this.s2 = 0;
			// 箭头函数
			setInterval(function () {
				return _this2.s1++;
			}, 1000);
			// 普通函数
			setInterval(function () {
				this.s2++;
			}, 1000);
		};

		var timer = new Timer();

		setTimeout(function () {
			return console.log('s1: ', timer.s1);
		}, 3100);
		setTimeout(function () {
			return console.log('s2: ', timer.s2);
		}, 3100);
		// s1: 3
		// s2: 0
		/**
   *
   * @type {{id: string, init: (()=>*), doSomething: handler.doSomething}}
   */
		var handler = {
			id: '123456',

			init: function init() {
				var _this3 = this;

				var ftodo = function ftodo() {
					return _this3.doSomething('222');
				};
				ftodo();
			},

			doSomething: function doSomething(type) {
				console.log('Handling ' + type + ' for ' + this.id);
			}
		};
		handler.init();
		handler.doSomething('1111');

		/**
   * 请问下面的代码之中有几个this？
   * 只有一个this，就是函数foo的this，所以t1、t2、t3都输出同样的结果。
   * 因为所有的内层函数都是箭头函数，都没有自己的this，它们的this其实都是最外层foo函数的this。
   * @returns {function()}
   */
		var foo7 = function foo7() {
			var _this4 = this;

			return function () {
				return function () {
					return function () {
						console.log('id:', _this4.id);
					};
				};
			};
		};

		var f = foo7.call({ id: 1 });

		f.call({ id: 2 })()(); // id: 1
		f().call({ id: 3 })(); // id: 1
		f()().call({ id: 4 }); // id: 1

	}
	{
		/**
   * 箭头函数内部，还可以再使用箭头函数。下面是一个ES5语法的多重嵌套函数。
   * @param value
   * @returns {{into: into}}
   */
		var insert = function insert(value) {
			return {
				into: function into(array) {
					return {
						after: function after(afterValue) {
							array.splice(array.indexOf(afterValue) + 1, 0, value);
							return array;
						}
					};
				}
			};
		};

		insert(2).into([1, 3]).after(1); //[1, 2, 3]

		var insert2 = function insert2(value) {
			return {
				into: function into(array) {
					return {
						after: function after(afterValue) {
							array.splice(array.indexOf(afterValue) + 1, 0, value);
							return array;
						}
					};
				}
			};
		};

		insert2(2).into([1, 3]).after(1); //[1, 2, 3]
	}
	{
		/**
   *
   */

		// 例二
		var jake = { find: { name: 'aaa' }, html: function html() {
				return { value: 'dfksdflsd' };
			} };
		var find = jake.find,
		    html = jake.html;

		console.log({ 'find': find });
		console.log({ HTML: html });
		//::find("p");
		//::html("hahaha");
	}
	{
		/**
   *
   * @param n
   * @param total
   * @returns {*}
   */
		var currying = function currying(fn, n) {
			return function (m) {
				return fn.call(this, m, n);
			};
		};

		var tailFactorial = function tailFactorial(n, total) {
			if (n === 1) {
				return total;
			}
			return tailFactorial(n - 1, n * total);
		};

		var factorial = currying(tailFactorial, 1);

		console.log(factorial(5)); // 120

		var factorial2 = function factorial2(n) {
			var total = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

			if (n === 1) {
				return total;
			}
			return factorial(n - 1, n * total);
		};

		console.log(factorial2(5)); // 120
	}
	{
		var tco = function tco(f) {
			var value;
			var active = false;
			var accumulated = [];

			return function accumulator() {
				accumulated.push(arguments);
				if (!active) {
					active = true;
					while (accumulated.length) {
						value = f.apply(this, accumulated.shift());
					}
					active = false;
					return value;
				}
			};
		};

		var sum2 = tco(function (x, y) {
			if (y > 0) {
				return sum2(x + 1, y - 1);
			} else {
				return x;
			}
		});

		sum2(1, 100000);
	}
})();