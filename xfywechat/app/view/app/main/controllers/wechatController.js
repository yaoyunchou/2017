/*global angular*/
(function (angular) {
	"use strict";
	angular.module("app").controller("wechatCtrl", ['$scope', '$state', 'mainMenuSvc', 'platformNavigationSvc', 'platformMenuDataSvc', 'nswGlobals', 'basListCtrlSvc', 'accountDataSvc', 'platformNswAuthSvc',
		function ($scope, $state, mainMenuSvc, platformNavigationSvc, platformMenuDataSvc, nswGlobals, basListCtrlSvc, accountDataSvc, platformNswAuthSvc) {
			basListCtrlSvc.createInstance($scope, mainMenuSvc);

			$scope.isWelcome = true;
			$scope.leftEdit = false;
			$scope.showMenus = true;
			var getCurrentWechatInfo = function getCurrentWechatInfo(currentItem) {
				$scope.currentWechtInfo = currentItem;
			};

			$scope.goMaterials = function goMaterials() {
				$state.go('wechat.materialsAdd');
			};

			platformMenuDataSvc.registerMenuLoaded(function (menus) {
				$scope.menuOptions = menus;
				mainMenuSvc.setMenus(menus);
				$scope.breadNavs = mainMenuSvc.buildNavigation(platformMenuDataSvc.getCurrentMenu(), platformMenuDataSvc.getCurrentMenuGroup());
			});



			$scope.exit = function exit(route) {
				nswGlobals.setValue('accountId', null, true);
				nswGlobals.setValue('appId', null, true);
				nswGlobals.setValue('platform_menus_selectedMenu', null, true);
				nswGlobals.setValue('platform_menus_selectedMenuGroup', null, true);
				$scope.$broadcast('app.exit');
				window.location = route;
			};


			$scope.$on('$stateChangeSuccess', function (e, route) {
				platformMenuDataSvc.selectMenu(route.name, false);
			});

			$scope.editAccount = function editAccount() {
				platformMenuDataSvc.selectMenu('公众号管理');
				$scope.leftEdit = true;
			};

			$scope.hideMenu = function hideMenu() {
				$scope.showMenus = false;
			};

			$scope.showMenu = function showMenu() {
				$scope.showMenus = true;
			};


			// $scope.checkAuthed = function checkAuthed(code) {
			// 	return platformNswAuthSvc.getAuth(code);
			// };

			var menuSelected = function menuSelected(menu, group) {
				accountDataSvc.setEidtHistory(menu.name);
				$scope.breadNavs = mainMenuSvc.buildNavigation(menu, group);
				$scope.currentGroup = group;
			};
			accountDataSvc.registerCurrentItemChanged(function (currentItem) {
				getCurrentWechatInfo(currentItem);
			});
			platformMenuDataSvc.registerMenuSelected(menuSelected);

			$scope.$on('$destroy', function () {
				platformNavigationSvc.unregisterMenuSelected(menuSelected);
				accountDataSvc.unregisterCurrentItemChanged();
			});


		}]);
}(angular));
