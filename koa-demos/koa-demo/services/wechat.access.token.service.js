const config = require('../config/wechat.config');
const api = require('./wechat.api');
const request = require('request');

class AccessToken {
    constructor() {
        this.saveAccessToken();
        this.fetchAccessToken();
    }
    /**
     * 获取数据库的access token
     */
    getAccessToken() {

    }
    fetchAccessToken() {

    }
    saveAccessToken() {
        var url = api.accessToken + '&appid=' + config.account.appID + '&secret=' + config.account.appSecret;
        return new Promise(function (resolve, reject) {
            request({
                url: url,
                json: true
            }, function (error, response) {
                if(error){
                    reject(error);
                }else{
                    resolve(response);
                }
            });
        });
    }
    isValidAccessToken() {

    }

}

module.exports = new AccessToken();