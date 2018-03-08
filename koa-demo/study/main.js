/**
 * 这个demo可以帮助我很好的理解koa的运行机制
 * a.关键点是中间件是“先进后出”这个就是堆栈的特点，所以多个中间件形成了一个堆栈结构！
 * b.1.最外层的中间件首先执行。
 *   2.调用next函数，把执行权交给下一个中间件。
 *   3....
 *   4.最内层的中间件最后执行。
 *   5.执行结束后，把执行权交回上一层的中间件。
 *   6. ...
 *   7.最外层的中间件收回执行权之后，执行next函数后面的代码
 * c.我们在不存在异步和i/o操作的时候理解原理，
 *   然后自然可以过度到把异步的代码转成同步的进行逻辑功能的开发！
 * 
 * d.在理解了这个就是个堆栈的时候我们很容易扩展到错误捕捉！
 */

const Koa = require('koa');


const app = new Koa();
const handler = async(ctx, next) => {
    try {
        await next();
    } catch (err) {
        ctx.response.status = err.statusCode || err.status || 500;
        ctx.response.body = {
            message: err.message
        };
    }
};

const main = ctx => {
    ctx.throw(500);
};

app.use(handler);
app.use(main);
app.listen(4000);
console.info('http://localhost:4000');
console.log('listening------' + (process.env.PORT || 4000));