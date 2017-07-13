(function (angular) {
	"use strict";

	angular.module('platform').directive('nswHref', [function () {
		return {
			restrict: 'A',
			link: function (scope, element, attrs) {
				var updateSrc = function updateSrc() {
					var fullUrlReg = /^(http|https|ftp)?:\/\//;  //jshint:ignore line
					var relateUrlReg = /^[..\\]{1}/;
					var base64 = /^data:image\//;
					var localhostReg = /^~\//;
					var wechatReg = /^(http|https|ftp)?:\/\/mmbiz/;
					var href = attrs.nswHref;


					if (!href && element[0] &&
						_.isString(element[0].tagName) &&
						element[0].tagName.toLowerCase() === 'img') {
						href = globals.defaultImg;
					}

					var isImageLib = false;
					if(href && localhostReg.test(href)){
						href = href.replace(localhostReg,globals.basAppRoot);
					}else if(href && wechatReg.test(href)){
						href = href.split('?')[0];
					} else if (href && !fullUrlReg.test(href) && !relateUrlReg.test(href) && !base64.test(href)) {
						var basPath = globals.basImagePath;
						if(attrs. nswSrcPath){
							basPath = globals[attrs.nswSrcPath];
						}
						href = basPath + href;
						isImageLib = true;
					}
					if (href) {
						if(attrs.nswSrcSize && isImageLib) {
							var index = _.lastIndexOf(href, '.');
							if(href.slice(index, href.length)!=='.gif') {
								href = href.slice(0, index) + '_' + attrs.nswSrcSize + href.slice(index, href.length);
							}
						}
						element.attr('href', href);
					}
				};
				attrs.$observe('nswHref', function () {
					updateSrc();
				});

				scope.$evalAsync(function () {
					updateSrc();
				});
			}
		};
	}]);
}(angular));