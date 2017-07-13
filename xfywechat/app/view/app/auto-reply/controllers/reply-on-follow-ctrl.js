/*global angular*/
(function (angular) {
	"use strict";
	angular.module("autoReply").controller("replyOnFollowCtrl", ['$scope', 'autoReplyDataSvc', 'basDetailCtrlSvc',  'materialsImgDataSvc','nswGlobals',
		function ($scope, autoReplyDataSvc, basDetailCtrlSvc, materialsImgDataSvc, nswGlobals) {
			basDetailCtrlSvc.createInstance($scope, autoReplyDataSvc);
			var initSelectTab = $scope.selectTab;
			$scope.selectTab = function selecteTab(tab) {
				if (tab === 1) {
					$scope.currentItem.replyType = 'txt';
				} else {
					$scope.currentItem.replyType = 'pic';
				}
				initSelectTab.apply(this, arguments);
			};


			autoReplyDataSvc.loadData().then(function (list) {
				if (list && list.length) {
					var currentItem = list[0];
					autoReplyDataSvc.filterData(currentItem);
					autoReplyDataSvc.setCurrentItem(currentItem);
					if (currentItem.replyType === 'pic' && currentItem.fileId) {
						$scope.selectTab(2);
					}
				} else {
					autoReplyDataSvc.createNew();
				}
			});


			$scope.imgurl = 'material/image/upload?appId=' + nswGlobals.getValue('appId');


			$scope.replaySave = function replySave() {
				$scope.save($scope.formmaterials);
				$scope.currentItem.$$new = false;
			};

			$scope.textReset = function textReset() {
				$scope.currentItem.content = '';
			};
			$scope.imgReset = function imgReset() {
				$scope.currentItem.fileId = '';
			};
			var resetForm = function resetForm() {

				autoReplyDataSvc.loadData().then(function (list) {
					if (list.length) {
						var currentItem = list[0];
						autoReplyDataSvc.setCurrentItem(currentItem);
					} else {
						autoReplyDataSvc.createNew();
					}
				});
			};
			autoReplyDataSvc.registerItemCreated(resetForm);


		}]);
}(angular));