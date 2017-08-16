import {readdir, readFile} from 'fs';
import {fileConfig} from '../config';
import jsdom from 'jsdom';
import  {insertDocuments, findDocuments, updateDocument} from '../mongoDB/testMongoDB';


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

class EditorTpl{
	constructor({imgLg,htmlContent, imgSm, ctgId, projType, title, name, isDeleted, desc, lastUpdTime, createdTime, owner, site}){
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
	}
}


var getHtmlFiles = function getHtmlFiles(filePath) {
	var htmlFilesPath = [];
	return new Promise(function (resolve, reject) {
		readdir(filePath, function (err, files) {
			if (err) {
				console.log('read dir fail');
				reject('read dir fail');
			} else {
				files.forEach(function (val) {
					
					if (val.search(/.html/ig) > 0) {
						//console.log(val);
						htmlFilesPath.push({path:filePath + '\\' + val,fileName:val});
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
		getHtmlFiles(fileConfig.path).then((htmlFiles)=> {
			htmlFiles.forEach(function (val) {
				jsdom.env(val.path,
					function (err, window) {
						if (err) {
							reject("fail");
						} else {
							var htmlContent ='<div class="response-blk">' + window.document.body.innerHTML.replace(/\n/g,'').replace(/\t/g,'') + '</div>';
							htmlContent = htmlContent.replace('/images\//g','"http://template.51yxwz.com\/');
							var templat = new EditorTpl({
								desc: val.fileName,
								title: window.document.title,
								name: window.document.title,
								htmlContent:htmlContent
							});
							//console.log(templat)
							htmlDocs.push(templat);
							resolve(htmlDocs);
							resolve(htmlDocs);
						}
						
					}
				);
			});
		});
	});
	
};


getHtmlDocument().then(function (htmlDocs) {
	htmlDocs.forEach(function(){
		
	});
	insertDocuments(htmlDocs, 'yao');
});
	
