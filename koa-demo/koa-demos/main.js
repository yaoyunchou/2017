const os = require('os');
const path = require('path');
const Koa = require('koa');
const fs = require('fs');
const koaBody = require('koa-body');
const http = require('http');
const https = require('https');
const Router = require('koa-router');
 
const app = new Koa();
const router = new Router();



const main = async function(ctx,next) {
  if(ctx.request.path==='/api/form'){
    next()
  }else{
    const tmpdir = os.tmpdir();
    const filePaths = [];
    const files = ctx.request.body.files || {};
  
    for (let key in files) {
      const file = files[key];
      const filePath = path.join(__dirname, file.name);
      const reader = fs.createReadStream(file.path);
      const writer = fs.createWriteStream(filePath);
      reader.pipe(writer);
      filePaths.push(filePath);
    }
  
    ctx.response.body  = 'hello world!';
  }

};

router.post('/api/form',(ctx,next)=>{
  var body = ctx.request.body;
  ctx.response.redirect('http://www.baidu.com');
  console.log(body);
});

app.use(koaBody({ multipart: true }));
app.use(main);
app.use(router.routes());
app.use(router.allowedMethods());
http.createServer(app.callback()).listen(8090);
https.createServer(app.callback()).listen(8080);