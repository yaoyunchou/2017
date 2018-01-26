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
db.on('error', (error)=>{
    logger.error('connection error:',error.message);

});

db.once('open', function (callback) {
    logger.info('connection ok:','连接数据库成功!');
    var kittySchema = mongoose.Schema({
        name: String
    });
    var Kitten = mongoose.model('Kitten', kittySchema);
    
    var tom = new Kitten({
        name:'Tom'
    });
    tom.save();
});





module.exports = mongoose;