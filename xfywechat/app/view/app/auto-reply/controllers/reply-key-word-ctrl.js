/*global angular*/
(function (angular) {
	"use strict";
	angular.module("autoReply").controller("replyKeyWordCtrl", ['$scope', 'keyWordReplyDataSvc', 'basDetailCtrlSvc', 'nswGlobals', function ($scope, keyWordReplyDataSvc, basDetailCtrlSvc, nswGlobals) {
		basDetailCtrlSvc.createInstance($scope, keyWordReplyDataSvc, {});
		$scope.imgurl = 'material/image/upload?appId=' + nswGlobals.getValue('appId');

		$scope.editTitle = '新建关键词回复';
		var basSelectTab = $scope.selectTab;
		$scope.selectTab = function selectTab(tab) {
			if (tab === 1) {
				$scope.editTitle = !$scope.currentItem.id || $scope.currentItem.$$new ? '新建关键词回复' : '编辑关键词回复';
			}
			if (tab === 2) {
				//basSelectTab.call(this, 1);
				$scope.$broadcast('checkFormDirty');
			} else {
				basSelectTab.apply(this, arguments);
			}
		};

		$scope.$on('formDirtyInfo', function (e, options) {
			if (!options.stop || options.dirty === false) {
				keyWordReplyDataSvc.createNew();
				$scope.editTitle = '新建关键词回复';
				basSelectTab.call(this, 2);
			} else {
				basSelectTab.call(this, 1);
			}
		});
	}]);
}(angular));