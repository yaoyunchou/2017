/*global angular*/
/**
 * author: liang can lun
 * date: 2015-12-7
 */
(function (angular) {
	"use strict";

	var module = angular.module('platform');
	module.directive('platformModalTransclude', [
		function () {
			return {
				restrict: 'A',
				templateUrl: globals.basAppRoute + 'components/templates/platform-modal-dir.html'
			};
		}]);
}(angular));