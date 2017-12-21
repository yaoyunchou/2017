'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _dec2, _class, _desc, _value, _class2;

var _router = require('../router');

var _image = require('../services/image.service');

var _image2 = _interopRequireDefault(_image);

var _service = require('../common/service.decorator');

var _service2 = _interopRequireDefault(_service);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var ImageController = (_dec = (0, _router.routePrefix)('image'), _dec2 = (0, _router.route)('imageUpload', 'post'), _dec(_class = (_class2 = function () {
	function ImageController() {
		_classCallCheck(this, ImageController);
	}

	_createClass(ImageController, [{
		key: 'imageUpload',
		// http://localhost:3000/user
		value: function imageUpload() {
			//let infomation = this.service.create();
			//fixhtml(infomation);
			return { name: 'test', title: 'image' };
		}
	}]);

	return ImageController;
}(), (_applyDecoratedDescriptor(_class2.prototype, 'imageUpload', [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, 'imageUpload'), _class2.prototype)), _class2)) || _class);
exports.default = ImageController;

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