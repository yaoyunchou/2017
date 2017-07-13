(function (angular) {
	"use strict";

	angular.module('platform').directive('nswEnter', ['$parse', '$rootScope', function ($parse, $rootScope) {
		return {
			restrict: 'A',
			compile: function ($element, attr) {
				var fn = $parse(attr.nswEnter, true);

				return function ngEventHandler(scope, element) {
					element.keydown(function (event) {
						if (event.keyCode !== 13) {
							return;
						}
						var callback = function () {
							fn(scope, {$event: event});
							event.stopPropagation();
						};
						if ($rootScope.$$phase) {
							scope.$evalAsync(callback);
						} else {
							scope.$apply(callback);
						}
					});
				};
			}
		};
	}]);
}(angular));