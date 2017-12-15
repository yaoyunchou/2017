/**
 * Created by yao on 2016/11/20.
 */
/* global exports */

"use strict";

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var wechatApi = require('../../weixin').wechatApi;
var _ = require('lodash');
var Materal = function Materal() {};

Materal.prototype.imgList = /*#__PURE__*/_regenerator2.default.mark(function _callee(next) {
    var query, options, data, backdata;
    return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    query = this.query;
                    options = {
                        offset: query.pageNum,
                        count: query.pageSize
                    };
                    _context.next = 4;
                    return wechatApi.loadMaterial(options);

                case 4:
                    data = _context.sent;
                    backdata = {
                        data: {
                            dataList: data.item,
                            totalPages: data.item_count,
                            totalRows: data.total_count
                        },
                        isSuccess: true
                    };

                    this.body = JSON.stringify(backdata);
                    this.api = true;
                    _context.next = 10;
                    return next;

                case 10:
                case 'end':
                    return _context.stop();
            }
        }
    }, _callee, this);
});
Materal.prototype.newsList = /*#__PURE__*/_regenerator2.default.mark(function _callee2(next) {
    var query, options, data, backdata;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
            switch (_context2.prev = _context2.next) {
                case 0:
                    query = this.query;
                    options = {
                        type: 'news',
                        offset: query.pageNum,
                        count: query.pageSize
                    };
                    _context2.next = 4;
                    return wechatApi.loadMaterial(options);

                case 4:
                    data = _context2.sent;
                    backdata = {
                        data: {
                            dataList: [],
                            totalPages: data.item_count,
                            totalRows: data.total_count

                        },
                        isSuccess: true
                    };

                    _.forEach(data.item, function (o) {
                        var article = {
                            media_id: o.media_id,
                            update_time: o.update_time,
                            create_time: o.content.create_time,
                            articles: o.content.news_item
                        };
                        backdata.data.dataList.push(article);
                    });
                    this.body = JSON.stringify(backdata);
                    this.api = true;
                    _context2.next = 11;
                    return next;

                case 11:
                case 'end':
                    return _context2.stop();
            }
        }
    }, _callee2, this);
});
module.exports = new Materal();
//# sourceMappingURL=materal.js.map