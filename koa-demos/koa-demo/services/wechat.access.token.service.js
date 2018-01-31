const config = require('../config/wechat.config');
const api = require('./wechat.api');
const request = require('request');
const Service = require('./_bas.service');
const accessTokenSchema = require('../model/schemas/access.tonken.schema');

class AccessTokenServic extends Service {
    constructor(name,schema) {
        super(name,schema);
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
        let self = this;
        var url = api.accessToken + '&appid=' + config.account.appID + '&secret=' + config.account.appSecret;
        return new Promise(function (resolve, reject) {
            try {
                request({
                    url: url,
                    json: true
                }, function (error, response) {
                    if(error){
                        reject(error);
                    }else{
                        let backData = {
                            access_token:response.body.access_token,
                            expires_in:Date.now()+response.body.expires_in-50
                        };
                        self.save(backData).then(function(){
                            resolve(response.body);
                        });
                    }
                });
            } catch (error) {
                throw new Error(error);
            }
            
        });
    }
    isValidAccessToken() {

    }

}

const accessTokenServic =new AccessTokenServic('AccessToken',accessTokenSchema);
module.exports = accessTokenServic;