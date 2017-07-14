/**
 * Created by yaoyc on 2016/5/9.
 */
"use strict";

var globals = require('../view/app/main/globals.js').globals;

var root = '../view/';
var plugin = root + 'plugins/';
module.exports = {
	'root': root,
	'basUrl': globals.basAppRoot,
	'plugins': {
		frames: [
			'jquery/jquery-1.*.*.js',
			'jquery/jquery-ui.js',
			'jquery/*.js',
			'angular/angular.js',
			'angular/*.js'
		],
		tools: [
			'lodash/*.js',
			'bootstrap/bootstrap.min.js',
			'bootstrap/ui-bootstrap-tpls-0.12.1.js',
			'bootstrap/pagination.js',
			'bootstrap/moment.js',
			'bootstrap/daterangepicker.js',
			'ngStorage/ngStorage.js',
			"webuploader/*.js",
			'uploader/moxie.js',
			'uploader/plupload.dev.js',
			'uploader/zh_CN.js',
			'uploader/qiniu.js',
			'kindeditor/kindeditor-all.js',
			'echarts/echarts.js',
			'emoji/emoji.js'
		],
		css: [
			'jquery/*.css',
			'jquery/**/*.css',
			'angular/*.css',
			'angular/**/*.css',
			'*.css',
			'**/*.css'
		]
	},
	programs: {
		modules: [
			'main',
			'components',
			'account',
			'materials',
			'menus',
			'auto-reply',
			'member',
			'mass-message',
			'message',
			'qr-code',
			'message-template'
		], sorter: [
			'globals.js',
			'*.js',
			'components/*.js',
			'components/**/*.js',
			'services/*.js',
			'services/**/*.js',
			'filters/**/*.js',
			'controllers/*.js',
			'controllers/**/*.js',
			'directives/*.js',
			'directives/**/*.js',
			'**/*.js'
		], css: [
			'content/css/*.css'
		]
	},
	'debug': false
};

/*
 search  //搜索
 content //整个网站的字体颜色
 contentBg //
 hTitle 一级标题
 listTitle
 sideNav 副导航
 breadcrumb面包削
 activedBreadcrumb... //当前的面包削
 detailPreReading 详情页文章导读
 relatedTitle,relatedTitleBg    相关的标题、明细文章选中的大中小
 keywords    关键字
 relatedArticle 相关文章 上一篇，下一篇
 detailALink 详细里面A链接的颜色
 recommendTitle,recommendTitleBg  推荐的标题

 * */