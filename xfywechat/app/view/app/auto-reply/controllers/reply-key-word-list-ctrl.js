/*global angular*/

(function (angular) {
	"use strict";
	angular.module("autoReply").controller("replyKeyWordListCtrl", ['$scope', 'keyWordReplyDataSvc', 'basListCtrlSvc', 'platformModalSvc',
		function ($scope, keyWordReplyDataSvc, basListCtrlSvc, platformModalSvc) {
			basListCtrlSvc.createInstance($scope, keyWordReplyDataSvc, {
				detailState: 'wechat.keywordautoReply'

			});

			$scope.searchOptions.filter = '';

			$scope.removeitems = function removeitems() {
				platformModalSvc.showConfirmMessage('确定要批量删除关键词回复吗？删除之后所有已录入的关键词回复信息内容都将删除无法还原。', '温馨提示').then(function () {
					keyWordReplyDataSvc.removeItems(_.map(keyWordReplyDataSvc.getSelectedItems(), 'id')).then(function () {
						if ($scope.dataList.length <= keyWordReplyDataSvc.getSelectedItems().length&&$scope.searchOptions.pageNum!==1) {
							$scope.searchOptions.pageNum--;
							$scope.searchData();
						}
					});
					//var listSize = keyWordReplyDataSvc.getSelectedItems().length;
					//$scope.searchOptions.totalRows -= listSize;

				});

			};
			$scope.editItem = function editItem(item) {
				keyWordReplyDataSvc.setCurrentItem(item);
				$scope.$parent.$parent.selectTab(1);
				$scope.$emit('tab', $scope.tab);
			};
			$scope.updateEnable = function updateEnable(data) {
				data.enable = !data.enable;
				keyWordReplyDataSvc.updata(data);
			};


			var initRemove = $scope.remove;
			$scope.remove = function remove(item, msg) {
				msg = "确定要删除<font color='red'>" + item.ruleName + "</font>吗？删除之后所有已录入的关键词回复信息内容都将删除无法还原。";
				initRemove.call(this, item, msg);
			};

			var onListLoaded = function onListLoaded() {
				$scope.isSelectAll = false;
			};


			$scope.searchData();

			keyWordReplyDataSvc.registerListLoaded(onListLoaded);

			$scope.$on('$destroy', function () {
				keyWordReplyDataSvc.unregisterListLoaded(onListLoaded);
			});
		}]);


}(angular));