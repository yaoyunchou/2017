/**
 * es6 简单类型也是用的引用
 */
import {foo} from './lib.4'
console.log(foo);//yao
setTimeout(() => {
    console.log(foo); //yun
}, 500);
