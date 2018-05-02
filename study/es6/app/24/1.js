/**
 * 关于var 命令的变量提升
 * 
 * let 没有副作用,变量只会在其声明的代码块内有效
 */

'use strict';
/**
 * 这里的undefind是由于var y = 'hello'实际的运行方式是
 * 在进入代码的时候就运行了var y; 这时候y是undefind
 * 到if里面的时候运行 y = 'hello'
 */

console.log(y); //undefind
if (true) {

  var y = 'hello';
  console.log(y); //hello
}

console.log(y); //hello


//情况一在let定义的上面调用的时候
//console.log(x);//error  x is not defined
if (true) {
  console.log(_x); //这里依旧是 x is not defined  不会是undefind
  var _x = 'world'; //
  console.log(_x);
}
console.log(x); //x is not defined