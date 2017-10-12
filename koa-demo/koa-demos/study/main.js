const Koa =  require('koa') ;


const app = new Koa();
let main = ctx =>{
    console.log('main');
    ctx.response.body = 'hello world!';
}
const one = (ctx, next) => {
    console.log('>> one');
    next();
    console.log('<< one');
  }
  
  const two = (ctx, next) => {
    console.log('>> two');
    next(); 
    console.log('<< two');
  }
  
  const three = (ctx, next) => {
    console.log('>> three');
    next();
    console.log('<< three');
  }
  
  app.use(one);
  app.use(two);
  app.use(three);
 app.use(main);
app.listen(4000);
console.info('http://localhost:4000');
console.log('listening------'+(process.env.PORT||4000));