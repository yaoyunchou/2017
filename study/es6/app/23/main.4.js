'use strict';

var _lib = require('./lib.4');

console.log(_lib.foo); //yao
/**
 * es6 简单类型也是用的引用
 */
setTimeout(function () {
  console.log(_lib.foo); //yun
}, 500);