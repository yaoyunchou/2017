(function (angular) {
	"use strict";
	angular.module('platform').directive('nswNavHint', ['platformNavigationSvc', 'platformModalSvc',
		function (platformNavigationSvc, platformModalSvc) {
			return {
				restrict: 'A',
				scope: {
					dirtyChecker: '='
				},
				link: function (scope, element) {
					var beforeRouteUpdate = function beforeRouteUpdate(e) {
						if (!e.stop) {
							var isDirty = !!element.find('.ng-dirty').not('.hasDatepicker,.not-check-dirty').length;

							if (_.isFunction(scope.dirtyChecker)) {
								isDirty = scope.dirtyChecker.call(scope, isDirty);
							}

							if (isDirty) {
								e.confirm = platformModalSvc.showConfirmMessage('当前页面没有保存是否确认离开？', '温馨提示').then(function () {
									e.stop = false;
									scope.$emit('formDirtyInfo', e);
									return true;
								}, function () {
									e.stop = true;
									scope.$emit('formDirtyInfo', e);
									return false;
								});
							} else {
								scope.$emit('formDirtyInfo', {dirty: false});
							}
						}
					};

					scope.$on('checkFormDirty', function () {
						var options = {};
						beforeRouteUpdate(options);
					});

					platformNavigationSvc.registerRouteWillUpdated(beforeRouteUpdate);

					scope.$on('$destroy', function () {
						platformNavigationSvc.unregisterRouteWillUpdated(beforeRouteUpdate);
					});
				}
			};
		}]);

}(angular));