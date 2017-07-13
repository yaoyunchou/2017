(function (angular) {
	"use strict";

	angular.module('member').controller('memberCatalogCreateCtrl',
		['$scope', 'basDetailCtrlSvc', 'memberCtgDataSvc', 'memberDataSvc', function ($scope, basDetailCtrlSvc, memberCtgDataSvc, memberDataSvc) {
			basDetailCtrlSvc.createInstance($scope, memberCtgDataSvc);

			$scope.saveCreate = function saveCreate() {
				memberCtgDataSvc.saveCreate($scope.modalOptions.selected).then(function (result) {
					$scope.closeModal(true, result);
					//memberDataSvc.loadSearchData();
				});
			};
		}]);
}(angular));