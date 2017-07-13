(function (angular) {
	"use strict";

	angular.module('platform').directive('nswProgressBar', [function () {

		return {
			restrict: 'A',
			require: 'ngModel',
			transclude: true,
			scope: {
				showPercentageIn: '@',
				showHintIn: '@',
				hint: '=',
				cancel: '='
			},
			template: '<div class="index-progress">' +
			'               <div class="progress" >' +
			'                   <div class="progress-bar progress-bar-success"  role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"  ng-style="style">' +
			'                      <div class="progress-content">' +
			'                          <span ng-bind="hint"></span>' +
			'                          <span ng-bind="progress"></span>' +
			'                       </div>' +
			'                   </div>' +
			'                </div>' +
			'               <div id="transclude" data-ng-transclude />' +
			'           </div>',
			link: function (scope, element, attr, ctrl) {
				ctrl.$render = function render() {
					scope.progress = ctrl.$viewValue + '%';
					var displayHintIn = parseInt(scope.showHintIn || '6');
					var displayPercentageIn = parseInt(scope.showPercentageIn || '6');
					scope.displayHint = ctrl.$viewValue >= displayHintIn && ctrl.$viewValue <= 100;
					scope.displayPercentage = ctrl.$viewValue >= displayPercentageIn && ctrl.$viewValue <= 100;
					if(ctrl.$viewValue>=100){
						$("#transclude").hide();
					}else{
						$("#transclude").show();
					}
					$('.progress-bar.progress-bar-success').css('width', scope.progress);
				};
			}
		};
	}]);

}(angular));