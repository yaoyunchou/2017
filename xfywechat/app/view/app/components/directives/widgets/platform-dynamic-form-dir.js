/*global angular
 * usage:
 *   1. create the form througth a html template
 *   <div platform-dynamic-form template="template"/>
 *
 *   2. create the form througth a templateUrl
 *   <div platform-dynamic-form templateUrl="templateUrl"/>
 * */
(function (angular) {
	"use strict";
	angular.module('platform').directive('platformDynamicForm', ['$http', '$compile','$sce', function ($http, $compile,$sce) {
		return {
			restrict: 'A',
			replace: true,
			link: function (scope, element, attrs) {
				if (angular.isDefined(attrs.template)) {
					var template = scope.$eval(attrs.template);
					if(template){
						updateDisplay(template);
					}else{
						scope.$watch(attrs.template,function(template){
							updateDisplay(template);
						});
					}
				} else if (angular.isDefined(attrs.templateUrl)) {
					var templateUrl = scope.$eval(attrs.template);
					$http.get(templateUrl).then(function (res) {
						updateDisplay(res.data);
					});
				}
				function updateDisplay(tempate) {
					var $template = $compile(tempate)(scope);
					element.html($template);
				}
			}
		};
	}]);
}(angular));