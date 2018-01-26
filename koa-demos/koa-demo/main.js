const os = require('os');
const path = require('path');
const Koa = require('koa');
const fs = require('fs');
const koaBody = require('koa-body');
const http = require('http');
const https = require('https');
const koalog4js = require('koa-log4');
//统一日志,配置日志
const {log4js,logger} = require('./logger');

const app = new Koa();
//引入api
const router = require('./controller');
//监控微信的返回,这里微信是直接返回根目录的'/'的所以单独引入
const wxRouter = require('./controller/wx.controller');




const main = async function (ctx, next) {
    this.req = ctx.req, this.res = ctx.res;
    log4js.connectLogger(log4js.getLogger('access'), {
        level: log4js.levels.INFO
    }).call(this, this.req, this.res, next);
    if (ctx.request.path === '/api/form') {
        //const tmpdir = os.tmpdir();
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

//用koabody 将post的结构解析出来
app.use(koaBody({
    multipart: true
}));
//TODO 引入http的监控  是否后面可以自己弄一个类似的,信息可以再完整一点
app.use(koalog4js.koaLogger(koalog4js.getLogger('http'), { level: 'auto' }));
//app.use(main);
app.use(wxRouter.routes());
app.use(router.routes());
app.use(wxRouter.allowedMethods());
app.use(router.allowedMethods());
http.createServer(app.callback()).listen(8090);
https.createServer(app.callback()).listen(8080);