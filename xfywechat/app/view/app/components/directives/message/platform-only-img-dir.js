(function (angular) {
	"use strict";

	angular.module('platform').directive('platformOnlyImg', [function () {
		return {
			restrict: 'A',
			templateUrl: globals.basAppRoute + 'components/templates/modals/platform-olny-img.html'
		};
	}]);
}(angular));