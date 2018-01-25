
/**
 * 1.根据传入的router对象，动态在上面传入配置信息
 * 2.在这里我们主要是实现路由可以根据每个模块自己配置
 * 
 */
const Router = require('koa-router');
var router = new Router({
    prefix: '/api'
});

const user = require('./user.controller');

router.use('/user',user.routes(),user.allowedMethods());

module.exports =  router;