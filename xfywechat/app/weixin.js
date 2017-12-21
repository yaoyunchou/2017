/**
 * Created by yao on 2016/11/3.
 *
 * 这个是主要处理的逻辑层,我们会对返回的内容做对应的处理,最后由wechat的那个逻辑类来返回正确的内容
 *
 */
"use strict";

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var config = require('./config');
var Wechat = require('./wechat/wechat');
var wechatApi = new Wechat(config.wechat);
exports.wechatApi = new Wechat(config.wechat);
exports.reply = _regenerator2.default.mark(function _callee(next) {
    var message, content, replay, data, imgData, materail;
    return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    message = this.weixin;

                    if (!(message.MsgType === 'event')) {
                        _context.next = 5;
                        break;
                    }

                    if (message.Event === 'subscribe') {
                        if (message.EventKey) {
                            console.log('扫描二维码进来：' + message.EventKey + '' + message.ticket);
                        }
                        this.body = '哈哈哈，你订阅了这个号\r\n' + '消息ID：';
                    } else if (message.Event === 'unsubscribe') {
                        console.log('取消关注!');
                    } else if (message.Event === 'location') {
                        this.body = "您的上报位置是:" + message.latitude + '/' + message.longitude + '-' + message.Precision;
                    } else if (message.Event === 'CLICK') {
                        this.body = '您了菜单' + message.EventKey;
                    } else if (message.Event === 'scan') {
                        console.log('关注后扫二维码' + message.EventKey + '' + message.Ticket);
                        this.body = "看见您扫了一下哦!";
                    } else if (message.Event === 'view') {
                        this.body = '您点击了菜单中的链接:' + message.EventKey;
                    } else {
                        console.log("do nothing!");
                    }
                    _context.next = 94;
                    break;

                case 5:
                    if (!(message.MsgType === 'location')) {
                        _context.next = 10;
                        break;
                    }

                    this.body = "您的上报位置是:" + message.Location_X + '/' + message.Location_Y + '-' + message.Label;
                    console.log("do nothing!");
                    _context.next = 94;
                    break;

                case 10:
                    if (!(message.MsgType === 'text')) {
                        _context.next = 94;
                        break;
                    }

                    content = message.Content;
                    replay = '额,您说的' + message.Content + '太复杂了,我无法理解';

                    if (!(content === '1')) {
                        _context.next = 17;
                        break;
                    }

                    replay = '我是程序员';
                    _context.next = 92;
                    break;

                case 17:
                    if (!(content === "黄程")) {
                        _context.next = 21;
                        break;
                    }

                    replay = "我爱你,老婆!";
                    _context.next = 92;
                    break;

                case 21:
                    if (!(content === '4')) {
                        _context.next = 25;
                        break;
                    }

                    replay = [{
                        title: '技术改变世界!',
                        description: '我是程序员',
                        picUrl: 'http://cmstest.51yxwz.com/27616_MP/resource/images/20160721174701000592.jpg',
                        url: 'https://github.com'

                    }, {
                        title: 'Nodejs 开发微信 !',
                        description: '我是程序员',
                        picUrl: 'http://xfysj-yao.stor.sinaapp.com/ok.jpg',
                        url: 'https://nodejs.org/'

                    }];
                    _context.next = 92;
                    break;

                case 25:
                    if (!(content === '5')) {
                        _context.next = 32;
                        break;
                    }

                    _context.next = 28;
                    return wechatApi.uploadMaterial('image', __dirname + '/2.jpg');

                case 28:
                    data = _context.sent;

                    replay = {
                        type: 'image',
                        mediaId: data.media_id
                    };
                    _context.next = 92;
                    break;

                case 32:
                    if (!(content === '51')) {
                        _context.next = 39;
                        break;
                    }

                    _context.next = 35;
                    return wechatApi.uploadMaterial('newsImg', __dirname + '/2.jpg', {});

                case 35:
                    data = _context.sent;

                    replay = {
                        type: 'text',
                        content: "<a href='" + data.url + "'>链接</a>"
                    };
                    _context.next = 92;
                    break;

                case 39:
                    if (!(content === '6')) {
                        _context.next = 47;
                        break;
                    }

                    _context.next = 42;
                    return wechatApi.uploadMaterial('video', __dirname + '/1.mp4', {
                        type: 'video', description: "{title:'111', introduction:22222}"
                    });

                case 42:
                    data = _context.sent;

                    console.log("返回的data是:" + JSON.stringify(data));
                    replay = {
                        title: '打球',
                        type: 'video',
                        description: '没有描述的视频',
                        mediaId: data.media_id
                    };
                    _context.next = 92;
                    break;

                case 47:
                    if (!(content === '7')) {
                        _context.next = 55;
                        break;
                    }

                    _context.next = 50;
                    return wechatApi.uploadMaterial('video', __dirname + '/6.mp4');

                case 50:
                    data = _context.sent;

                    console.log("返回的data是:" + JSON.stringify(data));
                    replay = {
                        title: '打球',
                        type: 'video',
                        description: '没有描述的视频',
                        mediaId: data.media_id
                    };
                    _context.next = 92;
                    break;

                case 55:
                    if (!(content === '8')) {
                        _context.next = 62;
                        break;
                    }

                    _context.next = 58;
                    return wechatApi.loadMaterial({});

                case 58:
                    data = _context.sent;

                    console.log("返回的data是:" + JSON.stringify(data));
                    _context.next = 92;
                    break;

                case 62:
                    if (!(content === 'news')) {
                        _context.next = 69;
                        break;
                    }

                    _context.next = 65;
                    return wechatApi.loadMaterial({ type: 'news' });

                case 65:
                    data = _context.sent;

                    console.log("返回的data是:" + JSON.stringify(data));
                    _context.next = 92;
                    break;

                case 69:
                    if (!(content === '9')) {
                        _context.next = 76;
                        break;
                    }

                    _context.next = 72;
                    return wechatApi.getMaterialCount();

                case 72:
                    data = _context.sent;

                    console.log("返回的data是:" + JSON.stringify(data));
                    _context.next = 92;
                    break;

                case 76:
                    if (!(content === '10')) {
                        _context.next = 83;
                        break;
                    }

                    _context.next = 79;
                    return wechatApi.uploadMaterial('image', __dirname + '/2.jpg', {});

                case 79:
                    data = _context.sent;

                    replay = {
                        type: 'image',
                        mediaId: data.media_id
                    };
                    _context.next = 92;
                    break;

                case 83:
                    if (!(content === '11')) {
                        _context.next = 92;
                        break;
                    }

                    _context.next = 86;
                    return wechatApi.uploadMaterial('image', __dirname + '/2.jpg', {});

                case 86:
                    imgData = _context.sent;
                    materail = {
                        "articles": [{
                            "title": 'test',
                            "thumb_media_id": imgData.media_id,
                            "author": 'yao',
                            "digest": '!!!',
                            "show_cover_pic": 1,
                            "content": '说点什么',
                            "content_source_url": 'http://www.nsw88.com'
                        }]
                    };
                    _context.next = 90;
                    return wechatApi.uploadMaterial('news', materail, {});

                case 90:
                    data = _context.sent;

                    // replay = [{
                    //     title: '技术改变世界!',
                    //     description: '我是程序员',
                    //     picUrl: url.url,
                    //     url: 'https://github.com'
                    //
                    // }];
                    console.log(data);

                case 92:
                    console.log("返回的replay是:" + JSON.stringify(replay));
                    this.body = replay;

                case 94:
                    _context.next = 96;
                    return next;

                case 96:
                case 'end':
                    return _context.stop();
            }
        }
    }, _callee, this);
});