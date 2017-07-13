/**
 * reg exp validator
 * Checking reg exp of string
 * useage
 * Validate url
 * <input type="text" nsw-regexp=''/>
 */
(function (angular) {
	"use strict";

	angular.module('platform').directive('maxWord', [function () {
		return {
			restrict: 'A',
			require: '?ngModel',
			link: function (scope, element, attr, ctrl) {
				if (!ctrl) {
					return;
				}
				var splitter =/[、]+|[\|\|]+|[\$]+|[\\]+|[\s]+|[,，]+|[;；]+|[|｜]+/; //line: ignore
				var replaceChar =/[、]+|[\|\|]+|[\$]+|[\\]+|[\s]+|[,，]+|[;；]+|[|｜]+/g; //line: ignore

				var validator = function (value) {
					var maxWord = parseInt(attr.maxWord) || 0;
					var count = (value || '').split(splitter).length;
					if (maxWord === 0 || count <= maxWord) {
						ctrl.$setValidity('maxword', true);
						return value;
					} else {
						ctrl.$setValidity('maxword', false);
						return value;
					}
				};
				ctrl.$formatters.push(validator);
				ctrl.$parsers.unshift(validator);

				ctrl.$viewChangeListeners.push(function(){
					var value = ctrl.$viewValue;
					if(value) {
						value = value.replace(replaceChar,',');
						ctrl.$setViewValue(value);
					}
				});

				attr.$observe('maxword', function () {
					validator(ctrl.$viewValue);
				});
			}
		};
	}])
		.directive("nswMaxLength",[function(){
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
/*
					var getContent = function getContent(){
						if(element.text){
							console.log(element.val());
							return element.val();
						}
						return ctrl.$viewValue;
					};*/
					/*element.on('keyup',function(){
						validator(getContent());
					});*/
					attr.$observe('nswmaxlength', function () {
						validator(ctrl.$viewValue);
					});
				}
			}

	}]);
}(angular));