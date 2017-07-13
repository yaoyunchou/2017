/*global angular*/
(function (angular) {
	"use strict";
	angular.module('platform').controller('platformPreviewSendCtrl', ['$scope', 'platformPreviewSvc','platformModalSvc',
		function ($scope, platformPreviewSvc,platformModalSvc) {
			platformPreviewSvc.loadFans().then(function(data){
				$scope.groupTypes = data;
			});
			$scope.send = function send(){
				$scope.formpreview.$dirty = false;
				$scope.modalOptions.information.openId = $scope.options.groupType;
				if($scope.modalOptions.information.mediaId||$scope.modalOptions.information.massType){
					platformPreviewSvc.sendMassMsg($scope.modalOptions.information).then(function(){
						platformModalSvc.showSuccessTip("发送成功");
						$scope.closeModal(true);
					},function(){
						platformModalSvc.showWarmingTip("消息发送失败");
						$scope.closeModal(true);
					});
				}else {
					platformPreviewSvc.mobilePreview($scope.modalOptions.information).then(function(){
						platformModalSvc.showSuccessTip("发送成功");
						$scope.closeModal(true);
					},function(){
						platformModalSvc.showWarmingTip("消息发送失败");
						$scope.closeModal(true);
					});
				}


			};
		}]);
}(angular));