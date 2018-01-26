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
        //默认几个方法
    }
    addRouter(method, url, handler) {
        try {
            router[method](url, handler);
            this.logger.info(this.name,'api/'+this.name+url);
        } catch (error) {
            this.logger.error(this.name,error.message);
        }

    }
    handlerwarp(handler) {
        handler.bind(this);
        
        return (ctx, next) => {
            let backData;
            try {
                backData = handler.apply(this, arguments);
            } catch (error) {
                this.logger.error(self.name, error.message);
            }

            ctx.response.body = backData;
            next();
        };

    }
    

}
module.exports = BasController;