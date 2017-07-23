/**
 * Created by yao on 2017/6/23.
 */
import {Schema} from 'mongoose';

export default new Schema({
	name: {
		type: Schema.Types.String,
		unique: true,
		required: true
	},
	nickName: Schema.Types.String,
	desc: Schema.Types.String,
	email: String,
	pssword: String,
	avatar:String,
	roles: [Schema.Types.ObjectId],
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
})
