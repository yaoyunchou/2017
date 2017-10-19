/**
 * Created by yao on 2016/10/29.
 */
"use strict";
var sha1 = require('sha1');
var getRawBody = require('raw-body');
var util = require('./util');
var Wechat = require('./wechat');
var materal = require('./service/materal');


module.exports = function (opts, handler) {
    var wechat = new Wechat(opts);
    return function *(next) {
        var that = this;
        console.log(this.query);

        var token = opts.token;
        var signature = this.query.signature;
        var timestamp = this.query.timestamp;
        var nonce = this.query.nonce;
        var echostr = this.query.echostr;
        var str = [token, timestamp, nonce].sort().join('');
        var sha = sha1(str);
        console.log('我是访问路径：' + this.path);


        if (this.path === '/material/materialInfoImage') {
            yield  materal.imgList.call(this, next);
        } else if (this.path === '/material/materialInfoNews') {
            yield  materal.newsList.call(this, next);
        } else if (this.path === '/') {
            if (this.method === 'GET') {
                if (sha === signature) {
                    this.body = echostr + '';
                } else {
                    this.body = 'wrong';
                }
            } else if (this.method === 'POST') {
                if (sha !== signature) {
                    this.body = 'wrong';
                    //this.body = echostr + '';
                    return false;
                }
                var data = yield getRawBody(this.req, {
                    length: this.length,
                    limit: 'lmb',
                    encoding: this.charset
                });
                var content = yield util.parseXMLAsync(data);
                var message = util.formatMessage(content.xml);
                this.weixin = message;
                //把message拿到后就交给业务层;
                yield  handler.call(this, next);
                if (this.body) {
                    wechat.reply.call(this);
                }
            }
        }
        yield next;
    };
};
