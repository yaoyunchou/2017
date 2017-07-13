(function (angular) {
	"use strict";
	angular.module('platform').controller('imglibWinCtrl', ['$scope', 'platformImageLibSvc', 'basListCtrlSvc',
		function ($scope, platformImageLibSvc, basListCtrlSvc) {
			basListCtrlSvc.createInstance($scope, platformImageLibSvc, {});
			if ($scope.modalOptions.selectedItem) {
				$scope.setCurrentItem($scope.modalOptions.selectedItem);
			} else {
				$scope.setCurrentItem({});
			}
			var init = function init(){
				platformImageLibSvc.loadImageSize().then(function(data){
					$scope.phoneImg = '手机网站图片('+data.cmsImageSize+')';
					$scope.myImg = '微信管家图片('+data.wxImageSize+')';
				});
				/*判断是选过手机*/
				if(platformImageLibSvc.getFilterType() !=='wechat'){
					$scope.searchType('wechat',1);
				}else{
					$scope.searchData();
				}
			};


			$scope.searchType = function searchType(type,tab){
				$scope.tab = tab;
				platformImageLibSvc.setFilterType(type);
				if($scope.searchOptions) {
					$scope.searchOptions.pageNum = 1;
					$scope.searchOptions.filter = '';
				}
				$scope.searchData().then(function(data){
					platformImageLibSvc.loadImageSize().then(function(data){
						$scope.phoneImg = '手机网站图片('+data.cmsImageSize+')';
						$scope.myImg = '微信管家图片('+data.wxImageSize+')';
					});
					var currentItem = _.find(platformImageLibSvc.getDataList(),{fileId:platformImageLibSvc.getCurrentItem().fileId});
					platformImageLibSvc.setCurrentItem(currentItem);
				});
			};
			$scope.changeFile = function changeFile(file){
				$scope.searchOptions.filter = '';
				$scope.searchOptions.pageNum = 1;
				$scope.setCurrentItem(file);
				$scope.searchType('wechat',1);
			};
			$scope.searchOptions.pageNum = 1;
			$scope.searchOptions.filter = '';
			init();
		}]);

}(angular));