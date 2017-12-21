'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/*global process*/
var context = {};
var program = require('commander');
program.version('0.0.1').option('-d, --dburl', '').parse(process.argv);
context.dburl = program.args[0];
console.log(program.args[0]);
exports.default = context;