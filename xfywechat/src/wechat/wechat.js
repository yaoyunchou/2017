/**
 * Created by yao on 2016/11/2.
 */
"use strict";
var Promise = require('bluebird');
var util = require('./util');
var request = Promise.promisify(require('request'));
var _ = require('lodash');
var fs = require('fs');
var api = require('./api');

function Wechat(opts) {
    var that = this;
    this.appID = opts.appID;
    this.appSecret = opts.appSecret;
    this.getAccessToken = opts.getAccessToken;
    this.saveAccessToken = opts.saveAccessToken;

    this.fetchAccessToken();
}
Wechat.prototype.fetchAccessToken = function () {
    var that = this;
    if (this.access_token && this.expires_in) {
        if (this.isValidAccessToken(this)) {
            return Promise.resolve(this);
        }
    }
    this.getAccessToken().then(function (data) {
        try {
            data.JSON.parse(data);
        }
        catch (e) {
            return that.updateAccessToken();
        }
        if (this.isValidAccessToken(data)) {
            return Promise.resolve(data);
        } else {
            return that.updateAccessToken();
        }
    }).then(function (data) {
        that.access_token = data.access_token;
        that.expires_in = data.expires_in;
        that.saveAccessToken(data);
        return  Promise.resolve(data);
    });
};
Wechat.prototype.isValidAccessToken = function (data) {
    if (!data || !data.access_token || !data.expires_in) {
        return false;
    }
    //var access_token = data.access_token;
    var expires_in = data.expires_in;
    var now = new Date().getTime();
    if (now < expires_in) {
        return true;
    } else {
        return false;
    }
};
Wechat.prototype.updateAccessToken = function () {
    var appID = this.appID;
    var appSecret = this.appSecret;
    var url = api.accessToken + '&appid=' + appID + '&secret=' + appSecret;

    return new Promise(function (resolve, reject) {
        request({url: url, json: true}).then(function (response) {
            var data = response[1];
            var now = new Date().getTime();
            var expires_in = now + (data.expires_in - 20) * 1000;

            data.expires_in = expires_in;
            resolve(data);
        });
    });

};
Wechat.prototype.uploadMaterial = function (type, material,permanent) {
    /*1.上传的接口分为临时和永久上传
    * 2.永久素材分为图片的,图文的,和其他的部分
    * 3.图片和其他的都是需要路径的,所以这里的material是路径在图文的时候变成数组的数据
    * */
    var that = this;
    var form = {};
    var uploadUrl = api.material.temporary.upload;
    //处理上传逻辑
    if(permanent){
        uploadUrl = api.material.permanent.upload;
        _.extend(form,permanent);
    }
    if(type ==='newsImg'){
        uploadUrl = api.material.permanent.uploadImage;
    }
    if(type === 'news'){
        uploadUrl = api.material.permanent.uploadNews;
        form = material;
    }else{
        form.media = fs.createReadStream(material);
    }
    return new Promise(function (resolve,reject) {
        that.fetchAccessToken().then(function (data) {

            var url = uploadUrl + 'access_token=' + data.access_token ;
            if(permanent){
                form.access_token = data.access_token;
            }else{
                url+= '&type=' + type;
            }
            var options = {
                method: 'POST',
                url: url,
                json: true
            };
            if(type === 'news'){
                options.body = form;
            }else{
                options.formData = form;
            }
            request(options).then(function (res) {
                var _data = res[1];
                if (_data) {
                    resolve(_data);
                } else {
                    throw new Error('Upload material fails');
                }
            }).catch(function (err) {
               reject(err);
            });
        });
    });
};
Wechat.prototype.loadMaterial = function loadMaterial(permanent) {
    var that = this;
    var form = {
        type:'image',
        offset:0,
        count:10
    };
    if(permanent){
        _.extend(form,permanent);
    }
    var uploadUrl = api.material.list;

    return new Promise(function (resolve,reject) {
        that.fetchAccessToken().then(function (data) {

            var url = uploadUrl + 'access_token=' + data.access_token ;
            url = url.replace(/https:/,'http:');
            var options = {
                method: 'POST',
                url:url,
                body:form,
                json: true
            };
            request(options).then(function (res) {
                var _data = res[1];
                if (_data) {
                    resolve(_data);
                } else {
                    throw new Error('load material fails');
                }
            }).catch(function (err) {
                reject(err);
            });
        });
    });
};

Wechat.prototype.getMaterialCount = function getMaterialCount() {
    var that = this;


    var uploadUrl = api.material.count;

    return new Promise(function (resolve,reject) {
        that.fetchAccessToken().then(function (data) {

            var url = uploadUrl + 'access_token=' + data.access_token ;
            //url = url.replace('https://','http://')
            var options = {
                method: 'get',
                url:url,
                json: false
            };
            request(options).then(function (res) {
                var _data = res[1];
                if (_data) {
                    resolve(_data);
                } else {
                    throw new Error('load material count fails');
                }
            }).catch(function (err) {
                reject(err);
            });
        });
    });
};
Wechat.prototype.reply = function () {
    var content = this.body;
    var message = this.weixin;
    this.status = 200;
    if(this.api){
        this.type = 'application/json';
        this.body = content;
    }else{
        this.type = 'application/xml';
        var xml = util.tpl(content, message);
        this.body = xml;
    }
};


module.exports = Wechat;