(function (angular) {
	"use strict";
	angular.module('platform').directive('nswLazyscroll', [function () {
		return {
			restrict:'A',
			link:function(scope, element, attrs){
				var step = parseInt(attrs.step)||1, currentStep = parseInt(attrs.currentStep) || 0;
				var onScroll =function onScroll(){
					var scroll = element.scrollTop();
					var scrollStep = parseInt((scroll / step)) + ((scroll % step) > 0 ? 1 : 0);
					if (scrollStep !== currentStep && attrs.nswStepChange) {
						scope.$eval(attrs.nswStepChange).call(this, {target: element, step: step, current: scrollStep});
						currentStep = scrollStep;
						scope.$digest();
					}
				};

				attrs.$observe('count',function(val){
					$(element.find('.step-target')).height(step * val);
				});

				element.scroll(onScroll);
			}
		};
	}]);
}(angular));