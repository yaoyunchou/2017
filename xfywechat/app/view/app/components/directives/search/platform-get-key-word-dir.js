(function (angular) {
	"use strict";

	angular.module('platform').directive('getKeyWord', [function () {
		return {
			restrict: 'A',
			scope:{
				keyWord:'='
			},
			require:'ngModel',
			link: function (scope, element,attrs,ctrl) {

				ctrl.$render = function render(){
					var html = ctrl.$viewValue.toString();
					if(scope.keyWord){
						var keyWordReg = new RegExp(scope.keyWord, "ig");
						html = html.replace(keyWordReg, "<font color='red'>"+scope.keyWord+"</font>");
					}

					element.html(html);
				};
			}
		};
	}]);

}(angular));