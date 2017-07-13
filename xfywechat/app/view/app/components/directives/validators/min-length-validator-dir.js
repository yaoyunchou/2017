/**
 * reg exp validator
 * Checking reg exp of string
 * useage
 * Validate url
 * <input type="text" nsw-regexp=''/>
 */
(function (angular) {
	"use strict";

	angular.module('platform').directive("nswMinLength",[function(){
			return{
				restrict:'A',
				require:'?ngModel',
				link:function(element,scope,attr,ctrl){
					if(!ctrl){
						return;
					}
					var truelength = 0;

					var synchronize = function synchronize(){
						if(attr.synchronize){
							element.parent().sblings('.mess-zx').html(truelength?truelength:0);
						}
					};
					var validator = function (value){
						var nswMinLength = parseInt(attr.nswMinLength)|| 0;
						var totalCount =0;
						value = value ||'';
						for(var i=0; i<value.length; i++){
							var c = value.charCodeAt(i);
							if ((c >= 0x0001 && c <= 0x007e) || (0xff60<=c && c<=0xff9f)){
								totalCount++;
							}
							else{
								totalCount+=2;
							}

						}
						truelength = totalCount;
						if(truelength===0||totalCount>=nswMinLength){
							ctrl.$setValidity('nswminlength',true);
							return value;
						}else{
							ctrl.$setValidity('nswminlength',false);
						}
					};
					ctrl.$formatters.push(validator);
					ctrl.$parsers.unshift(validator);

					attr.$observe('nswminlength', function () {
						validator(ctrl.$viewValue);
					});
				}
			};

		}]);
}(angular));