(function (angular) {
	"use strict";
	angular.module('platform').directive('nswCommit', [function () {
		return {
			restrict: 'A',
			link: function (scope, element, attrs) {
				var formName = attrs.nswCommit || (element.closest('form') ? element.closest('form').attr('name') : '');
				if (formName && scope[formName]) {
					element.bind('click', function () {
						scope[formName].$setPristine();
					});
				}
			}
		};
	}]);

}(angular));