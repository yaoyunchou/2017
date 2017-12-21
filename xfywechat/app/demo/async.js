'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var asyncPrint = function () {
    var _ref = _asyncToGenerator(_regenerator2.default.mark(function _callee(value, ms) {
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        console.log(value);
                        _context.next = 3;
                        return timeout(ms);

                    case 3:
                        return _context.abrupt('return', _context.sent);

                    case 4:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function asyncPrint(_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();

var f = function () {
    var _ref2 = _asyncToGenerator(_regenerator2.default.mark(function _callee2() {
        return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.next = 2;
                        return new Promise(function (resolve, reject) {
                            throw new Error('出错了');
                        });

                    case 2:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, this);
    }));

    return function f() {
        return _ref2.apply(this, arguments);
    };
}();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/**
 * Created by yao on 2017/6/17.
 */
function timeout(ms) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve('!!!!');
        }, ms);
    });
}

asyncPrint('hello world', 50).then(function (data) {
    console.log(data);
});

f().then(function (v) {
    return console.log(v);
}, function (v) {
    return console.log(v);
}).catch(function (e) {
    return console.log(e);
});