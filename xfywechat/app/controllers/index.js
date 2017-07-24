'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _user = require('./user.controller');

var _user2 = _interopRequireDefault(_user);

var _router = require('../router');

var _infomation = require('./infomation.controller');

var _infomation2 = _interopRequireDefault(_infomation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    bindRouters: function bindRouters() {
        _router.koaRouter.add(_user2.default);
        _router.koaRouter.add(_infomation2.default);
    }
};
//# sourceMappingURL=index.js.map