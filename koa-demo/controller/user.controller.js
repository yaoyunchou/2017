const BasController = require('./_bas.controller');
const userService = require('../services/user.service');

class UserController extends BasController {
    constructor(name, service) {
        super(name, service);
        this.addRouter('get', '/list', this.handlerwarp(this.getUsers));
        this.addRouter('get', '/user/:id', this.handlerwarp(this.getItem));
        this.addRouter('post', '/user', this.handlerwarp(this.createItem));
        
    }

    createUsers() {
        return {
            name: 'yao',
            gender: 'f',
            age: 18
        };

    }
    getUsers(options) {
        return this.service.getList(options);
    }
    deletUser() {

    }
    changeUser() {

    }

}

module.exports = new UserController('user', userService).router;