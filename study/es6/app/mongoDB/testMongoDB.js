'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.updateDocument = exports.findDocuments = exports.insertDocuments = undefined;

var _mongodb = require('mongodb');

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _config = require('../config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var url = _config.mongodbConfig.url;

function connect(handler) {
	_mongodb.MongoClient.connect(url, function (err, db) {
		_assert2.default.equal(null, err);
		console.log("Connected successfully to server");
		handler(db, function () {
			return db.close();
		});
	});
}

/**
 * 插入数据
 * @param document
 * @param conllectionName
 */
var insertDocuments = function insertDocuments(document, conllectionName) {
	connect(function (db, callback) {
		// Get the documents collection
		var collection = db.collection(conllectionName);
		// Insert some documents
		collection.insertMany(document, function (err, result) {
			_assert2.default.equal(err, null);
			//assert.equal(3, result.result.n);
			//assert.equal(3, result.ops.length);
			console.log("Inserted 3 documents into the collection");
			callback(result);
		});
	});
};
/**
 * 查找所有的数据
 * @param collectionName
 * @param query
 */
var findDocuments = function findDocuments(collectionName, query) {
	query = query || {};
	connect(function (db, callback) {
		var conllection = db.collection(collectionName);
		conllection.find(query).toArray(function (err, docs) {
			_assert2.default.equal(err, null);
			console.log("Found the following records");
			console.log(docs);
			callback(docs);
		});
	});
};

var updateDocument = function updateDocument(collectionName, query) {
	connect(function (db, callback) {
		var collection = db.collection(collectionName);
		collection.updateOne(query.o, query.n, function (err, result) {
			_assert2.default.equal(err, null);
			_assert2.default.equal(1, result.result.n);
			console.log("Update the ducument with the field a equal to 2");
			callback(result);
		});
	});
};

exports.insertDocuments = insertDocuments;
exports.findDocuments = findDocuments;
exports.updateDocument = updateDocument;