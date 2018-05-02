/**
 *这两个例子充分说明Commomjs的医用是一个值的拷贝 
 * 
 * 
 * 
 * 
 */
var mod = require('./lib')

console.log(mod.counter)// 3

mod.incCounter();

console.log( mod.counter)//3 



var mod2 = require('./lib.2')

console.log(mod2.counter2);//4

mod2.incCounter2();

console.log(mod2.counter2);//5