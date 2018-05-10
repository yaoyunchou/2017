/**
 * es6 简单类型也是用的引用
 */
import {counter3, incCounter3} from './lib.3'


console.log(counter3);//2

incCounter3();

console.log(counter3);//3

//这里会出问题,重复赋值就会报错
//counter3 = {}
