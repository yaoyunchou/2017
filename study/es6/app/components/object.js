'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * Created by yaoyc on 2017/2/22.
 */
(function () {
	"use strict";

	{
		var f = function f(x, y) {
			return { x: x, y: y };
		};

		// 等同于

		var f2 = function f2(x, y) {
			return { x: x, y: y };
		};

		//f2(1, 2) // Object {x: 1, y: 2}
		console.log(f(1, 2));
		console.log(f2(1, 2));
	}
	{
		var _console;

		var ms = {};

		var getItem = function getItem(key) {
			return key in ms ? ms[key] : null;
		};

		var setItem = function setItem(key, value) {
			ms[key] = value;
		};

		var clear = function clear() {
			ms = {};
		};

		module.exports = { getItem: getItem, setItem: setItem, clear: clear };
		// 等同于
		module.exports = {
			getItem: getItem,
			setItem: setItem,
			clear: clear
		};

		var obj = {
			class: function _class() {}
		};

		// 等同于

		var obj2 = {
			'class': function _class() {}
		};

		var obj3 = {
			m: regeneratorRuntime.mark(function m() {
				return regeneratorRuntime.wrap(function m$(_context) {
					while (1) {
						switch (_context.prev = _context.next) {
							case 0:
								_context.next = 2;
								return 'hello world';

							case 2:
								_context.next = 4;
								return 'hello yaoyunchou';

							case 4:
							case 'end':
								return _context.stop();
						}
					}
				}, m, this);
			})
		};
		(_console = console).log.apply(_console, _toConsumableArray(obj3.m()));
	}
	{
		/**
   * 克隆对象
   * @param origin
   * @returns {*}
   */
		var Animal = function Animal(name) {
			this.name = name;
		};
		Animal.prototype.speak = function () {
			console.log('my name is' + this.name);
		};
		var Cat = function Cat() {
			Animal.apply(this, arguments);
		};
		Cat.prototype = Animal.prototype;
		Cat.prototype.constructor = Cat;
		var cat = new Cat('花猫');
		cat.speak();
		var clone = function clone(origin) {
			var originProto = Object.getPrototypeOf(origin);
			return Object.assign(Object.create(originProto), origin);
		};
	}
	{
		var _console2;

		var keys = Object.keys;

		var _obj = { a: 1, b: 2, c: 3 };

		var _iteratorNormalCompletion = true;
		var _didIteratorError = false;
		var _iteratorError = undefined;

		try {
			for (var _iterator = keys(_obj)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
				var key = _step.value;

				console.log(key); // 'a', 'b', 'c'
			}

			// for (let [key, value] of entries(obj)) {
			// 	console.log([key, value]); // ['a', 1], ['b', 2], ['c', 3]
			// }
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

		(_console2 = console).log.apply(_console2, _toConsumableArray(keys(_obj)));

		var oo = Object.create({ x: 1, y: 2 });
		oo.z = 3;

		var _x = oo.x,
		    d = oo.d;

		console.log(_x);
		//console.log(d.y);
		console.log(oo);
	}
	{
		var s1 = Symbol('foo');
		var s2 = Symbol('bar');

		console.log(s1); // Symbol(foo)
		console.log(s2); // Symbol(bar)

		console.log(s1.toString()); // "Symbol(foo)"
		console.log(s2.toString()); // "Symbol(bar)"
	}
	{
		var size = Symbol('size');

		var Collection = function () {
			function Collection() {
				_classCallCheck(this, Collection);

				this[size] = 0;
			}

			_createClass(Collection, [{
				key: 'add',
				value: function add(item) {
					this[this[size]] = item;
					this[size]++;
				}
			}], [{
				key: 'sizeOf',
				value: function sizeOf(instance) {
					return instance[size];
				}
			}]);

			return Collection;
		}();

		var x = new Collection();
		Collection.sizeOf(x); // 0

		x.add('foo');
		x.add('aaa');
		Collection.sizeOf(x); // 1

		console.log(Object.keys(x)); // ['0']
		console.log(Object.getOwnPropertyNames(x)); // ['0']
		console.log(Object.getOwnPropertySymbols(x)); // [Symbol(size)]
	}
	{
		// mod.js
		var FOO_KEY = Symbol.for('foo');

		var A = function A() {
			this.foo = 'hello';
		};

		if (!global[FOO_KEY]) {
			global[FOO_KEY] = new A();
		}

		module.exports = global[FOO_KEY];
	}
})();