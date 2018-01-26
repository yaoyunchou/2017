const BasController = require('./_bas.controller');
class UserController extends BasController {
    constructor(name) {
        super(name);
        this.addRouter('get', '/list', this.handlerwarp(this.getUsers));
    }

    getUsers() {
        return {
            name: 'yao',
            gender: 'f',
            age: 18
        };

    }
}

module.exports = new UserController('user').router;