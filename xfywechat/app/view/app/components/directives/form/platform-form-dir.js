(function (angular) {
	"use strict";
	angular.module('platform').directive('platformForm', ['$compile', 'platformFormBuilderSvc', function ($compile, platformFormBuilderSvc) {
		return {
			restrict: 'A',
			required: 'ngModel',
			replace: true,
			link: function (scope, element, attrs) {

				scope._formOptions = scope.$eval(attrs.options) || {};
				scope.onPropertyChanged = scope.$eval(attrs.onPropertyChanged) || angular.noop;

				attrs.$observe('onPropertyChanged', function () {
					scope.onPropertyChanged = scope.$eval(attrs.onPropertyChanged) || angular.noop;
				});

				var buildForm = function buildForm() {
					if (scope._formOptions) {
						scope.lookups = scope._formOptions.lookups;
						var template = $(platformFormBuilderSvc.buildForm(scope._formOptions));
						element.html('');
						element.append(template);
						$compile(template)(scope);
					}
				};

				scope.$watch(scope._formOptions.name + '.$invalid', function (val) {
					scope._formOptions.$invalid = val;
				});

				scope.onChange = function onChanged() {
					scope.onPropertyChanged.apply(this, arguments);
					scope._formOptions.isDirty = true;
				};

				var init = function init() {
					scope._formOptions.setData = function setData(data) {
						scope._formOptions.name = scope._formOptions.name || '';
						scope.data = data;
						scope._formOptions.data = data;
						if(scope[scope._formOptions.name]) {
							scope[scope._formOptions.name].$setPristine(true);
						}
					};

					scope._formOptions.setData(scope._formOptions.data);
				};


				var updateWatcher = function updateWatcher() {
					var rowsWatcher, dataWatcher;
					var enableWatchers = function enableWatchers() {
						rowsWatcher = scope.$watch('_formOptions.rows', function () {
							buildForm();
						});

						dataWatcher = scope.$watch('_formOptions.data', function (newVal) {
							scope._formOptions.setData(newVal);
						});
					};
					var disableWatchers = function disableWatchers() {
						if (_.isFunction(rowsWatcher)) {
							rowsWatcher();
						}
						if (_.isFunction(dataWatcher)) {
							dataWatcher();
						}
					};


					if (scope._formOptions && scope._formOptions.name) {
						var optionsWatcher = scope.$watch(function () {
							return scope.$eval(attrs.options);
						}, function (options) {
							scope._formOptions = options || {};
							init();
							buildForm();

							disableWatchers();
							enableWatchers();
						});
						enableWatchers();
						scope.$on('$destroy', function () {
							optionsWatcher();
							disableWatchers();
						});
					}
				};

				scope.$evalAsync(function () {
					updateWatcher();
				});
			}
		};
	}]);
}(angular));