const Router = require('koa-router');
const router = new Router();
const log4js = require('log4js');
const logger = log4js.getLogger('wechat');
const sha1 = require('sha1');
const accessTokenServic = require('../services/wechat.access.token.service');

const {
    account
} = require('../config/wechat.config');
class Wechat {
    constructor() {
        this.router = router;
        this.name = 'wechat';
        this.addRouter('get', '/', this.configure.bind(this));
        this.addRouter('post', '/', this.wxApis.bind(this));

    }
    addRouter(method, url, handler) {
        logger.info(method, url, this.name + url);
        this.router[method](url, handler);
    }
    /**
     * 微信配置
     * @param {object} cxt 
     */
    configure(cxt) {
        //先获取token
        try {
            //再进行验证
            var token = account.token;
            var signature = cxt.query.signature;
            var timestamp = cxt.query.timestamp;
            var nonce = cxt.query.nonce;
            var echostr = cxt.query.echostr;
            var str = [token, timestamp, nonce].sort().join('');
            var sha = sha1(str);
            if (sha === signature) {
                cxt.response.body = echostr + '';
            } else {
                cxt.response.body = 'wrong';
            }
        } catch (error) {
            logger.error(self.name, error.message);
        }

    }
    wxApis(ctx) {
        var token = account.token;
        var signature = ctx.query.signature;
        var timestamp = ctx.query.timestamp;
        var nonce = ctx.query.nonce;
        var str = [token, timestamp, nonce].sort().join('');
        var sha = sha1(str);
        if (sha !== signature) {
            ctx.response.body = 'wrong';
        }
        let buf = '';
        ctx.req.setEncoding('utf8');
        ctx.req.on('data', (chunk) => {
            buf += chunk;
        });
        ctx.req.on('end', () => {
            console.log(buf);
        });
        ctx.response.body = 'wrong';
    }
}

module.exports = new Wechat().router;