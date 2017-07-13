/**
 * Created by yaoyc on 2016/1/26.
 */
(function (angular) {
	"use strict";
	angular.module('platform').directive('beyond', function () {
		return {
			restrict: 'ACE',
			replace: true,
			link: function (scope, element) {
				//TODO 临时解决方案
				var inputElement = $(element.find('.form-control[ng-model],.form-control[data-ng-model],.editor[ng-model],.editor[data-ng-model]')[0]);
				var inputNgModel = inputElement.data('$ngModelController');
				if (inputNgModel) {
					var updateDisplay  = function updateDisplay(){
						var o = inputNgModel.$viewValue;
						//if(typeof o ==="string"){
						//	o = o.replace(/\r\n/g,"n")
						//	o = o.replace(/\n/g,"n");
						//}
						element.find('.mess-zx').html(o && o.length?o.length:0);
						if(!scope.$root.$$phase) {
							scope.$apply();
						}
					};

					scope.$evalAsync(function () {
						var render = inputNgModel.$render;
						inputNgModel.$render = function $render() {
							render.apply(this, arguments);
							updateDisplay();
						};
						updateDisplay();
					});

					inputElement.on('keyup',function(){
						updateDisplay();
					});
					inputNgModel.$viewChangeListeners.push(updateDisplay);
				}
				//var tureLength = function tureLength(data){
				//	var totalCount = 0;
				//	for(var i=0; i<data.length; i++){
				//		var c = data.charCodeAt(i);
				//		if ((c >= 0x0001 && c <= 0x007e) || (0xff60<=c && c<=0xff9f)){
				//			totalCount++;
				//		}
				//		else{
				//			totalCount+=2;
				//		}
				//	}
				//	return totalCount;
				//};
			}
		};
	});
}(angular));