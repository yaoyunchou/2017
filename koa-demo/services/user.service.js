/**
 * 用于
 */
const config = require('../config/wechat.config');
const api = require('./wechat.api');
const request = require('request');
const Service = require('./_bas.service');
const userSchema = require('../model/schemas/user.schema');

class User extends Service {
    constructor(name, schema) {
        super(name, schema);
    }

}

const user = new User('User', userSchema);
module.exports = user;