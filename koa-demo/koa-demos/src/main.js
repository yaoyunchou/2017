const Koa = require('koa');
const koaRouter = require("koa-route");
const app = new Koa();

const one = function(cxt,next){
    console.log('>>>>>one');
    next();
    console.log('<<<<one');
    console.log(cxt);
};
const main = function(cxt,next){
    console.log(cxt.req);
    cxt.response.type = "json",
    cxt.response.body = { name:'yaoyunchou',age:27,gender:'男'};
}

app.use(one);
app.use(koaRouter.post('/test',main));
app.listen(5000);
console.log(app)
console.log(process)
console.log("listening-------"+5000);