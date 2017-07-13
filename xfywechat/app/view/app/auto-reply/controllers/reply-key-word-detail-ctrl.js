/*global angular*/
(function (angular) {
	"use strict";
	angular.module("autoReply").controller("replyKeyWordAddCtrl", ['$scope', 'keyWordReplyDataSvc', 'basDetailCtrlSvc','nswGlobals',
		function ($scope, keyWordReplyDataSvc, basDetailCtrlSvc,nswGlobals) {
		basDetailCtrlSvc.createInstance($scope, keyWordReplyDataSvc, {notCopyCurrent: true});

		if (!$scope.currentItem.appId || $scope.currentItem.appId !== nswGlobals.getValue('appId')) {
			$scope.create();
		}

		$scope.deleteMaterial = function deleteMaterial() {
			$scope.keyWordImage = null;
		};
		$scope.changeFile = function changeFile(img) {
			$scope.keyWordImage = img;
			$scope.currentItem.fileId = img.fileId;
		};
		$scope.deleteNsw = function deleteNsw() {
			$scope.material = null;
		};

		$scope.wordSave = function wordSave() {
			$scope.formreplay.$setPristine();
			$scope.save(false);
		};

		var itemUpdated = function itemUpdated() {
			$scope.$parent.$parent.selectTab(2);
		};

		keyWordReplyDataSvc.registerItemCreated(itemUpdated);
		keyWordReplyDataSvc.registerItemUpdated(itemUpdated);

		$scope.reset = function reset() {
			var type = $scope.currentItem.replyType;
			$scope.create();
			$scope.currentItem.replyType = type;
			$scope.formreplay.$setPristine();
		};

		$scope.$on('$destroy', function () {
			keyWordReplyDataSvc.unregisterItemCreated(itemUpdated);
			keyWordReplyDataSvc.unregisterItemUpdated(itemUpdated);
		});
	}]);

}(angular));