/*globals*/
(function (angular) {
	"use strict";
	angular.module('platform').directive('platformPreview', ['$modal', '$parse','$http', 'platformPreviewSvc',
		function ($modal, $parse,$http, platformPreviewSvc) {
			return {
				restrict: 'A',
				require: '?ngModel',
				scope:{
					information:"=",
					infoType:'='
				},
				link: function (scope, element) {

					element.bind('click', function (e) {
						var options ;
						if(scope.information.articles&&scope.information.articles.length===1){
							scope.information.articles[0].digest = window.deletHtmlTag(scope.information.articles[0].content.replace(/&nbsp;/ig,' ')).slice(0, 54);
							options = scope.information;
						}else{
							options = scope.information;
						}

						var type = scope.infoType||'';
						e.stopPropagation();
						platformPreviewSvc.showPreveivModal(options,type);
								//.then(function (image) {
								//	//if (image) {
								//	//	if (ngModel) {
								//	//		ngModel.$setViewValue(image);
								//	//	}
								//	//	scope.afterSelect({image: image});
								//	//}
								//});
					});
				}
			};
		}]);

}(angular));