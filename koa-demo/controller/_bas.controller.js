/**
 * controller的李
 */
const Router = require('koa-router');
const router = new Router();
const log4js = require('log4js');

/**
 * 
 */
class BasController {
    constructor(name) {
        this.name = name;
        this.router = router;
        this.logger = log4js.getLogger(this.name);
        //默认几个方法crud
        

    }
    addRouter(method, url, handler) {
        try {
            this.router[method](url, handler);
            this.logger.info(method, this.name, 'api/' + this.name + url);
        } catch (error) {
            this.logger.error(this.name, error.message);
        }

    }
    handlerwarp(handler) {
        handler.bind(this);

        return (ctx) => {
            let backData;
            try {
                backData = handler.apply(this, arguments);
            } catch (error) {
                this.logger.error(self.name, error.message);
            }
            this.reply(ctx,backData);
        };

    }
    reply(ctx, body,type = 'josn') {
        body = body || {
            data: '',
            msg: '',
            isSuccess: true
        };
        ctx.response.type = type;
        ctx.response.body = body;
    }
    /**
     * 默认的常用方法crud
     */
    getItem(options){
        
    }


}
module.exports = BasController;