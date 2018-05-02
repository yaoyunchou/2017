'use strict';

var _lib = require('./lib.3');

console.log(_lib.counter3);

(0, _lib.incCounter3)();

console.log(_lib.counter3);

//这里会出问题,重复赋值就会报错
//counter3 = {};