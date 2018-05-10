'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
// lib.4.js
var foo = exports.foo = 'yao';

setTimeout(function () {
  return exports.foo = foo = 'yun';
}, 500);