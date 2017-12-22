const Koa = require('koa');
const router = require('koa-router')();
const app = new Koa();
var fs = require('fs');
const one = function(cxt,next){
    console.log('>>>>>one');
    next();
    console.log('<<<<one');
    console.log(cxt);
};
const main = function(cxt,next){
    console.log(cxt.req);
    console.log(ctx.request.body);
    // => POST body
    ctx.body = JSON.stringify(ctx.request.body);
    cxt.response.type = "json",
    cxt.response.body = { name:'yaoyunchou',age:27,gender:'男'};
}

app.use(one);

const koaBody = require('koa-body');
 
router.post('/users', koaBody(),
  (ctx) => {
    console.log(ctx.request.body);
    // => POST body
    ctx.body = JSON.stringify(ctx.request.body);
  }
);
 

app.use(router.routes());
app.listen(8090);
console.log(app)
console.log(process)
console.log("listening-------"+8090);