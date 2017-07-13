(function (angular) {
	"use strict";

	angular.module('menu').controller('menuEnableCtrl', ['$scope', 'menuDataSvc', 'basDetailCtrlSvc', 'platformModalSvc', 'accountDataSvc', '$state',
		function ($scope, menuDataSvc, basDetailCtrlSvc, platformModalSvc, accountDataSvc, $state) {
			basDetailCtrlSvc.createInstance($scope, menuDataSvc);

			var goEdit = function goEdit() {
				$state.go('wechat.menu');
			};

			$scope.enableMenu = function enableMenu() {
				platformModalSvc.showWarmingMessage('开启自定义菜单之后，将在24小时内对所有用户生效,确定开启吗？', '操作提示').then(function () {
					$scope.currentItem.enable = true;
					menuDataSvc.updateItem($scope.currentItem).then(function (res) {
						angular.extend(menuDataSvc.getCurrentItem(), res.data);
						goEdit();
					});
				});
			};

			var currentItemChanged = function currentItemChanged(menu) {
				if (menu.enable) {
					goEdit();
				}
			};

			menuDataSvc.registerCurrentItemChanged(currentItemChanged);
			$scope.$on('$destroy', function () {
				menuDataSvc.unregisterCurrentItemChanged(currentItemChanged);
			});
			menuDataSvc.loadItemById();
		}]);

}(angular));