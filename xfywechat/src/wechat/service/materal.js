/**
 * Created by yao on 2016/11/20.
 */
/* global exports */

"use strict";
var wechatApi = require('../../weixin').wechatApi;
var _ = require('lodash');
var Materal = function(){

};

Materal.prototype.imgList =function*(next) {
    var query = this.query;
    var options = {
        offset:query.pageNum,
        count:query.pageSize
    };
    var data = yield wechatApi.loadMaterial(options);
    var backdata = {
        data:{
            dataList:data.item,
            totalPages:data.item_count,
            totalRows:data.total_count
        },
        isSuccess:true
    };
    this.body = JSON.stringify(backdata);
    this.api = true;
    yield next;
};
Materal.prototype.newsList = function*(next){
    var query = this.query;
    var options = {
        type:'news',
        offset:query.pageNum,
        count:query.pageSize
    };
    var data = yield wechatApi.loadMaterial(options);
    var backdata = {
        data:{
            dataList:[],
            totalPages:data.item_count,
            totalRows:data.total_count,

        },
        isSuccess:true
    };
    _.forEach(data.item,function (o) {
        var article = {
            media_id:o.media_id,
            update_time :o.update_time,
            create_time:o.content.create_time,
            articles:o.content.news_item
        };
        backdata.data.dataList.push(article);
    });
    this.body = JSON.stringify(backdata);
    this.api = true;
    yield next;
};
module.exports = new Materal();