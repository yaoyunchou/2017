//引入数据库
require('../model');

const user = require('../services/user.service');


//添加用户
// user.save({
//     nikeName:'yaoyunchou',
//     phone:'18124100815',
//     psw:'123456'

// }).then(function(data){
//     console.log(data);
// });
user.getItem('5aa6564c18151e09e0945da3',{'nikeName':1, 'phone':1}).then(function(data){
    console.log(data);
});