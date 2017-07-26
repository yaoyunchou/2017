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

var _infomation = require('../services/infomation.service');

var _infomation2 = _interopRequireDefault(_infomation);

var _service = require('../common/service.decorator');

var _service2 = _interopRequireDefault(_service);

var _util = require('../libs/util');

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

var InfomationController = (_dec = (0, _router.routePrefix)('infomation'), _dec2 = (0, _service2.default)(_infomation2.default, 'infomations'), _dec3 = (0, _router.route)('detail/:id'), _dec4 = (0, _router.route)('list'), _dec5 = (0, _router.route)('addRssByLink'), _dec(_class = _dec2(_class = (_class2 = function () {
	function InfomationController() {
		_classCallCheck(this, InfomationController);
	}

	_createClass(InfomationController, [{
		key: 'getInfomation',
		// http://localhost:3000/user
		value: function () {
			var _ref = _asyncToGenerator(_regenerator2.default.mark(function _callee(_ref2) {
				var id = _ref2.id;
				var infomation;
				return _regenerator2.default.wrap(function _callee$(_context) {
					while (1) {
						switch (_context.prev = _context.next) {
							case 0:
								_context.next = 2;
								return this.service.getItemById(id);

							case 2:
								infomation = _context.sent;
								return _context.abrupt('return', infomation);

							case 4:
							case 'end':
								return _context.stop();
						}
					}
				}, _callee, this);
			}));

			function getInfomation(_x) {
				return _ref.apply(this, arguments);
			}

			return getInfomation;
		}()
	}, {
		key: 'getList',
		value: function () {
			var _ref3 = _asyncToGenerator(_regenerator2.default.mark(function _callee2(params, body) {
				var pageSize, pageNumber, sortter, list, backData;
				return _regenerator2.default.wrap(function _callee2$(_context2) {
					while (1) {
						switch (_context2.prev = _context2.next) {
							case 0:
								pageSize = body.query.pageSize || 10;
								pageNumber = body.query.pageNumber || 0;
								sortter = { "pubDate": -1 };
								_context2.next = 5;
								return this.service.getList({}, pageSize, pageNumber, sortter);

							case 5:
								list = _context2.sent;
								backData = {
									isSuccess: true,
									data: list
								};
								return _context2.abrupt('return', backData);

							case 8:
							case 'end':
								return _context2.stop();
						}
					}
				}, _callee2, this);
			}));

			function getList(_x2, _x3) {
				return _ref3.apply(this, arguments);
			}

			return getList;
		}()
	}, {
		key: 'addRssByLink',
		value: function () {
			var _ref4 = _asyncToGenerator(_regenerator2.default.mark(function _callee3(params, body) {
				return _regenerator2.default.wrap(function _callee3$(_context3) {
					while (1) {
						switch (_context3.prev = _context3.next) {
							case 0:
								(0, _util.fetchInfomation)(body.query.link, 2, this.service);
								//return backData;

							case 1:
							case 'end':
								return _context3.stop();
						}
					}
				}, _callee3, this);
			}));

			function addRssByLink(_x4, _x5) {
				return _ref4.apply(this, arguments);
			}

			return addRssByLink;
		}()
	}]);

	return InfomationController;
}(), (_applyDecoratedDescriptor(_class2.prototype, 'getInfomation', [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, 'getInfomation'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'getList', [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, 'getList'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'addRssByLink', [_dec5], Object.getOwnPropertyDescriptor(_class2.prototype, 'addRssByLink'), _class2.prototype)), _class2)) || _class) || _class);

//fetchInfomation('http://www.w3cplus.com/rss.xml', 1,new InfomationSvc());

exports.default = InfomationController;
var schedule = require("node-schedule");
var rule = new schedule.RecurrenceRule();

rule.dayOfWeek = [0, new schedule.Range(1, 6)];

rule.hour = 1;

rule.minute = 55;

var job = schedule.scheduleJob(rule, function () {
	(0, _util.fetchInfomation)('http://www.w3cplus.com/rss.xml', 1, new _infomation2.default());
});
//# sourceMappingURL=infomation.controller.js.map