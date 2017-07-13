(function (angular) {
	"use strict";

	angular.module('platform').directive('platformImgText', [function () {
		return {
			restrict: 'A',
			templateUrl: globals.basAppRoute + 'components/templates/modals/platform-img-text.html'
		};
	}]);
}(angular));