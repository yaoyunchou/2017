/**
 * Created by yao on 2016/10/29.
 */
/*global exports*/
"use strict";
var xml2js = require('xml2js');
var Promise = require('bluebird');
var _ = require('lodash');
var template = require('./template');
exports.parseXMLAsync = function(xml){
	console.log('this is before xml2js'+xml);
	return new Promise(function (resolve,reject){
		xml2js.parseString(xml,{trim:true},function(err,content){
			if(err){
				reject(err);
			}else{
				resolve(content);
			}
		});
	});
};

var formatMessage = function formatMessage(result){
	var message = {};
	if(typeof  result === 'object'){
		var keys = Object.keys(result);
		_.forEach(keys,function(val){
			var item = result[val];
			var key = val;
			if(!(item instanceof Array)|| item.length === 0){
				return;
			}
			if(item.length ===1 ){
				var val = item[0];
				if(typeof  val === 'object'){
					message[key] = formatMessage(val);
				}else{
					message[key] = (val||'').trim();
				}
			}else{
				message[key] = [];
				_.forEach(item,function(){
					message[key].push(formatMessage(item));
				});
			}
		});
	}
	return message;
};

exports.formatMessage = formatMessage;

exports.tpl = function tpl(content,message){
	var info = {};
	var type = 'text';
	var formUserName,toUsername;
	if(message){
		formUserName = message.FromUserName||'';
		toUsername = message.ToUserName||'';
	}


	if(content){
		type = content.type||type;
		if(content instanceof Array){
			type = 'news';
		}
	}
	info.content = content;
	info.createTime = new Date().getTime();
	info.msgType = type;
	info.toUserName = toUsername ||'';
	info.formUserName = formUserName||'';
	return template.compiled(info);
};