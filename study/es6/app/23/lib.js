"use strict";

//lib.js   
/**
 * ES6 模块与 CommonJS 模块的差异性
 * 
 * 
 */

var counter = 3;
function incCounter() {
  counter++;
}

module.exports = {
  counter: counter,
  incCounter: incCounter
};