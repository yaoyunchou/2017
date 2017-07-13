(function (angular) {
	"use strict";
	angular.module('platform').directive('platformNswMaterial', [ function () {
		return {
			restrict: 'A',
			scope:{
				material:'=',
				remove:'&',
				edit:'&'
			},
			templateUrl:globals.basAppRoute + 'components/templates/platform-nsw-material-dir.html'

		};
	}]);

}(angular));