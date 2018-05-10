'use strict';

var _lib = require('./lib.4');

var _lib2 = _interopRequireDefault(_lib);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log(_lib2.default); /**
                             * es6 简单类型也是用的引用
                             */

setTimeout(function () {
  console.log(_lib2.default);
}, 500);
//这里会出问题,重复赋值就会报错
//counter3 = {}