(function (angular) {
	"use strict";

	var module = angular.module('platform');
	module.directive('platformQrCode', [function () {

		return {
			restrict: 'A',
			require: 'ngModel',
			link: function (scope, element, attrs, ctrl) {
				ctrl.$render = function render() {
					if (ctrl.$viewValue) {
						var width = parseInt(attrs.width) || 150;
						var height = parseInt(attrs.height) || 150;
						element.children().remove();
						element.qrcode({text: ctrl.$viewValue, width: width, height: height});
					}
				};
			}
		};

	}]);
}(angular));