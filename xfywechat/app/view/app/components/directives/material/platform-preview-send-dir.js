/*globals*/
(function (angular) {
	"use strict";
	angular.module('platform').directive('platformPreviewSend', ['$modal', '$parse','$http', 'platformPreviewSvc',
		function ($modal, $parse,$http, platformPreviewSvc) {
			return {
				restrict: 'A',
				require: '?ngModel',
				scope:{
					information:"="
				},
				link: function (scope, element) {

					element.bind('click', function (e) {
						var options = scope.information;
						e.stopPropagation();
						platformPreviewSvc.showPreveivSendModal(options);
					});
				}
			};
		}]);

}(angular));