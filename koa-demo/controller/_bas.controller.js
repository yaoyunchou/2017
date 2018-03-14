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
    /**
     * 
     * @param {Fun} handler 
     * @param {String} msg 
     * @param {Boolean} isAsync 
     */
    handlerwarp(handler, msg, isAsync = true) {
        handler.bind(this);
        let backData;
        try {
            if (isAsync) {
                return async (ctx) => {
                    let backData = await handler.call(this, ctx);
                   
                    if (backData.isSuccess) {
                        backData.msg = msg || '获取数据成功!';
                        this.reply(ctx, backData);
                    } else {
                        this.reply(ctx, {
                            isSuccess: false,
                            msg: backData.msg||'接口出错了!'
                        });
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
                }, 'html', 500);
            };
        }
    }
    reply(ctx, body, type = 'json', status = 200) {

        body = body || {
            data: '',
            msg: '',
            isSuccess: true
        };
        ctx.response.status = status;
        ctx.response.type = type;
        ctx.response.body = body;
    }
    /**
     * 默认的常用方法crud
     */
    createItem(options) {
        const data = options.request.body;
        return this.service.save(data);
    }
    /**
     * 默认的常用方法crud
     */
    getItem(options) {
        return this.service.getItem(options.params.id, {
            nikeName: 1,
            phone: 1
        });
    }
    /**
     * 获取列表
     */
    getList(options) {
        return this.service.getList(options);
    }

}
module.exports = BasController;