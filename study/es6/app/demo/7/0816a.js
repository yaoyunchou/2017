'use strict';

/**
 *1. 函数参数的默认值
 *2. rest 参数
 *3.严格模式
 *4.name 属性
 *5.箭头函数
 *6.绑定 this
 *7.尾调用优化
 *8.函数参数的尾逗号
 *9.catch 语句的参数
 * 
 */

/**
 * 1
 * 这是一个很多大神常用的简便方法
 * @param {Object} x 
 * @param {any} y 
 * @returns 
 */
function log() {
  // if(x!==''){
  //     return x;
  // }
  var x = {
    name: 'yaoyunchou',
    gender: '男'
  };
  return x !== '' && x;
}
console.log(log()); //Object {name: "yaoyunchou", gender: "男"}


/**
 * 2
 * es6允许设置默认值，这个有点类似多态了
 * 除了简介，es6的写法还有两个好处：首先，阅读代码的人，可以立刻意识到哪些参数是可以省略的，不用查看
 * 函数体或者文档，其次，有利于将来的代码优化，即使未来的版本在对外接口中，彻底拿掉这个参数也不会
 * 导致以前的代码无法运行
 * 另外，一个容易忽略的地方是，参数默认值不是传值的，而是每次都重新计算默认值表达式的值。
 * 也就是说，参数默认值是惰性求值的。
 * @constructor
 * @param {Number} [x=0] 
 * @param {Number} [y=0] 
 */
function Point() {
  var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

  this.x = x;
  this.y = y;
}

var point = new Point(3, 10);
console.log(point); //Point {x: 3, y: 10}

/**
 * 和解构赋值一起用
 * 上面代码只使用了对象的解构赋值默认值，没有使用函数参数的默认值。只有当函数foo的参数是一个对象时，
 * 变量x和y才会通过解构赋值生成。如果函数foo调用时没提供参数，变量x和y就不会生成，从而报错。
 * 通过提供函数参数的默认值，就可以避免这种情况。
 * @param {Object<String,number>} {x,y=5} 这里定义数据类型
 */
function foo() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      x = _ref.x,
      _ref$y = _ref.y,
      y = _ref$y === undefined ? 5 : _ref$y;

  console.log(x, y);
}
foo(); //undefined 5
foo({ x: 100 }); //100 5

/**
 * 3
 * 
 * 
 * 
 * @param {any} params 
 */
var foo3 = 'outer';
function bar() {
  var func = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function (x) {
    return foo3;
  };

  var foo3 = 'inner';
  console.log(func());
}
bar(); //outer
/**
 * 4
 * 一个小的运用场景
 * 
 */
function throwIfMissing() {
  throw new Error('Missing parameter');
}

function foo4() {
  var mustBeProvided = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : throwIfMissing();

  return mustBeProvided;
}
//foo4()
console.log(foo4(3));

/**
 * 
 * 
 * @param {number} n 
 * @param {number} [total=0] 
 */
function factorial(n) {
  var total = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

  if (n === 1) {
    return total;
  }
  return factorial(n - 1, total * n);
}
console.log(factorial(5));