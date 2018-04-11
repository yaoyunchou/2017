/**
 * Created by yao on 2016/10/29.
 */
"use strict";

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sha1 = require('sha1');
var getRawBody = require('raw-body');
var util = require('./util');
var Wechat = require('./wechat');
var materal = require('./service/materal');

module.exports = function (opts, handler) {
    var wechat = new Wechat(opts);
    return (/*#__PURE__*/_regenerator2.default.mark(function _callee(next) {
            var that, token, signature, timestamp, nonce, echostr, str, sha, data, content, message;
            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            that = this;

                            console.log(this.query);

                            token = opts.token;
                            signature = this.query.signature;
                            timestamp = this.query.timestamp;
                            nonce = this.query.nonce;
                            echostr = this.query.echostr;
                            str = [token, timestamp, nonce].sort().join('');
                            sha = sha1(str);

                            console.log('我是访问路径：' + this.path);

                            if (!(this.path === '/material/materialInfoImage')) {
                                _context.next = 15;
                                break;
                            }

                            _context.next = 13;
                            return materal.imgList.call(this, next);

                        case 13:
                            _context.next = 40;
                            break;

                        case 15:
                            if (!(this.path === '/material/materialInfoNews')) {
                                _context.next = 20;
                                break;
                            }

                            _context.next = 18;
                            return materal.newsList.call(this, next);

                        case 18:
                            _context.next = 40;
                            break;

                        case 20:
                            if (!(this.path === '/')) {
                                _context.next = 40;
                                break;
                            }

                            if (!(this.method === 'GET')) {
                                _context.next = 25;
                                break;
                            }

                            if (sha === signature) {
                                this.body = echostr + '';
                            } else {
                                this.body = 'wrong';
                            }
                            _context.next = 40;
                            break;

                        case 25:
                            if (!(this.method === 'POST')) {
                                _context.next = 40;
                                break;
                            }

                            if (!(sha !== signature)) {
                                _context.next = 29;
                                break;
                            }

                            this.body = 'wrong';
                            //this.body = echostr + '';
                            return _context.abrupt('return', false);

                        case 29:
                            _context.next = 31;
                            return getRawBody(this.req, {
                                length: this.length,
                                limit: 'lmb',
                                encoding: this.charset
                            });

                        case 31:
                            data = _context.sent;
                            _context.next = 34;
                            return util.parseXMLAsync(data);

                        case 34:
                            content = _context.sent;
                            message = util.formatMessage(content.xml);

                            this.weixin = message;
                            //把message拿到后就交给业务层;
                            _context.next = 39;
                            return handler.call(this, next);

                        case 39:
                            if (this.body) {
                                wechat.reply.call(this);
                            }

                        case 40:
                            _context.next = 42;
                            return next;

                        case 42:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, this);
        })
    );
};