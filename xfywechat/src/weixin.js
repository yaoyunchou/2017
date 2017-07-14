/**
 * Created by yao on 2016/11/3.
 *
 * 这个是主要处理的逻辑层,我们会对返回的内容做对应的处理,最后由wechat的那个逻辑类来返回正确的内容
 *
 */
"use strict";


var config = require('./config');
var Wechat = require('./wechat/wechat');
var wechatApi = new Wechat(config.wechat);
exports.wechatApi = new Wechat(config.wechat);
exports.reply = function*(next) {
    var message = this.weixin;
    if (message.MsgType === 'event') {
        if (message.Event === 'subscribe') {
            if (message.EventKey) {
                console.log('扫描二维码进来：' + message.EventKey + '' + message.ticket);
            }
            this.body = '哈哈哈，你订阅了这个号\r\n' + '消息ID：';
        } else if (message.Event === 'unsubscribe') {
            console.log('取消关注!');
        }
        else if (message.Event === 'location') {
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
    } else if (message.MsgType === 'location') {
        this.body = "您的上报位置是:" + message.Location_X + '/' + message.Location_Y + '-' + message.Label;
        console.log("do nothing!");
    } else if (message.MsgType === 'text') {
        var content = message.Content;
        var replay = '额,您说的' + message.Content + '太复杂了,我无法理解';
        if (content === '1') {
            replay = '我是程序员';
        } else if (content === "黄程") {
            replay = "我爱你,老婆!";
        } else if (content === '4') {
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
        } else if (content === '5') {
            var data = yield wechatApi.uploadMaterial('image', __dirname + '/2.jpg');
            replay = {
                type: 'image',
                mediaId: data.media_id
            };
        } else if (content === '51') {
            var data = yield wechatApi.uploadMaterial('newsImg', __dirname + '/2.jpg', {});
            replay = {
                type: 'text',
                content: "<a href='" + data.url + "'>链接</a>"
            };
        } else if (content === '6') {
            var data = yield wechatApi.uploadMaterial('video', __dirname + '/1.mp4', {
                type: 'video', description: "{title:'111', introduction:22222}"
            });
            console.log("返回的data是:" + JSON.stringify(data));
            replay = {
                title: '打球',
                type: 'video',
                description: '没有描述的视频',
                mediaId: data.media_id
            };
        } else if (content === '7') {
            var data = yield wechatApi.uploadMaterial('video', __dirname + '/6.mp4');
            console.log("返回的data是:" + JSON.stringify(data));
            replay = {
                title: '打球',
                type: 'video',
                description: '没有描述的视频',
                mediaId: data.media_id
            };
        } else if (content === '8') {
            var data = yield wechatApi.loadMaterial({});
            console.log("返回的data是:" + JSON.stringify(data));
        } else if (content === 'news') {
            var data = yield wechatApi.loadMaterial({type:'news'});
            console.log("返回的data是:" + JSON.stringify(data));
        } else if (content === '9') {
            var data = yield wechatApi.getMaterialCount();
            console.log("返回的data是:" + JSON.stringify(data));
        } else if (content === '10') {
            var data = yield wechatApi.uploadMaterial('image', __dirname + '/2.jpg', {});
            replay = {
                type: 'image',
                mediaId: data.media_id
            };
        } else if (content === '11') {
            var imgData = yield wechatApi.uploadMaterial('image', __dirname + '/2.jpg', {});
            var materail = {
                "articles": [{
                    "title": 'test',
                    "thumb_media_id": imgData.media_id,
                    "author": 'yao',
                    "digest": '!!!',
                    "show_cover_pic": 1,
                    "content": '说点什么',
                    "content_source_url": 'http://www.nsw88.com'
                },
                    //若新增的是多图文素材，则此处应有几段articles结构，最多8段
                ]
            }
            var data = yield wechatApi.uploadMaterial('news',materail, {});
                // replay = [{
                //     title: '技术改变世界!',
                //     description: '我是程序员',
                //     picUrl: url.url,
                //     url: 'https://github.com'
                //
                // }];
            console.log(data);
        }
        console.log("返回的replay是:" + JSON.stringify(replay));
        this.body = replay;
    }


    yield next;
};

