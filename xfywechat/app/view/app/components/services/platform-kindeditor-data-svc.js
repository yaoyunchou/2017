(function (angular) {
	"use strict";

	angular.module('platform').factory('platformKindEditorDataSvc',
		['nswmultiimagePluginSvc', 'spechartsPluginSvc', 'selectmodularPluginSvc', 'nswPreviewPluginSvc', 'reformatPluginSvc', 'nswPreviewPhonePluginSvc', 'nswimagePluginSvc',
			function (nswmultiimagePluginSvc, spechartsPluginSvc, selectmodularPluginSvc, nswPreviewPluginSvc, reformatPluginSvc, nswPreviewPhonePluginSvc, nswimagePluginSvc) {
				var service = {}, index = 0;

				service.wcItems = ['source','emoticons', 'undo', 'redo', 'plainpaste', 'wordpaste', 'clearhtml', 'reformat', 'selectall', 'fullscreen',
					'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold', 'italic', 'underline', 'hr', 'removeformat', '|', 'justifyleft',
					'justifycenter', 'justifyright', 'insertorderedlist', 'insertunorderedlist',
					'|', 'nswimage', 'link', 'unlink'];
				service.simpleItems = ['source', '|', 'undo', 'redo', '|', 'bold', 'italic', 'underline', '|', 'forecolor', 'hilitecolor', 'fontname', 'fontsize',
					'|', 'justifyleft', 'justifycenter', 'justifyright', 'justifyfull', 'link', 'fullscreen', '|', 'clearhtml', 'reformat'];
				service.complexItems = ['source', '|', 'selectmodular', '|', 'undo', 'redo', '|', 'cut', 'copy', 'paste',
					'plainpaste', 'wordpaste', '|', 'justifyleft', 'justifycenter', 'justifyright',
					'justifyfull', 'insertorderedlist', 'insertunorderedlist', 'indent', 'subscript',
					'superscript', 'clearhtml', 'reformat', 'selectall', 'fullscreen', '/',
					'formatblock', 'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold',
					'italic', 'underline', 'strikethrough', 'lineheight', 'removeformat', '|', 'nswmultiimage',
					'flash', 'media', 'insertfile', 'table', 'hr', 'emoticons', 'baidumap', 'pagebreak',
					'anchor', 'link', 'unlink', '|', 'spechars', '|', 'nswpreview', 'nswpreviewphone'
				];
				service.htmlTags = {
					font: ['color', 'size', 'face', '.background-color', 'class'],
					span: ['style', 'class', 'id', 'onclick'],
					div: ['class', 'align', 'style', 'id', 'data-src', 'fn'],
					table: ['class', 'border', 'cellspacing', 'cellpadding', 'width', 'height', 'align', 'style', 'align', 'bgcolor', 'id', 'frame', 'rules', 'summary'],
					'td,th': ['class', 'align', 'valign', 'width', 'height', 'colspan', 'rowspan', 'bgcolor', 'style', 'id'],
					a: ['class', 'href', 'target', 'name', 'style', 'title', 'id', 'onclick'],
					'img,section': ['src', 'width', 'height', 'id', 'border', 'alt', 'title', 'align', 'style', 'class', 'templocation', 'sid', "columns", "cssname", "orderby", "sqlwhere", "columnname", "columnnameurl", "selectcount", 'controltype', 'datatype', 'controid', 'cwidth', 'cheight', 'oid', '/', 'onclick'],
					hr: ['class', '/'],
					br: ['/'],
					'p,ol,ul,li,blockquote,h1,h2,h3,h4,h5,h6': ['align', 'style', 'class', 'id', 'onclick'],
					'strong,b,sub,sup,em,i,u,strike,tr': ['style', 'class', 'id'],
					dl: ['class', 'style', 'id'],
					dt: ['class', 'style', 'id'],
					dd: ['class', 'style', 'id'],
					ul: ['class', 'style', 'id', 'data-src', 'fn'],
					li: ['class', 'style', 'id'],
					iframe: ['src', 'width', 'height', 'style', 'frameborder', 'data-ke-src', 'class'],
					style: ['type', 'oid'],
					script: ['src', 'type', 'oid'],
					//针对视频
					object: ['codebase', 'classid', 'width', 'height'],
					param: ['name', 'value'],
					embed: ['src', 'allowfullscreen', 'loop', 'style', 'autostart', 'flashvars', 'quality', 'pluginspage', 'type', 'width', 'height', 'wmode', 'align', 'allowscriptaccess']
				};
				service.colorTable = [
					['#000000', '#E56600', '#64451D', '#DFC5A4', '#FFE500', '#009900', '#006600', '#99BB00'],
					['#337FE5', '#003399', '#4C33E5', '#9933E5', '#CC33E5', '#EE33EE', '#666666', '#6666ff'],
					['#E53333', '#993300', '#333300', '#003300', '#003366', '#000080', '#333399', '#333333'],
					['#800000', '#FF6600', '#808000', '#008080', '#0000FF', '#666699', '#CCFFFF', '#CCFFCC'],
					['#FF0000', '#FF9900', '#99CC00', '#339966', '#33CCCC', '#3366FF', '#800080', '#99CCFF'],
					['#FF00FF', '#FFCC00', '#FFFF00', '#00FF00', '#00FFFF', '#00CCFF', '#993366', '#CC99FF'],
					['#FF99CC', '#FFCC99', '#FFFF99', '#808080', '#999999', '#C0C0C0', '#CCCCCC', '#FFFFFF']
				];
				service.layout = '<div class="container">' +
					'       <div class="other container_top dn"></div>' +
					'       <div class="tab container_top dn"></div>' +
					'       <div class="reversals dn"></div>' +
					'       <div class="toolbar"></div>' +
					'       <div class="edit"></div>' +
					'       <div class="position container_bottom"></div>' +
					'       <div class="btns container_bottom dn"></div>' +
					'       <div class="statusbar"></div>' +
					'   </div>';

				service.getUUID = function getUUID() {
					return String(new Date().getTime()) + index++;
				};

				nswmultiimagePluginSvc.init();
				spechartsPluginSvc.init();
				selectmodularPluginSvc.init();
				nswPreviewPluginSvc.init();
				reformatPluginSvc.init();
				nswPreviewPhonePluginSvc.init();
				nswimagePluginSvc.init();
				return service;
			}]);

}(angular));