'use strict';

var _fs = require('fs');

var _config = require('../config');

var _jsdom = require('jsdom');

var _jsdom2 = _interopRequireDefault(_jsdom);

var _testMongoDB = require('../mongoDB/testMongoDB');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*function EditerTpl({imgLg,htmlContent, imgSm, ctgId, projType, title, name, isDeleted, desc, lastUpdTime, createdTime, owner, site}) {
	this.imgLg = imgLg || '';
	this.htmlContent = htmlContent || '';
	this.imgSm = imgSm || '';
	this.ctgId = ctgId || '';
	this.projType = projType || '';
	this.title = title || '';
	this.name = name || '';
	this.isDeleted = isDeleted || '';
	this.desc = desc || '';
	this.lastUpdTime = lastUpdTime || '';
	this.createdTime = createdTime || '';
	this.owner = owner || '';
	this.site = site || '';
}*/

var EditorTpl = function EditorTpl(_ref) {
	var imgLg = _ref.imgLg,
	    htmlContent = _ref.htmlContent,
	    imgSm = _ref.imgSm,
	    ctgId = _ref.ctgId,
	    projType = _ref.projType,
	    title = _ref.title,
	    name = _ref.name,
	    isDeleted = _ref.isDeleted,
	    desc = _ref.desc,
	    lastUpdTime = _ref.lastUpdTime,
	    createdTime = _ref.createdTime,
	    owner = _ref.owner,
	    site = _ref.site;

	_classCallCheck(this, EditorTpl);

	this.imgLg = imgLg || '';
	this.htmlContent = htmlContent || '';
	this.imgSm = imgSm || '';
	this.ctgId = ctgId || '';
	this.projType = projType || '';
	this.title = title || '';
	this.name = name || '';
	this.isDeleted = isDeleted || '';
	this.desc = desc || '';
	this.lastUpdTime = lastUpdTime || '';
	this.createdTime = createdTime || '';
	this.owner = owner || '';
	this.site = site || '';
};

var getHtmlFiles = function getHtmlFiles(filePath) {
	var htmlFilesPath = [];
	return new Promise(function (resolve, reject) {
		(0, _fs.readdir)(filePath, function (err, files) {
			if (err) {
				console.log('read dir fail');
				reject('read dir fail');
			} else {
				files.forEach(function (val) {

					if (val.search(/.html/ig) > 0) {
						//console.log(val);
						htmlFilesPath.push({ path: filePath + '\\' + val, fileName: val });
						///console.log(htmlFilesPath);
					}
				});
				resolve(htmlFilesPath);
			}
		});
	});
};
var getHtmlDocument = function getHtmlDocument() {
	var htmlDocs = [];
	return new Promise(function (resolve, reject) {
		getHtmlFiles(_config.fileConfig.path).then(function (htmlFiles) {
			htmlFiles.forEach(function (val) {
				_jsdom2.default.env(val.path, function (err, window) {
					if (err) {
						reject("fail");
					} else {
						var htmlContent = '<div class="response-blk">' + window.document.body.innerHTML.replace(/\n/g, '').replace(/\t/g, '') + '</div>';
						htmlContent = htmlContent.replace('/images\//g', '"http://template.51yxwz.com\/');
						var templat = new EditorTpl({
							desc: val.fileName,
							title: window.document.title,
							name: window.document.title,
							htmlContent: htmlContent
						});
						//console.log(templat)
						htmlDocs.push(templat);
						resolve(htmlDocs);
						resolve(htmlDocs);
					}
				});
			});
		});
	});
};

getHtmlDocument().then(function (htmlDocs) {
	(0, _testMongoDB.insertDocuments)(htmlDocs, 'yao');
});