(function (angular) {
	"use strict";

	angular.module('platform').directive('platformInput', [function () {
		return {
			restrict: 'A',
			require: '?ngModel',
			template: '<input type="{{type}}" class="form-control nsw-form-input col-lg-8" data-ng-change="changed()" ng-model="model" autocomplete="off" ><span data-ng-hide="hideCounter" data-ng-bind="countTip"></span>',
			link: function (scope, element, attr, ctr) {
				scope.type = attr.type;
				scope.hideCounter = !attr.ngMaxlength;
				ctr.$render = function render() {
					scope.model = ctr.$viewValue;
					updateTip();
				};

				scope.changed = function changed() {
					ctr.$setViewValue(scope.model);
					updateTip();
				};

				var updateTip = function updateTip(){
					var length = scope.model ? scope.model.length : 0;
					scope.countTip = length + '/' + attr.ngMaxlength+'字符';
				};
			}
		};
	}]);
}(angular));