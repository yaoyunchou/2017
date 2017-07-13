(function (angular) {
	"use strict";

	angular.module('platform').directive('nswBg', [function () {
		return {
			restrict: 'A',
			link: function (scope, element, attrs) {
				var updateSrc = function updateSrc() {
					var fullUrlReg = /^(http|https|ftp)?:\/\//;  //jshint:ignore line
					var relateUrlReg = /^[..\\]{1}/;
					var base64 = /^data:image\//;
					var localhostReg = /^~\//;
					var wechatReg = /^(http|https|ftp)?:\/\/mmbiz/;
					var src = attrs.nswBg;
					var baseImg = false;


					if (!src) {
						src = globals.defaultImg;
						baseImg = true;
					}

					var isImageLib = false;
					if(src && localhostReg.test(src)){
						src = src.replace(localhostReg,globals.basAppRoot);
						baseImg = false;
					}else if(src && wechatReg.test(src)){
						src = src.split('?')[0];
						baseImg = false;
					} else if (src && !fullUrlReg.test(src) && !relateUrlReg.test(src) && !base64.test(src)) {
						var basPath = globals.basImagePath;
						if(attrs. nswSrcPath){
							basPath = globals[attrs.nswSrcPath];
						}
						src = basPath + src;
						isImageLib = true;
						baseImg = false;
					}
					if (src) {
						if(attrs.nswSrcSize && isImageLib) {
							var index = _.lastIndexOf(src, '.');
							src = src.slice(0,index) + '_'+attrs.nswSrcSize + src.slice(index, src.length);
						}
						if(baseImg){
							element.css({'backgroundImage': 'url(\"'+src+'\")','backgroundSize':'100% 100%','backgroundPosition':'0 0 '});
						}else{
							element.css({'backgroundImage': 'url(\"'+src+'\")','backgroundSize':'cover'});
						}

					}
				};
				attrs.$observe('nswBg', function () {
					updateSrc();
				});

				scope.$evalAsync(function () {
					updateSrc();
				});
			}
		};
	}]);
}(angular));