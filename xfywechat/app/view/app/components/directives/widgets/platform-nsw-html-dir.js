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
	angular.module('platform').directive('nswHtml', ['$http', '$compile','$sce', function ($http, $compile,$sce) {
		return {
			restrict: 'A',
			replace: true,
			link: function (scope, element, attrs) {
				var updateHtml = function updateHtml(){
					//var reg=new RegExp("src=","g");
					//var tempate = attrs.nswHtml.replace(reg,'nsw-src=');
					//var $template = $compile(tempate)(scope);
					element.html( attrs.nswHtml);
					//element.html(attrs.nswHtml);
				};
				attrs.$observe('nswHtml', function () {
					updateHtml();
				});

				scope.$evalAsync(function () {
					updateHtml();
				});

			}
		};
	}]);
}(angular));