'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _dec2, _dec3, _dec4, _dec5, _class, _desc, _value, _class2;

var _router = require('../router');

var _user = require('../services/user.service');

var _user2 = _interopRequireDefault(_user);

var _service = require('../common/service.decorator');

var _service2 = _interopRequireDefault(_service);

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

var UserController = (_dec = (0, _router.routePrefix)('user'), _dec2 = (0, _service2.default)(_user2.default, 'user'), _dec3 = (0, _router.route)('detail/:id'), _dec4 = (0, _router.route)('create', 'get', false), _dec5 = (0, _router.route)('list'), _dec(_class = _dec2(_class = (_class2 = function () {
	function UserController() {
		_classCallCheck(this, UserController);
	}

	_createClass(UserController, [{
		key: 'info',
		value: function info() {
			console.log(this);
		}
	}, {
		key: 'getUser',
		// http://localhost:3000/user
		value: function () {
			var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee(_ref2) {
				var id = _ref2.id;
				var user;
				return _regenerator2.default.wrap(function _callee$(_context) {
					while (1) {
						switch (_context.prev = _context.next) {
							case 0:
								_context.next = 2;
								return timeout({
									id: "01",
									name: 'bowen',
									xxx: id
								});

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
		key: 'create',
		// http://localhost:3000/api/user/create
		value: function create() {
			console.log(this);
			return this.service.create();
		}
	}, {
		key: 'getList',
		value: function () {
			var _ref3 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
				var list;
				return _regenerator2.default.wrap(function _callee2$(_context2) {
					while (1) {
						switch (_context2.prev = _context2.next) {
							case 0:
								_context2.next = 2;
								return timeout([{
									id: "01",
									name: 'bowen'
								}, {
									id: "01",
									name: 'bowen'
								}]);

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
}(), (_applyDecoratedDescriptor(_class2.prototype, 'getUser', [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, 'getUser'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'create', [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, 'create'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'getList', [_dec5], Object.getOwnPropertyDescriptor(_class2.prototype, 'getList'), _class2.prototype)), _class2)) || _class) || _class);
exports.default = UserController;

function log(target, name, descriptor) {
	var oldValue = descriptor.value;

	descriptor.value = function () {
		console.log('Calling "' + name + '" with', arguments);
		return oldValue.apply(null, arguments);
	};

	return descriptor;
}
function timeout(testVal) {
	return new Promise(function (resolve) {
		setTimeout(function () {
			resolve(testVal);
		}, 10);
	});
}
//# sourceMappingURL=user.controller.js.map