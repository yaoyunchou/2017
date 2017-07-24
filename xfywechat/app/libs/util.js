/**
 * Created by yao on 2016/10/29.
 */
"use strict";

var fs = require('fs');
var Promise = require('bluebird');

exports.readFileAsync = function (fpth, encoding) {
	return new Promise(function (resolve, reject) {
		fs.readFile(fpth, encoding, function (err, content) {
			if (err) {
				reject(err);
			} else {
				resolve(content);
			}
		});
	});
};
exports.writeFileAsync = function (fpth, content) {
	return new Promise(function (resolve, reject) {
		fs.writeFile(fpth, content, function (err) {
			if (err) {
				reject(err);
			} else {
				resolve(content);
			}
		});
	});
};
var request = require('request'),
    iconv = require('iconv-lite'),
    FeedParser = require('feedparser');
exports.fetchInfomation = function fetch(feed, typeId, service) {
	var posts;
	// Define our streams  

	var options = {
		url: feed,
		headers: {
			'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.63 Safari/537.36',
			'accept': 'text/html,application/xhtml+xml'
		}
	};
	var req = request(feed, {
		timeout: 10000,
		pool: false
	});
	req.setMaxListeners(50);
	// Some feeds do not response without user-agent and accept headers.  
	req.setHeader('user-agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.63 Safari/537.36').setHeader('accept', 'text/html,application/xhtml+xml');

	var feedparser = new FeedParser();

	// Define our handlers  
	req.on('error', done);
	req.on('response', function (res) {
		var stream = this,
		    iconv,
		    charset;
		posts = new Array();
		if (res.statusCode != 200) return this.emit('error', new Error('Bad status code'));
		charset = getUrlParam(res.headers['content-type'] || '', "charset");
		if (!iconv && charset && !/utf-*8/i.test(charset)) {
			try {
				iconv = iconv.decodeStream('utf-8');
				//iconv.on('error', done);
				stream = this.pipe(iconv);
			} catch (err) {
				this.emit('error', err);
			}
		}
		stream.pipe(feedparser);
	});

	feedparser.on('error', done);
	feedparser.on('end', function (err) {
		//console.log(posts);
		service.saveInfo(posts); //存到数据库  
	});
	feedparser.on('readable', function () {
		var post;
		while (post = this.read()) {
			posts.push(transToPost(post)); //保存到对象数组
		}
	});

	function getUrlParam(string, name) {
		var reg = new RegExp(name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
		var r = string.match(reg); //匹配目标参数
		if (r != null) return unescape(r[1]);
		return null; //返回参数值
	}

	function transToPost(post) {
		var mPost = {
			title: post.title,
			link: post.link,
			description: post.description,
			pubDate: post.pubDate,
			source: post.source,
			author: post.author,
			typeId: typeId
		};

		return mPost;
	}

	function done() {
		console.log(arguments);
	}
};
//# sourceMappingURL=util.js.map