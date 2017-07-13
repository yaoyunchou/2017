/*global angular*/
(function (angular) {
	"use strict";
	angular.module("message").controller("messageChatCtrl", ['$scope', 'messageSvc', 'basDetailCtrlSvc', '$timeout','$state',
		function ($scope, messageSvc, basDetailCtrlSvc, $timeout,$state) {
			basDetailCtrlSvc.createInstance($scope, messageSvc, {
				listState: 'wechat.chat',
				notCopyCurrent: true,
				tip: {
					showLoading: function () {
						return $scope.currentItem.msgType === 'pic';
					}
				}
			});
			if($scope.currentItem&&!$scope.currentItem.$$new){
				$state.go('wechat.message.list');
			}
			$scope.setMsgType = messageSvc.setMsgType;

			var resetForm = function resetForm() {
				$scope.selectTab('txt');
				$scope.create();
				if ($scope.formchat) {
					$scope.formchat.$setPristine();
				}
			};

			var currentItemChanged = function currentItemChanged(item) {
				$scope.selectTab(item.msgType || 'txt');
			};

			messageSvc.registerItemCreated(resetForm);
			var save = $scope.save;
			$scope.save = function(flog,form,saveOption){
				save.call(flog,form,saveOption).then(function(){
					form.$setPristine();
				});
			};
			$timeout(function () {
				messageSvc.registerCurrentItemChanged(currentItemChanged);
			});

			$scope.$on('$destroy', function () {
				messageSvc.unregisterItemCreated(resetForm);
				messageSvc.unregisterCurrentItemChanged(currentItemChanged);
			});

		}]);
}(angular));