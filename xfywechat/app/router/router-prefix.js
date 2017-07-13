'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.routePrefix = routePrefix;

var _koaRouter = require('./koa-router');

/**
 * Created by yao on 2017/6/12.
 */
var router = require('koa-router');
function routePrefix(route) {
    return function (target) {
        if (typeof target === 'function') {
            target.prototype.router = {
                prefix: route
            };
        }
    };
}
//# sourceMappingURL=router-prefix.js.map