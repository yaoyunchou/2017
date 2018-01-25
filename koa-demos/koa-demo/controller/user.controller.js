const Router = require('koa-router');
const router = new Router();


class User {
    constructor() {
        this.addRouter('get','/list',this.getUsers);
        this.router = router;
    }
    addRouter(method, url, handler) {
        router[method](url, handler);
    }
    getUsers(cxt, next) {
        cxt.response.body = {
            name: 'yao',
            gender: 'f',
            age: 18
        };
        next();

    }


}

module.exports =  new User().router;