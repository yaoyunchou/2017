'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongoose = require('mongoose');

exports.default = new _mongoose.Schema({
	name: {
		type: _mongoose.Schema.Types.String,
		unique: true,
		required: true
	},
	nickName: _mongoose.Schema.Types.String,
	desc: _mongoose.Schema.Types.String,
	email: String,
	pssword: String,
	avatar: String,
	roles: [_mongoose.Schema.Types.ObjectId],
	created: {
		type: _mongoose.Schema.Types.Date,
		default: Date.now
	},
	update: {
		type: _mongoose.Schema.Types.Date,
		default: Date.now
	},
	createdBy: _mongoose.Schema.Types.ObjectId,
	updateBy: _mongoose.Schema.Types.ObjectId
}); /**
     * Created by yao on 2017/6/23.
     */