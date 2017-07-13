(function (angular) {
	"use strict";
	angular.module('menu').controller('menuCmsMobileCtrl', ['$scope','menuCmsDataSvc','basListCtrlSvc' ,
		function ($scope,menuCmsDataSvc,basListCtrlSvc) {
		basListCtrlSvc.createInstance($scope, menuCmsDataSvc);
			$scope.searchData();
			$scope.isItemSelected = function isItemSelected(item) {
				return !!_.find(menuCmsDataSvc.getSelectedItems(), {url: item.url});
			};
	}]);

}(angular));