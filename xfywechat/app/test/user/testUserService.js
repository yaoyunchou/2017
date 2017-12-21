'use strict';

var _user = require('../../services/user.service');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost/yao');
// 测试userService的功能
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/yao', {
	useMongoClient: true
	/* other options */
});
var userService = new _user2.default();

userService.saveItem({
	"name": "yaoyunchou1243",
	"nikeName": "yun",
	"desc": "是一个好人,士大夫顺丰速递士大夫顺丰速递士大夫顺丰速递士大夫顺丰速递",
	"avatar": ""
}).then(function (data) {
	console.log(data);
});

var item = userService.getItem({ name: /123/ }).then(function (data) {
	console.log(data);
});