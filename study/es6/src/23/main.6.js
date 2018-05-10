/**
 * commonjs 如何循环加载
 */
exports.done = false;
var a = require('./lib.6.js');
console.log('在 b.js 之中，a.done = ', a.done);
exports.done = true;
console.log('b.js 执行完毕');
