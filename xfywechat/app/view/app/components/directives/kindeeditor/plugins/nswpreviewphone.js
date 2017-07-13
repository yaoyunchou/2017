/*globals KindEditor*/
(function (angular, undefined) {
	"use strict";

	angular.module('platform').factory('nswPreviewPhonePluginSvc', [function () {
		var service = {};
		service.init = function init() {
			KindEditor.plugin('nswpreviewphone', function (K) {
				var self = this, name = 'nswpreviewphone';

				self.lang({
					'nswpreviewphone': '手机预览'
				});

				self.clickToolbar(name, function () {
					var html = '<div style="padding:10px 20px;" class="phone-box">' +
							'<iframe class="ke-textarea" frameborder="0" style="width:320px;height:480px;"></iframe>' +
							'</div>',
						dialog = self.createDialog({
							name: name,
							width: 350,
							title: self.lang(name),
							body: html
						}),
						iframe = K('iframe', dialog.div),
						doc = K.iframeDoc(iframe);
					doc.open();
					doc.writeln('<base href="'+globals.basImagePath+'">');
					doc.writeln('<link href="'+globals.basAppRoute+'components/content/css/kindeditor/kind-editor-reset.css" rel="stylesheet">');
					doc.write(self.fullHtml());
					doc.close();
					K(doc.body).css('background-color', '#FFF');
					iframe[0].contentWindow.focus();
				});
			});
		};
		return service;
	}]);
}(angular, undefined));
