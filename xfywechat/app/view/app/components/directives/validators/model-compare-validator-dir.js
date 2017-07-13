/**
 * reg exp validator
 * Checking reg exp of string
 * useage
 * Validate url
 * <input type="text" nsw-regexp=''/>
 */
(function (angular) {
	"use strict";

	angular.module('platform').directive('modelCompare', [function () {
		return {
			restrict: 'A',
			require: '?ngModel',
			link: function (scope, element, attr, ctrl) {
				if (!ctrl) {
					return;
				}
				var validator = function (value) {
					var compareProp = attr.modelCompare;
					var compare = scope.$eval(compareProp);

					if (value === compare || !compare) {
						ctrl.$setValidity('modelcompare', true);
						return value;
					} else {
						ctrl.$setValidity('modelcompare', false);
						return value;
					}
				};

				ctrl.$formatters.push(validator);
				ctrl.$parsers.unshift(validator);

				var watcher = scope.$watch(attr.modelCompare, function () {
					validator(ctrl.$viewValue);
				});

				attr.$observe('modelCompare', function () {
					validator(ctrl.$viewValue);
				});

				scope.$on('$destroy', function () {
					watcher();
				});
			}
		};
	}]);
}(angular));