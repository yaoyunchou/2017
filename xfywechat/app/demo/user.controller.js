'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.UserController = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _dec2, _dec3, _class, _desc, _value, _class2;

var _router = require('../router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
        desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
        desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
        return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
        desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
        desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
        Object['define' + 'Property'](target, property, desc);
        desc = null;
    }

    return desc;
}

_router.koaRouter.add(UserController);

var UserController = exports.UserController = (_dec = (0, _router.routePrefix)('user/:id'), _dec2 = (0, _router.route)(), _dec3 = (0, _router.route)('list'), _dec(_class = (_class2 = function () {
    function UserController() {
        _classCallCheck(this, UserController);
    }

    _createClass(UserController, [{
        key: 'getUser',
        // http://localhost:3000/user
        value: function () {
            var _ref = _asyncToGenerator(_regenerator2.default.mark(function _callee(_ref2) {
                var id = _ref2.id;
                var user;
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return timeout({ id: "01", name: 'bowen', xxx: id });

                            case 2:
                                user = _context.sent;
                                return _context.abrupt('return', user);

                            case 4:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function getUser(_x) {
                return _ref.apply(this, arguments);
            }

            return getUser;
        }()
    }, {
        key: 'getList',
        value: function () {
            var _ref3 = _asyncToGenerator(_regenerator2.default.mark(function _callee2() {
                var list;
                return _regenerator2.default.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _context2.next = 2;
                                return timeout([{ id: "01", name: 'bowen', xxx: id }, { id: "01", name: 'bowen', xxx: id }]);

                            case 2:
                                list = _context2.sent;
                                return _context2.abrupt('return', list);

                            case 4:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function getList() {
                return _ref3.apply(this, arguments);
            }

            return getList;
        }()
    }]);

    return UserController;
}(), (_applyDecoratedDescriptor(_class2.prototype, 'getUser', [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, 'getUser'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'getList', [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, 'getList'), _class2.prototype)), _class2)) || _class);


function timeout(testVal) {
    return new Promise(function (resolve) {
        setTimeout(function () {
            resolve(testVal);
        }, 10);
    });
}
//# sourceMappingURL=user.controller.js.map