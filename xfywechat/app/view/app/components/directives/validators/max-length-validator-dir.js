/**
 * reg exp validator
 * Checking reg exp of string
 * useage
 * Validate url
 * <input type="text" nsw-regexp=''/>
 */
(function (angular) {
	"use strict";

	angular.module('platform').directive("nswMaxLength",[function(){
			return{
				restrict:'A',
				require:'?ngModel',
				link:function(scope,element,attr,ctrl){
					if(!ctrl){
						return;
					}
					var validator = function (value){
						value = value ||'';
						var nswMaxLength = parseInt(attr.nswMaxLength)|| 0;
						var totalCount =0;
						for(var i=0; i<value.length; i++){
							var c = value.charCodeAt(i);
							if ((c >= 0x0001 && c <= 0x007e) || (0xff60<=c && c<=0xff9f)){
								totalCount++;
							}
							else{
								totalCount+=2;
							}
						}
						if(nswMaxLength===0||totalCount<=nswMaxLength){
							ctrl.$setValidity('nswmaxlength',true);
							return value;
						}else{
							ctrl.$setValidity('nswmaxlength',false);
							return value;
						}
					};
					ctrl.$formatters.push(validator);
					ctrl.$parsers.unshift(validator);
					attr.$observe('nswMaxLength', function () {
						validator(ctrl.$viewValue);
					});
				}
			};

	}]);
}(angular));