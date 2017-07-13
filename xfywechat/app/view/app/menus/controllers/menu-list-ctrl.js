(function (angular) {
	"use strict";

	angular.module('menu').controller('menuListCtrl', ['$scope', 'basListCtrlSvc', 'menuDataSvc', function ($scope, basListCtrlSvc, menuDataSvc) {
		basListCtrlSvc.createInstance($scope, menuDataSvc);

		$scope.createMenu = function createMenu(parent,$event) {
			var item = menuDataSvc.createNew();
			item.code = '00' + $scope.dataList.length;
			if(parent) {
				item.parentCode = parent.code;
				$event.preventDefault();
			}
			$scope.dataList.push(item);
		};

		$scope.selectSubMenu = function selectSubMenu(subMenu,$event){
			menuDataSvc.setCurrentSubMenu(subMenu);
			$scope.currentSubMenu = subMenu;
			$event.preventDefault();
		};

		$scope.selectMenu = function selectMenu(menu){
			$scope.currentMenu = menu;
		};


		$scope.$watch('dataList.length',function(){
			$scope.rootItems =_.filter($scope.dataList, function(node){
				return !node.parentCode;
			});
		});
	}]);

}(angular));