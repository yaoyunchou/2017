/*globals UE*/
(function (angular) {
	"use strict";

	angular.module('platform').directive('platformUeditor', [function () {
		return {
			restrict: 'A',
			require: 'ngModel',
			scope: {
				simple: '@',
				maxWord: '@'
			},
			template: '<div ueditor ng-model="model" config="config" ng-change="change()"></div>',
			link: function (scope, element, attr, ctrl) {
				var configComplex = {
					initialFrameWidth: '100%',
					maximumWords: 20000,
					initialFrameHeight: 450,
					themePath: globals.basAppRoot + 'plugin/ueditor/themes/',
					langPath: globals.basAppRoot + 'plugin/ueditor/lang/',
					serverUrl: '',
					UEDITOR_HOME_URL: globals.basAppRoot + 'plugin/ueditor/'
				};

				var configSimple = {
					maximumWords: 150,
					initialFrameWidth: '90%',
					initialFrameHeight: 100,
					themePath: globals.basAppRoot + 'plugin/ueditor/themes/',
					langPath: globals.basAppRoot + 'plugin/ueditor/lang/',
					serverUrl: '',
					UEDITOR_HOME_URL: globals.basAppRoot + 'plugin/ueditor/',
					toolbars: [
						[
							'fullscreen', 'source', '|', 'undo', 'redo', '|',
							'bold', 'italic', 'underline', 'fontborder', '|', 'forecolor', 'backcolor', '|',
							'fontfamily', 'fontsize', '|',
							'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|',
							'link'
						]
					]
				};

				setTimeout(function () {
					scope.config = Boolean(scope.simple) ? configSimple : configComplex;
					scope.config.maximumWords = Number(scope.maxWord);
				});
				scope.change = function change() {
					ctrl.$setViewValue(scope.model);
				};

				scope.$render = function $render() {
					scope.model = ctrl.$viewValue;
				};
			}
		};
	}]);
}(angular));