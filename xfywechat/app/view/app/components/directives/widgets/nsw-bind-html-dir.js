/*global angular
 * usage:
 *   1. create the form througth a html template
 *   <div platform-dynamic-form template="template"/>
 *
 *   2. create the form througth a templateUrl
 *   <div platform-dynamic-form templateUrl="templateUrl"/>
 * */
(function (angular) {
	"use strict";
	angular.module('platform').directive('nswBindHtml', [ function () {
		return {
			restrict: 'A',
			scope: {template: '@'},
			replace: true,
			link: function (scope, element, attrs) {
				attrs.$observe('nswBindHtml', function () {
					element.html(attrs.nswBindHtml);
				});
			}
		};
	}]);
}(angular));