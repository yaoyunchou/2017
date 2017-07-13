/*global angular*/
(function (angular) {
	"use strict";
	angular.module("materials").controller("materialsDetailApplyCtrl", ['$scope', '$state', 'materialsDataSvc', 'basDetailCtrlSvc', 'platformModalSvc', '$timeout', 'materialsCmsDataSvc',
		function ($scope, $state, materialsDataSvc, basDetailCtrlSvc, platformModalSvc, $timeout, materialsCmsDataSvc) {
			$scope.filterOptions = {};
			var initLookup = function initLookup() {
				materialsCmsDataSvc.getProjectLists().then(function (data) {
					$scope.module = data;
				});

				$scope.getCtg = function getCtg() {
					materialsCmsDataSvc.getCtgLists($scope.filterOptions.module).then(function (data) {
						$scope.ctg = data;
					});
					$scope.filterOptions.ctg = '';
				};
			};

			$scope.searchArticles = function searchArticles() {
				var params = {
					moduleId: $scope.filterOptions.module,
					title: $scope.filterOptions.title,
					ctgId: $scope.filterOptions.ctg
				};
				materialsCmsDataSvc.getArticleLists(params).then(function (data) {
					$scope.option.searched = true;
					$scope.option.articles = data;
				});
			};

			$scope.choseArticle = function choseArticle(item) {
				$scope.option.chosed = true;
				if(!$scope.option.article){
					$scope.option.article = {};
				}
				$scope.formmaterials.$dirty = true;
				angular.extend($scope.option.article, materialsCmsDataSvc.choseArticle(item));
				$scope.setDataDirty(true);
			};
			$scope.valiPreveiw = true;
			var watcher = $scope.$watch('formmaterials.$valid',function(newValue){
				if(newValue){
					$scope.valiPreveiw = materialsDataSvc.validatePreviewData($scope.currentItem);
				}else{
					$scope.valiPreveiw = false;
				}

			});
			initLookup();
			$scope.$on('$destroy', function () {
				watcher();
				if ($state.current.name !== 'wechat.materials.add') {
					$scope.setArrowIndex(0);
				}
			});

			$scope.setForm(function(){
				return $scope.formmaterials;
			});
		}]);
}(angular));