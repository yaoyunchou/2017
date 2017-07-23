'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.route = route;

var _koaRouter = require('./koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * Created by yao on 2017/6/12.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            */


/**
 * @param  {} route
 * @param  {} method
 * @param  {} isAsync=true
 */
function route(route, method) {
	var isAsync = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

	return function (target, name, descriptor) {
		setTimeout(function () {
			//TODO：默认类的实例化会在函数实例化之后，所有这里会加这个东东
			var prefix = target.router && target.router.prefix,
			    fixed_route;
			if (route) {
				fixed_route = prefix ? '/' + prefix + '/' + route : '/' + route;
			} else {
				fixed_route = '/' + prefix;
			}

			console.log(fixed_route);
			method = method || getDefaultHttpMethod(name, route) || 'get';
			_koaRouter2.default[method](fixed_route, function () {
				var _ref = _asyncToGenerator(_regenerator2.default.mark(function _callee(next) {
					var result;
					return _regenerator2.default.wrap(function _callee$(_context) {
						while (1) {
							switch (_context.prev = _context.next) {
								case 0:
									_context.prev = 0;

									if (!(method === 'get' || method === 'delete')) {
										_context.next = 11;
										break;
									}

									if (!isAsync) {
										_context.next = 8;
										break;
									}

									_context.next = 5;
									return descriptor.value.call(target, this.params, this);

								case 5:
									result = _context.sent;
									_context.next = 9;
									break;

								case 8:
									result = descriptor.value.call(target, this.params, this);

								case 9:
									_context.next = 18;
									break;

								case 11:
									if (!isAsync) {
										_context.next = 17;
										break;
									}

									_context.next = 14;
									return descriptor.value.call(target, this.body, this);

								case 14:
									result = _context.sent;
									_context.next = 18;
									break;

								case 17:
									result = descriptor.value.call(target, this.body, this);

								case 18:
									_context.next = 24;
									break;

								case 20:
									_context.prev = 20;
									_context.t0 = _context['catch'](0);

									console.log(_context.t0);
									this.status = 500;

								case 24:

									this.body = result;
									_context.next = 27;
									return next;

								case 27:
								case 'end':
									return _context.stop();
							}
						}
					}, _callee, this, [[0, 20]]);
				}));

				return function (_x2) {
					return _ref.apply(this, arguments);
				};
			}());
			return descriptor;
		});
	};
}

function getDefaultHttpMethod(name, route) {
	if (/^get/.test(name)) {
		return 'get';
	} else if (/^update/.test(name)) {
		return 'put';
	} else if (/^delete/.test(name) || /^remove/.test(name)) {
		return 'delete';
	} else if (/^create/.test(name)) {
		return 'get';
	} else if (/^save/.test(name)) {
		return 'post';
	} else if (route) {
		return getDefaultHttpMethod(route);
	}
}
//# sourceMappingURL=router.js.map