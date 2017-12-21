'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.koaRouter = exports.route = exports.routePrefix = undefined;

var _koaRouter = require('./koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _routerPrefix = require('./router-prefix');

var _router = require('./router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.routePrefix = _routerPrefix.routePrefix;
exports.route = _router.route;
exports.koaRouter = _koaRouter2.default; /**
                                          * Created by yao on 2017/6/12.
                                          */