const Router = require('koa-router');
const router = new Router();
const log4js = require('log4js');
const logger = log4js.getLogger('wechat');
const sha1 = require('sha1');
const request = require('request');
const {
    menu
} = require('../services/wechat.api');
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
        this.addRouter('get', '/accessToken', this.getAccessToken);
        this.addRouter('get', '/menu', this.updateMenu);

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
        /**
         * 这里也比较重要,了解这个对象里面的结构就能像手术刀一样的去实现功能.
         * a.后面也要了解buff是怎么实现的.手动如何可以进行解析
         */
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
    async getAccessToken(ctx, next) {
        //ctx.response.body = 'wrong';
        //ctx.response.status = 200;
        ctx.response.type = 'html';
        let start = Date.now();
        let data = await accessTokenServic.getAccessToken();
        ctx.response.body = data;
    }
    async updateMenu(ctx) {
        let accessToken = await accessTokenServic.getAccessToken();
        let url = await menu + 'access_token=' + accessToken.access_token;
        let menuData = {
            'button': [{
                
                'type':'view',
                'name':'搜索',
                'url':'http://www.soso.com/'
                 
            },{
                
                'type':'view',
                'name':'搜索',
                'url':'http://www.soso.com/'
                 
            }
            ]
        };
        ctx.response.body = await request({
            url: url,
            method: 'POST',
            json: true,
            headers: {
                'content-type': 'application/json',
            },
            body: menuData
        }, function (err, httpResponse, body) {
            console.log('err' + err);
            console.log('httpResponse' + httpResponse.toS);
            console.log('body' + body);
            
        });
    }
}

module.exports = new Wechat().router;