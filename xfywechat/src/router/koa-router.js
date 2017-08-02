
/**
 * Created by yao on 2017/6/13.
 */
var koaRouter = new require("koa-router")({
    prefix:'/api'
});
koaRouter.add = function(Controller){
    if(typeof Controller === 'function'){
        new Controller();
    }
};

export  default koaRouter