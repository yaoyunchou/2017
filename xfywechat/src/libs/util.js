/**
 * Created by yao on 2016/10/29.
 */
"use strict";

var fs = require('fs');
var Promise = require('bluebird');

exports.readFileAsync = function (fpth,encoding){
	return new Promise(function(resolve,reject){
		fs.readFile(fpth,encoding,function(err,content){
			if(err){
				reject(err);
			}else{
				resolve(content);
			}
		});
	});
};
exports.writeFileAsync = function (fpth,content){
	return new Promise(function(resolve,reject){
		fs.writeFile(fpth,content,function(err){
			if(err){
				reject(err);
			}else{
				resolve(content);
			}
		});
	});
};