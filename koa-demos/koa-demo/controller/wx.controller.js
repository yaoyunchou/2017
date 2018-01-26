const Router = require('koa-router');
const router = new Router();
const log4js = require('log4js');
const logger = log4js.getLogger('user');
class Wechat {
    constructor() {
        this.name = 'wechat';
        this.addRouter('url', '/', this.wechat.bind(this));
        this.router = router;
    }
    addRouter(method, url, handler) {
        logger.info(url, this.name + url);
        router[method](url, handler);
    }
    wechat(cxt, next) {
        const self = this;
        try {
            cxt.response.body = {
                name: 'yao',
                gender: 'f',
                age: 18
            };
            next();
        } catch (error) {
            logger.error(self.name, error.message);
        }

    }
}

module.exports = new Wechat().router;