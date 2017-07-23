// 测试userService的功能
import UserService from '../../services/user.service'
var mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost/yao');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/yao', {
  useMongoClient: true,
  /* other options */
});	
var userService = new UserService();

userService.saveItem({
	"name": "yaoyunchou1243",
	"nikeName": "yun",
	"desc": "是一个好人,士大夫顺丰速递士大夫顺丰速递士大夫顺丰速递士大夫顺丰速递",
	"avatar": ""
}).then((data)=>{
	console.log(data);
})

var item = userService.getItem({name:/123/}).then((data)=>{
	console.log(data);
});
