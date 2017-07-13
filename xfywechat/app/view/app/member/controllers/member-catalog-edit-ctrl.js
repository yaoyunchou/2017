(function (angular) {
	"use strict";

	angular.module('member').controller('memberCatalogEditCtrl',
		['$scope', 'basDetailCtrlSvc', 'memberCtgDataSvc', function ($scope, basDetailCtrlSvc, memberCtgDataSvc) {
			basDetailCtrlSvc.createInstance($scope, memberCtgDataSvc);

			$scope.saveEdit = function saveEdit(){
				var selected = $scope.modalOptions.selected;
				var initCatalog = _.find(memberCtgDataSvc.getDataList(),{tagId:selected.tagId});

				memberCtgDataSvc.updateItem(selected).then(function(result){
					angular.extend(initCatalog, result);
					$scope.closeModal(true,result);
				});
				/*
				memberCtgDataSvc.updateItem($scope.currentItem).then(function(result){
					$scope.closeModal(true,result.data);
				});*/
			};
		}]);
}(angular));