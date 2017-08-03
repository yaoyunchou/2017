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

require("./job");

var _controllers = require("./controllers");

var _controllers2 = _interopRequireDefault(_controllers);

var _context = require("./common/context");

var _context2 = _interopRequireDefault(_context);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var koa = new _koa2.default();

_controllers2.default.bindRouters();

var log4js = require('koa-log4');
koa.use(log4js.koaLogger(log4js.getLogger("http"), { level: 'auto' }));

koa.use((0, _koaStatic2.default)(__dirname + '/view'));

koa.use((0, _g2.default)(_config2.default.wechat, _weixin2.default.reply));
koa.use(_router.koaRouter.routes());
koa.use(_router.koaRouter.allowedMethods());
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// var content = 'mongodb://localhost/yao'
// var content = MONGODB_URI ||'mongodb://localhost/yao'
mongoose.connect('mongodb://yao:YaoPwd127899YCC@crm.liangcanl.cn:59832/yao', {
  //mongoose.connect('mongodb://localhost/yao', {
  useMongoClient: true
  /* other options */
});

//import "./test"
//console.log(process.env);
koa.listen(process.env.PORT || 8090);
console.log('Listening:' + (process.env.PORT || 8090));
//# sourceMappingURL=app.js.map