/**
 * 用于
 */
const config = require('../config/wechat.config');
const api = require('./wechat.api');
const request = require('request');
const Service = require('./_bas.service');
const accessTokenSchema = require('../model/schemas/access.tonken.schema');

class AccessTokenServic extends Service {
    constructor(name, schema) {
        super(name, schema);
        this.fetchAccessToken();
    }
    /**
     * 获取数据库的access token
     */
    getAccessToken() {
        return new Promise((resolve, reject) => {
            this.DbModal.findOne({userId: '5a70213e534d9d24f8821694'})
                .select('access_token expires_in')
                .exec(function (err, accessToken) {
                    if (err || !accessToken) {
                        reject(err);
                    } else {
                        resolve(accessToken);
                    }
                });
        });

    }
    getAll() {
        return this.getList();
    }
    fetchAccessToken() {
        let self = this;
        self.getAccessToken().then(function (data) {
            if (data.expires_in < Date.now()) {
                self.saveAccessToken();
            } else {
                return data;
            }
        }, function () {
            self.saveAccessToken();
        });
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
                    if (error) {
                        reject(error);
                    } else {
                        let backData = {
                            access_token: response.body.access_token,
                            expires_in: Date.now() + (response.body.expires_in - 50) * 100,
                            userId: '5a70213e534d9d24f8821694'
                        };
                        self.save(backData).then(function () {
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

const accessTokenServic = new AccessTokenServic('AccessToken', accessTokenSchema);
module.exports = accessTokenServic;