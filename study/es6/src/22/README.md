# module的语法



由于 ES6 模块是编译时加载，使得静态分析成为可能。有了它，就能进一步拓宽 JavaScript 的语法，比如引入宏（macro）和类型检验（type system）这些只能靠静态分析实现的功能。

除了静态加载带来的各种好处，ES6 模块还有以下好处。

不再需要UMD模块格式了，将来服务器和浏览器都会支持 ES6 模块格式。目前，通过各种工具库，其实已经做到了这一点。
将来浏览器的新 API 就能用模块格式提供，不再必须做成全局变量或者navigator对象的属性。
不再需要对象作为命名空间（比如Math对象），未来这些功能可以通过模块提供。


通过 Babel 转码，CommonJS 模块的require命令和 ES6 模块的import命令，可以写在同一个模块里面，但是最好不要这样做。因为import在静态解析阶段执行，所以它是一个模块之中最早执行的。下面的代码可能不会得到预期结果。
```javascript
require('core-js/modules/es6.symbol');
require('core-js/modules/es6.promise');
import React from 'React';
```