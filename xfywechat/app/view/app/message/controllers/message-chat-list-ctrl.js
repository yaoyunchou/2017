(function (angular) {
	"use strict";
	angular.module("autoReply").controller("messageChatListCtrl", ['$scope', '$timeout', 'messageChatSvc', 'basListCtrlSvc', 'platformModalSvc',
		function ($scope, $timeout, messageChatSvc, basListCtrlSvc) {
			basListCtrlSvc.createInstance($scope, messageChatSvc, {
				detailState: 'wechat.chat'
			});
			$scope.displayList = angular.copy($scope.dataList);

			var searchOptions = angular.copy($scope.searchOptions),
				stopRefresh = false;

			var doSearchData = function doSearchData(){
				$scope.searchData({displayTip: false}).then(function (res) {
					if (res && !stopRefresh) {
						doRefersh(3000);
					}
				});
			};

			var doRefersh = function doRefresh(eclipse) {
				$timeout(function () {
					doSearchData();
				}, eclipse);
			};

			doRefersh();


			var onListLoaded = function onListLoaded(data) {
				if (searchOptions.totalRows !== $scope.searchOptions.totalRows ||
					searchOptions.pageNum !== $scope.searchOptions.pageNum ||
					$scope.displayList.length !== $scope.dataList.length) {
					$scope.displayList = angular.copy(data);
					searchOptions = angular.copy($scope.searchOptions);
				}
			};

			messageChatSvc.registerListLoaded(onListLoaded);

			$scope.$on('$destroy', function () {
				stopRefresh = true;
				messageChatSvc.unregisterListLoaded(onListLoaded);
			});

		}]);


}(angular));
