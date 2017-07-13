/*globals KindEditor*/
(function (angular, undefined) {
	"use strict";

	angular.module('platform').factory('nswPreviewPluginSvc', [function () {
		var service = {};
		service.init = function init() {
			KindEditor.plugin('nswpreview', function (K) {
				var self = this, name = 'nswpreview';

				self.lang({
					'nswpreview': 'PC预览'
				});

				self.clickToolbar(name, function () {
					var html = '<div style="padding:10px 20px;">' +
							'<iframe class="ke-textarea" frameborder="0" style="width:100%;height:550px;"></iframe>' +
							'</div>',
						dialog = self.createDialog({
							name: name,
							width: '80%',
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
