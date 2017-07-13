/*global angular*/
(function (angular) {
	"use strict";
	angular.module("massMessage").controller("massMessageListCtrl", ['$scope', 'massMessageSvc', 'basListCtrlSvc', '$state',
		function ($scope, massMessageSvc, basListCtrlSvc, $state) {
			basListCtrlSvc.createInstance($scope, massMessageSvc);
			$scope.displayList = [];
			var stopSearch = false, counter = 1;
			var searchOptions = angular.copy($scope.searchOptions);

			$scope.searchData();

			//var onListLoaded = function onListLoaded(data) {
			//	var firstDisplayItem = $scope.displayList && $scope.displayList.length ? $scope.displayList[0] : {};
			//	var firstDataItem = $scope.dataList && $scope.dataList.length ? $scope.dataList[0] : {};
			//
			//	if (searchOptions.totalRows !== $scope.searchOptions.totalRows ||
			//		searchOptions.pageNum !== $scope.searchOptions.pageNum ||
			//		$scope.displayList.length !== $scope.dataList.length ||
			//		firstDisplayItem.id !== firstDataItem.id) {
			//		$scope.displayList = angular.copy(data);
			//		searchOptions = angular.copy($scope.searchOptions);
			//		counter = 1;
			//	}
			//};
			$scope.cancelJob = function cancelJob(jobId){
				massMessageSvc.cancelJob(jobId).then(function (){
						$scope.searchData();
				});
			};

		//	massMessageSvc.registerListLoaded(onListLoaded);

			$scope.$on('$destroy', function () {
				stopSearch = true;
				if($state.current&&$state.current.url === '/massMessage'){
					$scope.goToDetail();
				}
			});
		}]);
}(angular));