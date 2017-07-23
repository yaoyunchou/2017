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
	getList(filter, pageSize, pageNumber = 0, sortter) {
		var skipItems = pageNumber * pageSize;
		var query = this.DbModal.find(filter);
		if (pageSize) {
			query.skip(skipItems).limit(pageSize);
		}
		sortter = sortter || {
			updated: -1
		};
		return query.sort(sortter).exec();
	}
	/**
	 * @param  {String} filter
	 */
	getItem(filter) {
		return this.DbModal.findOne(filter).exec();
	}
	/**
	 * @param  {Object} item
	 */
	saveItem(item) {
		var id = item._id;
		if (id) {
			delete item._id;
			return this.DbModal.findByIdAndUpdate(id, item, {
				upsert: true
			})
		} else {
			return this.toSchema(item).save();
		}
	}
	create() {

	}
}
