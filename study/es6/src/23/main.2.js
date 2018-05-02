import {counter3,incCounter3} from './lib.3'


console.log(counter3);

incCounter3();

console.log(counter3);

//这里会出问题,重复赋值就会报错
//counter3 = {};