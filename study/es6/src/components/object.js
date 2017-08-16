/**
 * Created by yaoyc on 2017/2/22.
 */
(function(){
	"use strict";
	{
		var f = function f(x, y) {
			return {x, y};
		};

// 等同于
		
		var f2 = function f2(x, y) {
			return {x: x, y: y};
		};
		
		//f2(1, 2) // Object {x: 1, y: 2}
		console.log(f(1,2));
		console.log(f2(1,2));
	}
	{
		var ms = {};
		
		let getItem = function getItem (key) {
			return key in ms ? ms[key] : null;
		};
		
		let setItem = function setItem (key, value) {
			ms[key] = value;
		};
		
		let clear = function clear () {
			ms = {};
		};
		
		module.exports = { getItem, setItem, clear };
// 等同于
		module.exports = {
			getItem: getItem,
			setItem: setItem,
			clear: clear
		};
		
		
		
		var obj = {
			class () {}
		};

// 等同于
		
		var obj2 = {
			'class': function() {}
		};
		
		var obj3 = {
			* m(){
				yield 'hello world';
				yield 'hello yaoyunchou';
			}
		};
		console.log(...obj3.m());
	}
	{
		/**
		 * 克隆对象
		 * @param origin
		 * @returns {*}
		 */
		let Animal = function (name) {
			this.name = name;
		};
		Animal.prototype.speak = function(){
			console.log('my name is'+this.name);
		};
		let Cat = function(){
			Animal.apply(this,arguments);
		};
		Cat.prototype = Animal.prototype;
		Cat.prototype.constructor = Cat;
		let cat = new Cat('花猫');
		cat.speak();
		let clone = function clone(origin) {
			let originProto = Object.getPrototypeOf(origin);
			return Object.assign(Object.create(originProto), origin);
		};
	}
	{
		let {keys} = Object;
		let obj = { a: 1, b: 2, c: 3 };
		
		for (let key of keys(obj)) {
			console.log(key); // 'a', 'b', 'c'
		}
		
		// for (let [key, value] of entries(obj)) {
		// 	console.log([key, value]); // ['a', 1], ['b', 2], ['c', 3]
		// }
		console.log(...keys(obj));
		
		var oo = Object.create({ x: 1, y: 2 });
		oo.z = 3;
		
		let {x, d} = oo;
		console.log(x);
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
		
		class Collection {
			constructor() {
				this[size] = 0;
			}
			
			add(item) {
				this[this[size]] = item;
				this[size]++;
			}
			
			static sizeOf(instance) {
				return instance[size];
			}
		}
		
		var x = new Collection();
		Collection.sizeOf(x);// 0
		
		x.add('foo');
		x.add('aaa');
		Collection.sizeOf(x); // 1
		
		console.log(Object.keys(x)); // ['0']
		console.log(Object.getOwnPropertyNames(x)); // ['0']
		console.log(Object.getOwnPropertySymbols(x)); // [Symbol(size)]
	}
	{
		// mod.js
		const FOO_KEY = Symbol.for('foo');
		
		let A = function A() {
			this.foo = 'hello';
		};
		
		if (!global[FOO_KEY]) {
			global[FOO_KEY] = new A();
		}
		
		module.exports = global[FOO_KEY];
	}
})();