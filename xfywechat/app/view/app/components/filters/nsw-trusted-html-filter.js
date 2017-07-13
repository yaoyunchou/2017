(function (angular) {
	"use strict";
	angular.module('platform').filter('nswTrusted', ['$sce', function ($sce) {
		return function (desc) {
			desc = desc || '';
			return $sce.trustAsHtml(desc);
		};
	}]);
}(angular));