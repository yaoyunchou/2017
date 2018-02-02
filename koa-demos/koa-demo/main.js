const Koa = require('koa');
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

//引入数据库
require('./model');
const Router = require('koa-router');

const upload = require('./utils/upload.files');
const staticServer = require('koa-static');
//加载表态文件
app.use(staticServer(__dirname + '/static'));
//用koabody 将post的结构解析出来
app.use(koaBody({
    multipart: true
}));
/**
 * TODO 这里是非常重要的一个地方，我自己在这里用了 async  但是却没有用  await next();
 *  导致我后面数据库里面查出来的出现了不能异步的情况
 * 
 */
app.use(upload);
//TODO 引入http的监控  是否后面可以自己弄一个类似的,信息可以再完整一点
app.use(koalog4js.koaLogger(koalog4js.getLogger('http'), { level: 'auto' }));

app.use(wxRouter.routes());
app.use(router.routes());

app.use(router.allowedMethods());
app.use(wxRouter.allowedMethods());
http.createServer(app.callback()).listen(8090);
https.createServer(app.callback()).listen(443);