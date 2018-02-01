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
    async getAccessToken() {
        return  await this.DbModal.findOne({userId: '5a72f3a6910cf322ec71681a'})
            .select('access_token expires_in');
    }
    getAll() {
        return this.getList();
    }
    async fetchAccessToken() {
        let self = this;
        let data = await self.getAccessToken();
        if (data&&data.expires_in < Date.now()||!data) {
            self.saveAccessToken();
        } else {
            return data;
        }
    }
    saveAccessToken() {
        let self = this;
        var url = api.accessToken + '&appid=' + config.account.appID + '&secret=' + config.account.appSecret;
        try {
            request({
                url: url,
                json: true
            }, function (error, response) {
                if (error) {
                    throw new Error(error);
                } else {
                    let backData = {
                        access_token: response.body.access_token,
                        expires_in: Date.now() + (response.body.expires_in - 50) * 100,
                        userId: '5a72f3a6910cf322ec71681a'
                    };
                    self.save(backData).then(function (err) {
                        if (err) {
                            throw new Error(err);
                        } else {
                            return backData;
                        }
                    });
                }
            });
        } catch (error) {
            throw new Error(error);
        }
    }
    isValidAccessToken() {

    }

}

const accessTokenServic = new AccessTokenServic('AccessToken', accessTokenSchema);
module.exports = accessTokenServic;