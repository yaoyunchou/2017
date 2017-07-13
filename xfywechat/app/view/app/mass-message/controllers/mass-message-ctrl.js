/**
 * Created by yaoyc on 2016/5/25.
 */
(function (angular) {
	"use strict";
	angular.module("massMessage").controller("massMessageCtrl", ['$scope', '$state', 'massMessageSvc',
		function ($scope, $state, massMessageSvc) {
			$scope.tabs = {};
			var _route = '';
			$scope.selectTab = function selectTab(key, route) {
				_route = route;
				if (key === 1) {
					_.forEach($scope.tabs, function (tab, prop) {
						$scope.tabs[prop] = false;
					});
					$scope.tabs[key] = true;
					$scope.tab = key;
					if (_route) {
						$state.go('wechat.massMessage.' + _route);
					}
				}

				if (key === 2) {
					$scope.$broadcast('checkFormDirty');
				}
			};

			$scope.$on('formDirtyInfo', function (e, options) {
				if (!options.stop || options.dirty === false) {



					/*$scope.tabs[2] = true;
					 $scope.tab = 2;*/
					if (_route) {
						if ($state.current.name !== 'wechat.massMessage.' + _route) {
							_.forEach($scope.tabs, function (tab, prop) {
								$scope.tabs[prop] = false;
							});
							var tabIndex = _route === 'detail' ? 1 : 2;
							$scope.tabs[tabIndex] = true;
							$scope.tab = tabIndex;
							$state.go('wechat.massMessage.' + _route);
						}
					}
					massMessageSvc.createNew();
				} else {
					$scope.tabs[1] = true;
					$scope.tab = 1;
				}
			});
			$scope.goToList = function goToList() {
				$scope.selectTab(2, 'list');
			};

			$scope.goToDetail = function goToDetail() {
				$scope.selectTab(1, 'detail');
			};
		}]);
}(angular));