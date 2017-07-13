(function (angular) {
	"use strict";
	angular.module('platform').directive('platformInputAutofocus', [ function () {
		return {
			restrict: 'A',
			link: function (scope, element, attrs) {
				element.focus();
			}
		};
	}]);
}(angular));