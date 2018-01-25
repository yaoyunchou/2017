const os = require('os');
const path = require('path');
const Koa = require('koa');
const fs = require('fs');
const koaBody = require('koa-body');
const http = require('http');
const https = require('https');

const {
    log4js,
    logger
} = require('./logger');

const app = new Koa();
const router = require('./controller');

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


app.use(koaBody({
    multipart: true
}));
//app.use(main);
app.use(router.routes());
app.use(router.allowedMethods());
http.createServer(app.callback()).listen(8090);
https.createServer(app.callback()).listen(8080);