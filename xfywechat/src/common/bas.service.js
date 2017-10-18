import mogoose from "mongoose";
var {
	Shcema
} = mogoose;
import _ from "lodash";

export default class Service {
	constructor(name, schema) {
		this.schema = schema;
		this.DbModal = mogoose.model(name, this.schema)
	}
	/**
	 * @param  {} key
	 */

	hasKey(key) {
		return this.schema.hasOwnProperty(key);
	}
	toSchema(item) {
		return new this.DbModal(item);
	}
	/**
	 * @param  {String} filter
	 * @param  {Number} pageSize=10
	 * @param  {Number} pageNumber=0
	 * @param  {*} sortter
	 */
	getList(filter,pageSize, pageNumber = 1,expect,  sortter) {
		expect =expect ||{};
		var skipItems = (pageNumber-1) * pageSize;
		var query = this.DbModal.find(filter,expect);
		if (pageSize) {
			query.skip(skipItems).limit(pageSize);
		}
		sortter = sortter || {
			updated: -1
		};
		return query.sort(sortter);
	}
	/**
	 * @param  {String} filter
	 */
	getItem(filter) {
		// return new Promise((resolve, reject) => {
		// 	this.DbModal.findOne(filter).exec((err,item)=>{
		// 		//console.log(item);
		// 		if(err){
		// 			reject('没有找到对应的'+this.name);
		// 		}else{
		// 			resolve(item);
		// 		}
		// 	});
		// })
		return this.DbModal.findOne(filter).exec();
	}
	getItemById(id) {
		// return new Promise((resolve, reject) => {
		// 	this.DbModal.findOne(filter).exec((err,item)=>{
		// 		//console.log(item);
		// 		if(err){
		// 			reject('没有找到对应的'+this.name);
		// 		}else{
		// 			resolve(item);
		// 		}
		// 	});
		// })
		return this.DbModal.findOne({
			'_id': mogoose.Types.ObjectId(id)
		}).exec();
	}
	/**
	 * @param  {Object} item
	 */
	saveItem(item) {
		var id = item._id;
		try {
			if (id) {
				delete item._id;
				return this.DbModal.findByIdAndUpdate(id, item, {
					upsert: true
				})
			} else {
				return this.toSchema(item).save();
			}
		} catch (e) {
			console.log(e);
		}

	}
	create() {

	}
}