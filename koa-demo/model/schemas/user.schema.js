const mongoose = require('mongoose');

const Schema = mongoose.Schema;

module.exports = new Schema({

    nikeName: {
        type: Schema.Types.String,
        required: true
    },

    phone: {
        type: Schema.Types.String,
        //unique: true,
        require: true
    },
    id: {
        type: Schema.Types.ObjectId
    },
    psw: String,
    wx: String,
    qq: String,
    email: String,
    created: {
        type: Schema.Types.Date,
        default: Date.now
    },
    update: {
        type: Schema.Types.Date,
        default: Date.now
    },
    createdBy: Schema.Types.ObjectId,
    updateBy: Schema.Types.ObjectId
});