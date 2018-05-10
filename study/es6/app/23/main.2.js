'use strict';

var _lib = require('./lib.3');

console.log(_lib.counter3); //2

/**
 * es6 简单类型也是用的引用
 */
(0, _lib.incCounter3)();

console.log(_lib.counter3); //3

//这里会出问题,重复赋值就会报错
//counter3 = {}