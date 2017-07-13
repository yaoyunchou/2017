/*global angular*/
(function (angular) {
	"use strict";
	angular.module("messageTemplate").controller("messageTemplateListCtrl", ['$scope', 'messageTemplateSvc', 'basListCtrlSvc', 'platformModalSvc', '$state', 'platformMenuDataSvc',
		function ($scope, messageTemplateSvc, basListCtrlSvc, platformModalSvc, $state, platformMenuDataSvc) {
			basListCtrlSvc.createInstance($scope, messageTemplateSvc, {
				detailState: 'wechat.messageTemplate.detail'
			});
			//var searchOptions = angular.copy($scope.searchOptions);
			$scope.searchData();
			$scope.editItem = function editItem(item) {
				$scope.edit(item);
				$scope.goToDetail();
			};

			$scope.toggleStatus = function toggleStatus(item) {
				messageTemplateSvc.toggleStatus(item);
			};

			$scope.cancelJob = function cancelJob(id) {
				messageTemplateSvc.cancelJob(id);
			};

			$scope.removeItems = function removeItems() {
				platformModalSvc.showConfirmMessage('确定要批量删除模板消息吗？', '温馨提示').then(function () {
					messageTemplateSvc.removeItems(messageTemplateSvc.getSelectedItems());
				});
			};
			$scope.$on("$destroy",function(){
				if($state.current&&$state.current.url === '/message-template'){
					$scope.goToDetail();
				}
			});
		}]);
}(angular));