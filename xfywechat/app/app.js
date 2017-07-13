/**
 * Created by yao on 2016/10/23.
 */
"use strict";

var _router = require("./router");

var _koa = require("koa");

var _koa2 = _interopRequireDefault(_koa);

var _g = require("./wechat/g");

var _g2 = _interopRequireDefault(_g);

var _config = require("./config");

var _config2 = _interopRequireDefault(_config);

var _weixin = require("./weixin");

var _weixin2 = _interopRequireDefault(_weixin);

var _koaStatic = require("koa-static");

var _koaStatic2 = _interopRequireDefault(_koaStatic);

require("./demo/user.controller");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var koa = new _koa2.default();

koa.use((0, _koaStatic2.default)(__dirname + '/view'));

koa.use((0, _g2.default)(_config2.default.wechat, _weixin2.default.reply));
koa.use(_router.koaRouter.routes());
koa.use(_router.koaRouter.allowedMethods());

koa.listen(process.env.PORT || 8090);
console.log('Listening:' + (process.env.PORT || 8090));
//# sourceMappingURL=app.js.map