import {MongoClient} from 'mongodb';
import assert from 'assert';
import {mongodbConfig} from '../config';

var url = mongodbConfig.url;

function connect(handler) {
	MongoClient.connect(url, function (err, db) {
		assert.equal(null, err);
		console.log("Connected successfully to server");
		handler(db, ()=>db.close());
	});
}


/**
 * 插入数据
 * @param document
 * @param conllectionName
 */
var insertDocuments = function insertDocuments(document, conllectionName) {
	connect((db, callback)=> {
		// Get the documents collection
		let collection = db.collection(conllectionName);
		// Insert some documents
		collection.insertMany(document, function (err, result) {
			assert.equal(err, null);
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
		let conllection = db.collection(collectionName);
		conllection.find(query).toArray(function (err, docs) {
			assert.equal(err, null);
			console.log("Found the following records");
			console.log(docs);
			callback(docs);
		});
	});
};

var updateDocument = function updateDocument(collectionName,query){
	connect(function(db,callback){
		let collection = db.collection(collectionName);
		collection.updateOne(query.o,query.n,function(err,result){
			assert.equal(err,null);
			assert.equal(1,result.result.n);
			console.log("Update the ducument with the field a equal to 2");
			callback(result);
		});
	});
};

export {insertDocuments, findDocuments,updateDocument};

