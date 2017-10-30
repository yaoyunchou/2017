"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Shcema = _mongoose2.default.Shcema;

var Service = function () {
	function Service(name, schema) {
		_classCallCheck(this, Service);

		this.schema = schema;
		this.DbModal = _mongoose2.default.model(name, this.schema);
	}
	/**
  * @param  {} key
  */

	_createClass(Service, [{
		key: "hasKey",
		value: function hasKey(key) {
			return this.schema.hasOwnProperty(key);
		}
	}, {
		key: "toSchema",
		value: function toSchema(item) {
			return new this.DbModal(item);
		}
		/**
   * @param  {String} filter
   * @param  {Number} pageSize=10
   * @param  {Number} pageNumber=0
   * @param  {*} sortter
   */

	}, {
		key: "getList",
		value: function getList(filter, pageSize) {
			var pageNumber = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
			var expect = arguments[3];
			var sortter = arguments[4];

			expect = expect || {};
			var skipItems = (pageNumber - 1) * pageSize;
			var query = this.DbModal.find(filter, expect);
			if (pageSize) {
				query.skip(skipItems).limit(pageSize);
			}
			sortter = sortter || {
				updated: -1
			};
			return query.sort(sortter);
		}
	}, {
		key: "count",
		value: function count(filter) {
			var query = this.DbModal.find(filter);
			var count = query.count();
			return count;
		}
		/**
   * @param  {String} filter
   */

	}, {
		key: "getItem",
		value: function getItem(filter) {
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
	}, {
		key: "getItemById",
		value: function getItemById(id) {
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
				'_id': _mongoose2.default.Types.ObjectId(id)
			}).exec();
		}
		/**
   * @param  {Object} item
   */

	}, {
		key: "saveItem",
		value: function saveItem(item) {
			var id = item._id;
			try {
				if (id) {
					delete item._id;
					return this.DbModal.findByIdAndUpdate(id, item, {
						upsert: true
					});
				} else {
					return this.toSchema(item).save();
				}
			} catch (e) {
				console.log(e);
			}
		}
	}, {
		key: "create",
		value: function create() {}
	}]);

	return Service;
}();

exports.default = Service;
//# sourceMappingURL=bas.service.js.map