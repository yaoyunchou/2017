(function (angular) {
	"use strict";
	angular.module('menu').controller('menuKeyWordCtrl', ['$scope','menuKeyWordSvc','basListCtrlSvc', function ($scope,menuKeyWordSvc,basListCtrlSvc) {
		basListCtrlSvc.createInstance($scope, menuKeyWordSvc, {});
		$scope.searchData();
		$scope.selectedItem = {};
		if($scope.modalOptions){
			$scope.selectedItem.keyword = $scope.modalOptions.keyWord;
			$scope.selectedItem.rule = {id : $scope.modalOptions.id};
		}
		$scope.isShow = true;
		$scope.selectRule = function selectRule(item){
				$scope.currentrRule = item;
		};
		$scope.selectKeyword = function selectKeyword(rule,tag){
			$scope.selectedItem.keyword = tag;
			$scope.selectedItem.rule = rule;
		};
		$scope.selectedTag = function selectedTag(item,tag){
			return $scope.selectedItem.keyword===tag&&$scope.selectedItem.rule.id===item.id;
		};
		$scope.deleteTag = function deleteTag(){
			$scope.selectedItem.keyword = '';
		};

		$scope.selectedKeyword = function selectedKeyword(item){
			return $scope.selectedItem.keyword===item;
		};
	}]);

}(angular));