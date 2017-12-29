const os = require('os');
const path = require('path');
const Koa = require('koa');
const fs = require('fs');
const koaBody = require('koa-body');
const http = require('http');
const https = require('https');
const Router = require('koa-router');
const {log4js, logger} = require('./logger');
const {addRouter} = require('./controller/');

const app = new Koa();
const router = new Router();



const main = async function (ctx, next) {
  this.req = ctx.req, this.res = ctx.res;
  log4js.connectLogger(log4js.getLogger('access'), {
    level: log4js.levels.INFO
  }).call(this, this.req, this.res,next);
  if (ctx.request.path === '/api/form') {
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

    ctx.response.body = 'hello world!';
  } else {
    next();
  }

};

// router.post('/api/form',(ctx,next)=>{
//   var body = ctx.request.body;
//   ctx.response.redirect('http://www.baidu.com');
//   console.log(body);
// });

logger.trace('Entering cheese testing');
logger.debug('Got cheese.');
logger.info('Cheese is Gouda.');
logger.warn('Cheese is quite smelly.');
logger.error('Cheese is too ripe!');
logger.fatal('Cheese was breeding ground for listeria.');
app.use(koaBody({
  multipart: true
}));
app.use(main);
app.use(router.routes());
app.use(router.allowedMethods());
http.createServer(app.callback()).listen(8090);
https.createServer(app.callback()).listen(8080);