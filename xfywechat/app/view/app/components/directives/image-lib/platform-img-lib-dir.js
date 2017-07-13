/*globals _*/
(function (angular) {
	"use strict";
	angular.module('platform').directive('imgLib', ['$modal', '$parse', 'platformImgLibSvc','platformImageLibSvc',
		function ($modal, $parse, platformImgLibSvc,platformImageLibSvc) {
			return {
				restrict: 'A',
				require: '?ngModel',
				scope: {
					imgConfig: '=',
					imgSize: '@',
					imgWidth: '@',
					imgHeight: '@',
					ext: '@',
					nswAlt: '@',
					afterSelect: '&'
				},
				link: function (scope, element, attrs, ngModel) {
					attrs.imgLib = attrs.imgLib || 'image';

					var imgConfig = attrs.imgConfig ? $parse(scope.imgConfig)(scope) : {
						'count': 1,// 限制图片张数
						'size': parseInt(scope.imgSize || '300'),// 300,//图片大小,单位为k
						'width': parseInt(scope.imgWidth || '800'), // 800,//图片宽度
						'height': parseInt(scope.imgHeight || '800'), // 600,//图片高度
						'ext': scope.ext || 'gif,jpg,jpeg,bmp,png'//图片扩展名
					};

					if (attrs.imgLib === 'url' || attrs.imgLib === 'image') {
						imgConfig.count = 1;
					}

					if (ngModel) {
						ngModel.$render = function () {
							if (attrs.imgLib === 'url') {
								scope.image = {url: ngModel.$viewValue, alt: scope.nswAlt, fileName: scope.nswAlt};
							} else {
								scope.image = ngModel.$viewValue;
							}
						};
					}
					element.bind('click', function (e) {
						e.stopPropagation();
						//platformImageLibSvc.setFilterType('wechat');
						platformImgLibSvc.showImgLibModal(imgConfig, scope.image)
							.then(function (image) {
								if (image) {

									if (ngModel) {
										ngModel.$setViewValue(attrs.imgLib === 'url' ? image.fileId : image);
									}
									scope.afterSelect({image: image});
								}
							});
					});
				}
			};
		}]);

}(angular));