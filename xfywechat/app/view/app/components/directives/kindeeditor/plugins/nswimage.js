/*globals KindEditor, _*/
(function (angular) {
	"use strict";

	angular.module('platform').factory('nswimagePluginSvc', ['platformImgLibSvc', 'nswGlobals', '$rootScope', function (platformImgLibSvc, nswGlobals, $rootScope) {
		var service = {};
		service.init = function init() {
			KindEditor.plugin('nswimage', function () {
				var self = this, name = 'nswimage', attrs = null;

				self.lang({
					'nswimage': '从图片库中选择图片'
				});

				var appendImage = function appendImage(image) {
					var url = image.fileId;
					if (!/^[http|https]/g.test(image.fileId)) {
						url = globals.basImagePath + url;
					}

					var img = window.KindEditor('<img/>');
					img.attr('src', url);
					img.attr('data-ke-src', url);
					img.attr('title', (image.name || image.fileName));
					img.attr('alt', (image.name || image.fileName));
					img.attr('width', 320);

					var p = window.KindEditor('<p></p>');
					p.css('text-indent', '0px');
					p.css('text-indent', '0px');
					p.css('padding-top', '14px');
					p.css('margin', '0px');
					p.css('text-align', image.align);

					p.append(img);
					if (attrs) {
						p.attr(attrs);
					}
					self.cmd.range.insertNode(p[0]);
				};

				var updateDisplay = function updateDisplay(img, doc) {
					attrs = null;
					appendImage(img);
					self.sync();//同步数据
					KindEditor(doc).fire('mouseup');
				};

				var showImageDialog = function showImageDialog(doc) {
					return platformImgLibSvc.showImgLibModal({
							count: 1,
							size: 300,
							width: 800,
							height: 800,
							ext: 'gif,jpg,jpeg,bmp,png'
						})
						.then(function (image) {
							updateDisplay(image, doc);
							setTimeout(function () {
								$rootScope.$apply();
							});
						});
				};

				self.plugin.nswmultiimage = {
					edit: function () {
						showImageDialog($(this.container[0]).find('iframe')[0].contentDocument);
					}
				};

				self.clickToolbar(name, self.plugin.nswmultiimage.edit);
			});
		};
		return service;
	}]);
}(angular));