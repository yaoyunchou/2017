var mongoose = require('mongoose');
var Schema = mongoose.Schema;
module.exports = new Schema({
    access_token: {
        type: Schema.Types.String,
        unique: true,
        required: true
    },
    expires_in:Number,
    date: {
        type: Date,
        default: Date.now
    },
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