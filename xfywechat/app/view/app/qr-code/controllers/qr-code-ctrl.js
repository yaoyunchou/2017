/**
 * Created by yaoyc on 2016/5/25.
 */
(function (angular) {
	"use strict";
	angular.module("qrCode").controller("QRCodeCtrl", ['$scope', '$state', 'QRCodeSvc',
		function ($scope, $state, QRCodeSvc) {
			$scope.tabs = {};
			$scope.tabTitle = '新建二维码';
			$scope.tabInfo = 0;
			var _route = '', _key = 1;
			$scope.selectTab = function selectTab(key, route) {
				_route = route;
				_key = key;

				if (key === 1) {
					$scope.tabInfo++;
					_.forEach($scope.tabs, function (tab, prop) {
						$scope.tabs[prop] = false;
					});
					$scope.tabs[key] = true;
					$scope.tab = key;
					if (route) {
						$state.go('wechat.QRCode.' + route);
					}
					//if ($scope.tabInfo > 2) {
					//	QRCodeSvc.createNew();
					//}
				} else if (key === 2) {
					$scope.$broadcast('checkFormDirty');
				}
			};

			$scope.$on('formDirtyInfo', function (e, options) {
				if (!options.stop || options.dirty === false) {
					$scope.tabInfo++;
					_.forEach($scope.tabs, function (tab, prop) {
						$scope.tabs[prop] = false;
					});
					$scope.tabs[_key] = true;
					$scope.tab = _key;
					if (_route) {
						$state.go('wechat.QRCode.' + _route);
					}
					if ($scope.tabInfo > 2) {
						QRCodeSvc.createNew();
					}
				} else {
					$scope.tabs[1] = true;
					$scope.tab = 1;
				}
			});

			$scope.goToList = function goToList() {
				$scope.selectTab(2, 'list');
			};

			$scope.goToDetail = function goToDetail() {
				$scope.tabInfo = 0;
				$scope.selectTab(1, 'detail');
			};

			var currentItemChanged = function currentItemChanged(item) {
				$scope.tabTitle = item.id ? '编辑二维码' : '新建二维码';
			};

			QRCodeSvc.registerCurrentItemChanged(currentItemChanged);

			$scope.$on('$destroy', function () {
				QRCodeSvc.unregisterCurrentItemChanged(currentItemChanged);
			});

		}]);
}(angular));