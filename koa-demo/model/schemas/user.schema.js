const mongoose = require('mongoose');

const Schema = mongoose.Schema;

module.exports = new Schema({
    nikeName:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        unique:true,
        require:true
    },
    psw:String,
    created: {
        type: Schema.Types.Date,
        default: Date.now
    },
    update: {
        type: Schema.Types.Date,
        default: Date.now
    },
});