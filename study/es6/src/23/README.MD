


## 1```<script>```标签的defer或async属性

 ```<script>```标签打开defer或async属性，脚本就会异步加载。渲染引擎遇到这一行命令，就会开始下载外部脚本，但不会等它下载和执行，而是直接执行后面的命令。defer与async的区别是：defer要等到整个页面在内存中正常渲染结束（DOM 结构完全生成，以及其他脚本执行完成），才会执行；async一旦下载完，渲染引擎就会中断渲染，执行这个脚本以后，再继续渲染。一句话，defer是“渲染完再执行”，async是“下载完就执行”

## 2 ES6 模块与 CommonJS 模块的差异


讨论 Node 加载 ES6 模块之前，必须了解 ES6 模块与 CommonJS 模块完全不同。

它们有两个重大差异。

*CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用。*

CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。

```javascript

// lib.js
var counter = 3;
function incCounter() {
  counter++;
}
module.exports = {
  counter: counter,
  incCounter: incCounter,
};
//上面代码输出内部变量counter和改写这个变量的内部方法incCounter。然后，在main.js里面加载这个模块。

// main.js
var mod = require('./lib');

console.log(mod.counter);  // 3
mod.incCounter();
console.log(mod.counter); // 3
```

如果需要这个counter也随之改变那么,这里写一个get就会在console.log(mod.counter)的时候调用get方法.这时候就能拿到counter当前值了
```javascript
// lib.js
var counter = 3;
function incCounter() {
  counter++;
}
module.exports = {
  get counter() {
    return counter
  },
  incCounter: incCounter,
};
```

> JS 引擎对脚本静态分析的时候，遇到模块加载命令import，就会生成一个只读引用。ES6 的import有点像 Unix 系统的“符号连接”，原始值变了，import加载的值也会跟着变。因此，ES6 模块是动态引用，并且不会缓存值，模块里面的变量绑定其所在的模块。






## ES6 模块是动态引用  

我们在用import接受时候如果有export default 可以直接去接收,其他的要用对象接收

ES6
```javascript
// lib.4.mjs

/**
 * Node 要求 ES6 模块采用.mjs后缀文件名。也就是说，
 * 只要脚本文件里面使用import或者export命令，那么就必须采用.mjs后缀名。
 * require命令不能加载.mjs文件，会报错，只有import命令才可以加载.mjs文件。
 * 反过来，.mjs文件里面也不能使用require命令，必须使用import。
 */
export let foo = 'yao';

setTimeout(()=>foo = 'yun', 500);

//main.4.js

/**
 * es6 简单类型也是用的引用
 */
import {foo} from './lib.4'
console.log(foo);//yao
setTimeout(() => {
    console.log(foo); //yun
}, 500);


```

我用在使用引入的时候通常会有简写,比如  我们要加载当前目录下的config.js,
我们的写法有  import './config.js',有时候我们会写成 import './config',之所以可以这样写是因为node会依次尝试四个后缀名:
config.mjs  、config.js、config.json、config.node.如果这些脚本文件都不存在，Node 就会去加载./foo/package.json的main字段指定的脚本。如果./foo/package.json不存在或者没有main字段，那么就会依次加载./foo/index.mjs、./foo/index.js、./foo/index.json、./foo/index.node。如果以上四个文件还是都不存在，就会抛出错误。


## ES6加载commonJs模块

es6 会自动把module.exports 属性当做模块的默认输出 等同于export default xxx

```javascript
// main.5.js
/**
 * es6 简单类型也是用的引用
 */
module.exports = {
    a:()=>{
        console.log('!!!')
    },
    b:100
}


//等同于
export default {
    a:()=>{
        console.log('!!!')
    },
    b:100

}

/**
 * 这里一共有三种写法可以拿到main.5.js里面的内容
 * 
 * 
*/
// 写法一
import baz from './a';
// baz = {foo: 'hello', bar: 'world'};

// 写法二
import {default as baz} from './a';
// baz = {foo: 'hello', bar: 'world'};

// 写法三
import * as baz from './a';
```

## es6 和 commonjs 原理

**CommonJS 的一个模块，就是一个脚本文件。require命令第一次加载该脚本，就会执行整个脚本，然后在内存生成一个对象。**

**ES6 模块是动态引用，如果使用import从一个模块加载变量（即import foo from 'foo'），那些变量不会被缓存，而是成为一个指向被加载模块的引用，需要开发者自己保证，真正取值的时候能够取到值。**

“循环加载”（circular dependency）指的是，a脚本的执行依赖b脚本，而b脚本的执行又依赖a脚本。

// a.js
var b = require('b');

// b.js
var a = require('a');

**通常，“循环加载”表示存在强耦合**

### commonjs的案例

这个案例的运行流程如最下面的注释
```javascript
  //lib.6.js
  exports.done = false;
  var b = require('./main.6.js');
  console.log('在 lib.6.js 之中，b.done = ', b.done);
  exports.done = true;
  console.log('lib.6.js 执行完毕');

  //main.6.js
  exports.done = false;
  var a = require('./lib.6.js');
  console.log('在 main.6.js 之中，a.done = ', a.done);
  exports.done = true;
  console.log('main.6.js 执行完毕');


 /**
  * 运行lib.6.js输出结果为
  * 在 lib.6.js 之中，b.done =  false
  * lib.6.js:5
  * lib.6.js 执行完毕
  * lib.6.js:7
  * 在 main.6.js 之中，a.done =  true
  * main.6.js:8
  * main.6.js 执行完毕
  * */

```

### ES6 引入

个人觉得下面这段代码会是一个经典错误,我们在运行代码的时候会发现他的顺序是这样的
运行a.mjs  发现引入b.mjs这时候开始先运行b.mjs当运行到b.mjs第一行的时候,它发现有a.mjs(我们是从a.mjs进去的) 就开始走下面的代码,当运行到b.mjs第三行的时候
才发现a.mjs虽然有了但是foo是没有定义的,就会报错出去
```javascript
// a.mjs
import {bar} from './b';
console.log('a.mjs');
console.log(bar);
export let foo = 'foo';

// b.mjs
import {foo} from './a';
console.log('b.mjs');
console.log(foo);
export let bar = 'bar';
```