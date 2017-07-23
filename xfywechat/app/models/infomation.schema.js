'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongoose = require('mongoose');

exports.default = new _mongoose.Schema({
	link: {
		type: _mongoose.Schema.Types.String,
		unique: true,
		required: true
	},
	title: _mongoose.Schema.Types.String,
	description: String,
	pubDate: _mongoose.Schema.Types.Date,
	source: Object,
	author: String,
	typeId: _mongoose.Schema.Types.Number,
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
//# sourceMappingURL=infomation.schema.js.map