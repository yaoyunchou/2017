/*global Emoji*/
(function (angular) {
	"use strict";
	angular.module('platform').filter('nswEmoji', [ function () {
		return function (desc, size, isByte) {
			desc = desc || '';
			return Emoji.trans(desc);
		};
	}]);
}(angular));