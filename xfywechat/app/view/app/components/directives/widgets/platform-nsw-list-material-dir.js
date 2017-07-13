(function (angular) {
	"use strict";
	angular.module('platform').directive('platformNswListMaterial', [ function () {
		return {
			restrict: 'A',
			scope:{
				material:'=',
				remove:'&',
				edit:'&'
			},
			templateUrl:globals.basAppRoute + 'components/templates/platform-nsw-list-material-dir.html'
		};
	}]);

}(angular));