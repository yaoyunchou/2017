/*globals KindEditor, _*/
(function (angular) {
	"use strict";

	angular.module('platform').factory('nswmultiimagePluginSvc', ['platformModalSvc','nswGlobals', function (platformModalSvc,nswGlobals) {
		var service = {};
		service.init = function init() {
			KindEditor.plugin('nswmultiimage', function () {
				var self = this, name = 'nswmultiimage', attrs = null;

				self.lang({
					'nswmultiimage': '批量图片上传'
				});

				var appendImage = function appendImage(image) {
					self.exec('insertimage', image.url, image.fileName, null, null, null, null, null);
					var img = self.cmd.commonNode({img: "*"});
					var p = img.parent();

					while (p && p.name) {
						if (p.name === 'body' || p.name === 'p') {
							break;
						}
						p = p.parent();
					}


					if ((!p || p.name !== "p")) {
						img.after('<p></p>');
						p = img.next();
						p.append(img);
						if (attrs) {
							p.attr(attrs);
						}
						p.css("text-indent", '0px');
						p.css("text-align", image.align);
					}

					if (p) {
						if (attrs === null) {
							attrs = p.attr();
						}
						img.after('<p class="image-holder" style="display: none">HOLDER</p>');
						var holder = img.next();
						self.cmd.range.selectNode(holder[0]);
					}

				};

				var updateDisplay = function updateDisplay(imgList, doc) {
					attrs = null;
					_.forEach(imgList, appendImage);
					while(KindEditor.query('.image-holder',doc)){
						KindEditor.query('.image-holder',doc).remove();
					}
				};

				var showImageDialog = function showImageDialog(doc) {
					return platformModalSvc.showModal({
						templateUrl: globals.basAppRoot + '/partials/imglibWin.html',
						controller: 'imglibWinCtrl',
						size: 'lg',
						options: {
							showAlign: true,
							imgConfig: {
								'count': 15,
								'size': 3000,
								'width': 800,
								'height': 600,
								'ext': 'gif,jpg,jpeg,bmp,png'
							},
							backImgList: []
						}
					}).then(function (imgList) {
						updateDisplay(imgList, doc);
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