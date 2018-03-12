const mongoose = require('mongoose');

const Schema = mongoose.Schema;

module.exports = new Schema({
    //昵称
    nikeName:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        unique:true,
        require:true
    },
    psw:String,
    wx:String,
    qq:String,
    email:String,
    created: {
        type: Schema.Types.Date,
        default: Date.now
    },
    update: {
        type: Schema.Types.Date,
        default: Date.now
    },
});