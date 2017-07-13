(function (angular) {
	"use strict";
	angular.module("materials").controller("articleLibCtrl", ['$scope', '$state', 'articleLibDataSvc', 'basListCtrlSvc',
		function ($scope, $state, articleLibDataSvc, basListCtrlSvc) {
			basListCtrlSvc.createInstance($scope, articleLibDataSvc, {
				detailState: 'wechat.materialsAdd'
			});
			$scope.syncDisable = false;

			articleLibDataSvc.closeModal = $scope.closeModal;
			$scope.createArticle = function editNews(type) {
				articleLibDataSvc.createArticle(type, $scope.modalOptions.srcModuleName);
				$scope.$close();
			};

			$scope.setCurrentItem({});
			$scope.searchType = function searchType(type,tab){
				$scope.tab = tab;
				articleLibDataSvc.setFilterType(type);
				if($scope.searchOptions) {
					$scope.searchOptions.pageNum = 1;
				}
				$scope.searchData();
			};
			$scope.sync = function sync(){
				$scope.syncDisable = true;
				articleLibDataSvc.sync().then(function(){
					$scope.searchData();
					$scope.syncDisable = false;
				});
			};

			var listLoaded = function listLoaded() {
				var selected = _.find($scope.dataList, $scope.modalOptions.selected);
				if(selected) {
					$scope.setCurrentItem(selected);
				}
			};

			articleLibDataSvc.registerListLoaded(listLoaded);

			$scope.searchData();
			$scope.$on('$destroy',function(){
				articleLibDataSvc.setFilterType('myMaterials');
				articleLibDataSvc.unregisterListLoaded(listLoaded);
			});
		}]);

}(angular));