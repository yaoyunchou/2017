/**
 * Created by jiangw on 2016/3/29.
 */

(function (angular) {
	"use strict";

	angular.module('platform').directive('nswPopovertip',['$compile', function ($compile) {
		return {
			restrict: 'A',
			scope: true,
			transclude: true,
			template: '<div data-toggle="popover" data-placement="{{dir}}">' +
			'               <div class="hide container" data-ng-transclude></div> ' +
			'           </div>',
			link: function (scope, element, attrs) {
				var content = element.find('.container').html();
				scope.dir = attrs.dir;

				var mouseOver = function mouseOver(){
					element.find("[data-toggle='popover']").popover('show');
				};

				var mouseOut = function mouseOut(){
					element.find("[data-toggle='popover']").popover('hide');
				};

				var bindEvents = function bindEvents(){
					element.siblings().on('mouseover',mouseOver);
					element.siblings().on('mouseout',mouseOut);
				};
				var unbindEvents = function unbindEvents(){
					element.siblings().off('mouseover',mouseOver);
					element.siblings().off('mouseout',mouseOut);
				};

				var initTip = function initTip(){
					unbindEvents();

					var display = $compile(content)(scope);

					element.children().popover({
						html: true,
						content: display
					});
					bindEvents();
				};

				var watchContent = '';
				scope.$evalAsync(function () {
					initTip();
					scope.$watch(function(){
						var result = watchContent !== element.html();
						watchContent = element.html();
						return result;
					},function(){
						initTip();
					});
				});


			}
		};
	}]);
}(angular));