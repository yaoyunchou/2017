(function (angular) {
	"use strict";

	angular.module('platform').directive('nswStatusButton',[function(){
		return {
			restrict:'A',
			replace:false,
			scope:true,
			require:'ngModel',
			templateUrl:globals.basAppRoute + 'components/templates/platform-nsw-status-button-dir.html',
			link:function(scope,element,attrs,ctrl){
				scope.isChecked = !!ctrl.$viewValue;
				ctrl.$render = function $render(){
					scope.isChecked = !!ctrl.$viewValue;
				};

				scope.onClick = function onClick(e){
					e.stopPropagation();
					if(element.attr('disabled')){
						return;
					}

					scope.isChecked = !scope.isChecked;
					ctrl.$setViewValue(scope.isChecked);


					if(attrs.ngClick){
						scope.$parent.$eval(attrs.ngClick);
					}
				};
			}
		}
	}]);
}(angular));