#零碎知识点


## 1严格模式的限制

严格模式主要有以下限制:
变量必须声明后再使用
函数的参数不能有同名属性，否则报错
不能使用with语句
不能对只读属性赋值，否则报错
不能使用前缀 0 表示八进制数，否则报错
不能删除不可删除的属性，否则报错
不能删除变量delete prop，会报错，只能删除属性delete global[prop]
eval不会在它的外层作用域引入变量
eval和arguments不能被重新赋值
arguments不会自动反映函数参数的变化
不能使用arguments.callee
不能使用arguments.caller
*禁止this指向全局对象*
不能使用fn.caller和fn.arguments获取函数调用的堆栈
增加了保留字（比如protected、static和interface）
>ES6 模块之中，顶层的this指向undefined，即不应该在顶层代码使用this。

## 关于变量提升

import命令具有提升效果，会提升到整个模块的头部，首先执行。
函数声明也有提升效果
var 定义的变量举报提升效果   let是块作用域声变量指令  不具备提升效果


```javascript
// 报错
/**
 * import 有提升效果,定义的变量为只读 所以当第二个import运行时候就报错了
 * 这里涵盖两个知识点,一个是变量提升效果
 * 一个是imprt定义的是只读的 当存在的时候就不能再次被改动了
*/
if (x === 1) {
  import { foo } from 'module1';
} else {
  import { foo } from 'module2';
}
```


## 变量提升
变量提升（hoist)

