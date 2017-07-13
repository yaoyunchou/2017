(function (angular) {
	"use strict";

	angular.module('platform').directive('nswUserValidator', [function () {
		return {
			restrict: 'A',
			require: '?ngModel',
			link: function (scope, element, attr, ctrl) {
				if (!ctrl) {
					return;
				}
				var validator = function (value) {
					var result = scope.$eval(attr.nswUserValidator).call(this, value);
					var name = attr.validatorName;

					if (result) {
						ctrl.$setValidity(name, true);
						return value;
					} else {
						ctrl.$setValidity(name, false);
						return value;
					}
				};

				ctrl.$formatters.push(validator);
				ctrl.$parsers.unshift(validator);
			}
		};
	}]);
}(angular));