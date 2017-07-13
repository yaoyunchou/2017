/*global module*/
(function () {
	"use strict";

	var exportObj;
	if (typeof exports === 'undefined') {
		exportObj = window;
	} else {
		exportObj = module.exports;
	}
	var appRoot = 'http://localhost/wx/';
	//when the location is invalid, replace it with the default location.


	if (exportObj.location) {
		var paths = window.location.pathname.split('/');
		paths.length = paths.length -2;
		appRoot = window.location.protocol + '//' + window.location.hostname + paths.join('/')+'/';
		//appRoot = window.location.origin + '/wx/';
	}
	exportObj.globals = {
		basAppRoot: appRoot,
		basAppRoute: appRoot + 'app/',
		basFilePath: 'http://192.168.4.160:8080/',
		basImagePath: 'http://weixindev.51yxwz.com/',
		basImageDomain:'weixindev.51yxwz.com',
		cmsImagePath: 'http://obdt9tuqa.bkt.clouddn.com/',
		defaultImg: appRoot + 'app/components/content/images/nsw.png',
		imageUrl: 'material/image/upload?appId=@appId',
		menuSrc: 'user/menu',
		debug: true,
		spaMode: true
	};

	/*扩展date原型方法*/
	Date.prototype.format = function format(fmt)
	{ //author: meizz
		var o = {
			"M+" : this.getMonth()+1,                 //月份
			"d+" : this.getDate(),                    //日
			"h+" : this.getHours(),                   //小时
			"m+" : this.getMinutes(),                 //分
			"s+" : this.getSeconds(),                 //秒
			"q+" : Math.floor((this.getMonth()+3)/3), //季度
			"S"  : this.getMilliseconds()             //毫秒
		};
		if(/(y+)/.test(fmt)){
			fmt = fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
		}

		for(var k in o){
			if(new RegExp("("+ k +")").test(fmt)){
				fmt = fmt.replace(RegExp.$1, (RegExp.$1.length===1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
			}

		}


		return fmt;
	};

}());
