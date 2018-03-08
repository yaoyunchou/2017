

/**
 * 
 */
const mongoose = require('mongoose');
const {
    log4js
} = require('../logger');
const logger = log4js.getLogger('mongodb');
try {
    mongoose.connect('mongodb://localhost/yao');
} catch (error) {
    logger.error('mongodb', error.message);
}
var db = mongoose.connection;
db.on('error', (error) => {
    logger.error('connection error:', error.message);

});

db.once('open', function () {
    logger.info('connection ok:', '连接数据库成功!');

});


/**
 * 保存用户信息
 */
var account = mongoose.Schema({
    appID: {
        type: String,
        required: true,
        unique: true
    },
    appSecret: String,
    token: String
});
var Account = mongoose.model('wxAccount', account);

var tom = new Account({
    appID: 'wxaa1d387056944865',
    appSecret: '5107ab8612431421a7fced36828c8c9f',
    //appSecret: 'c7882d2015f0a46b90f8104c7cc764a7',
    token: 'yaoyunchou'
});


function init() {
    return new Promise((resolve, reject) => {
        Account.findOne({appID:'wxaa1d387056944865'},function(err,account){
            if(err||!account){
                new Account({
                    appID: 'wxaa1d387056944865',
                    appSecret: '5107ab8612431421a7fced36828c8c9f',
                    //appSecret: 'c7882d2015f0a46b90f8104c7cc764a7',
                    token: 'yaoyunchou'
                }).save(function (error) {
                    if (error) {
                        logger.error('error:', error.message);
                        reject(error);
                    } else {
                        resolve();
                    }
                });
            }else{
                Account.findOneAndUpdate({_id:account._id},{
                    appID: 'wxaa1d387056944865',
                    appSecret: '5107ab8612431421a7fced36828c8c9f',
                    //appSecret: 'c7882d2015f0a46b90f8104c7cc764a7',
                    token: 'yaoyunchou123'
                },function(err){
                    if(err){
                        reject(err);
                    }else{
                        resolve();
                    }
                   
                });
            }
            
        });
        
    });
}

init().then(function () {
    console.log('gogogo');
}, function (err) {
    logger.error(err.message);
});