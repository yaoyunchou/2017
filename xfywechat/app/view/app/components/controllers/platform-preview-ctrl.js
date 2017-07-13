/*global angular*/
(function (angular) {
	"use strict";
	angular.module('platform').controller('platformPreviewCtrl', ['$scope', '$timeout', 'platformPreviewSvc','accountDataSvc','platformModalSvc',
		function ($scope, $timeout, platformPreviewSvc,accountDataSvc,platformModalSvc) {
			$scope.isPreview = true;
			$scope.option = angular.noop;
			$scope.option.material = {};
			$scope.option.tab = 'material';
			if ($scope.modalOptions.type === 'news') {
				platformPreviewSvc.loadArticle($scope.modalOptions.information.mediaId).then(function (data) {
					$scope.option.material = data;
					$scope.option.create_time = data.create_time;
					platformPreviewSvc.setCurrentItem(data.articles[0]);
				});
				$scope.mobilePreviewItem = {appId:$scope.option.material.appId, massType: "news", mediaId:$scope.option.material.id};
			}else{
				$scope.option.material = angular.copy($scope.modalOptions.information);
				$scope.option.create_time = $scope.option.material.create_time;
				platformPreviewSvc.setCurrentItem($scope.option.material.articles[0]);
				$scope.mobilePreviewItem ={articles:$scope.option.material.articles,appId:$scope.option.material.appId};
			}
			var getCurrentWechatInfo = function getCurrentWechatInfo(currentItem){
				$scope.currentWechtInfo = currentItem;
			};
			$scope.selectTab = function selectTab(tab){
				$scope.option.tab = tab;
				if(tab==='article'){
					$scope.option.currentItem = platformPreviewSvc.getCurrentItem();
					if(_.has($scope.option.currentItem,'isArticle')){
						if($scope.option.currentItem.isArticle){
							platformPreviewSvc.omitAttr($scope.option.currentItem,'otherUrl');
						}
					}
				}
			};
			if(!$scope.option.create_time){
				$scope.option.create_time = new Date().format('yyyy-MM-dd hh:mm:ss');
			}
			$scope.previewArticle = function previewArticle(item){
				if(!!item){
					platformPreviewSvc.setCurrentItem(item);
				}
				$scope.selectTab('article');
				//$scope.option.currentItem = platformPreviewSvc.getCurrentItem();
			};
			//$scope.hasSaved = function hasSaved(data){
			//  //	platformModalSvc.showConfirmMessage('当前图文没有保存，无法手机预览！','温馨提示');
			//	//platformPreviewSvc.mobilePreview(data).then();
			//};


			//if()

			accountDataSvc.registerCurrentItemChanged(function (currentItem) {
				getCurrentWechatInfo(currentItem);
			});
			platformPreviewSvc.registerSwichShow(function(){
				$('.nsw-article').animate({scrollTop: '0px'}, 300);
			});
			$scope.$on('$destroy', function () {
				accountDataSvc.unregisterCurrentItemChanged();
				platformPreviewSvc.unregisterSwichShow();
			});


		}]);
}(angular));
