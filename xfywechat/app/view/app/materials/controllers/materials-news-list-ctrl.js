/*global angular*/
(function(angular){
    "use strict";
	angular.module("materials").controller("materialsNewsListCtrl",['$scope','materialsDataSvc','basListCtrlSvc','platformModalSvc' ,
		function($scope,materialsNewsListCtrl, basListCtrlSvc,platformModalSvc){
			basListCtrlSvc.createInstance($scope, materialsNewsListCtrl,{
				detailState:'wechat.materials.add'
			});
			$scope.editNews = function editNews(item){
				if(_.has(item,"articles")&&item.articles.length>1){
					materialsNewsListCtrl.setCreateType("multiple");
				}else{
					materialsNewsListCtrl.setCreateType("single");
				}
				$scope.edit(item);
			};
			$scope.allMaterial = function allMaterial() {
				$scope.searchOptions.filter = '';
				$scope.searchData();
			};
			$scope.searchNewsData = function searchNewsData(){
				if(!$scope.searchOptions.filter){
					platformModalSvc.showWarmingTip("请输入搜索的标题!");
				}else{
					$scope.searchData();
				}
			};

			$scope.searchData();

	}]);
}(angular));