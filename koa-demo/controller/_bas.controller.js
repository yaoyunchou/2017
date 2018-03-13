/**
 * controller
 */
const Router = require('koa-router');
const router = new Router();
const log4js = require('log4js');

/**
 * 
 */
class BasController {
    constructor(name, service) {
        this.service = service;
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

    handlerwarp(handler, isAsync = true) {
        handler.bind(this);
        let backData;
        try {
            if (isAsync) {
                return async (ctx) => {
                    let backData = await handler.apply(this, arguments);
                    if(backData.isSuccess){
                        this.reply(ctx, backData);
                    }else{
                        this.reply(ctx, backData);
                    }
                    
                };
            } else {
                backData = handler.apply(this, arguments);
                return (ctx) => {
                    this.reply(ctx, backData);
                };
            }

        } catch (error) {
            this.logger.error(this.name, error.message);
            return (ctx) => {
                this.reply(ctx, {
                    msg: error,
                    isSuccess: false
                });
            };
        }
    }
    reply(ctx, body, type = 'json') {

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
    getItem() {
        //console.log(this);
        return this.service.getItem('sdfs');
    }
    /**
     * 获取列表
     */
    getList(options) {
        return this.service.getList(options);
    }

}
module.exports = BasController;