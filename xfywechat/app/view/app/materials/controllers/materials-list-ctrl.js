/*global angular*/
(function (angular) {
	"use strict";
	angular.module("materials").controller("materialsListCtrl", ['$scope', '$state', 'materialsDataSvc', 'materialsImgDataSvc',
		function ($scope, $state, materialsDataSvc, materialsImgDataSvc) {
			//var newLength;

			$scope.imgurl = 'material/image/upload?appId=' + materialsDataSvc.getAppId();
			$scope.tab = 1;

			$scope.selectTab = function selectTab(tab) {
				$scope.tab = tab;
			};
			$scope.changeFile = function changeFile() {
				var searchOptions = materialsImgDataSvc.getSearchOptions();
				searchOptions.pageNum = 1;
				searchOptions.filter = '';
				materialsImgDataSvc.loadData();
			};
			var create = function create() {
				materialsDataSvc.createNew();
				if($scope.checkAuthed('phoneProj')) {
					$state.go('wechat.materials.apply');
				}else{
					$state.go('wechat.materials.add');
				}
			};

			$scope.createSingle = function createSingle() {
				materialsDataSvc.setCreateType("single");
				create();
			};
			$scope.createMultiple = function createMultiple() {
				materialsDataSvc.setCreateType("multiple");
				create();
			};

			var onListLoaded = function onListLoaded() {
				var totalRows = materialsDataSvc.getSearchOptions().totalRows;
				$scope.tabTitle = '图文素材(' + totalRows + ')';
			};

			var scrollToTop = function scrollToTop(){
				$('html,body').animate({scrollTop: '0px'}, 300);
			};
			materialsDataSvc.registerListLoaded(onListLoaded);
			materialsDataSvc.registerListLoaded(scrollToTop);
			materialsImgDataSvc.registerListLoaded(scrollToTop);

			$scope.$on('$destroy',function(){
				materialsDataSvc.unregisterListLoaded(onListLoaded);
				materialsDataSvc.unregisterListLoaded(scrollToTop);
				materialsImgDataSvc.unregisterListLoaded(scrollToTop);
			});
		}]);
}(angular));