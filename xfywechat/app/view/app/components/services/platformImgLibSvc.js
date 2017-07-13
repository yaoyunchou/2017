/*globals _*/
(function (angular) {
	"use strict";
	angular.module('platform').factory('platformImgLibSvc', ['$q','platformModalSvc','nswGlobals','$http','platformMessenger', function ($q,platformModalSvc,nswGlobals,$http,PlatformMessenger) {
		var service = {};
		var dataload = new PlatformMessenger();
		service.showImgLibModal = function showImgLibModal(options, selectedItem,showAlign) {
			return platformModalSvc.showModal({
				backdrop: 'static',
				templateUrl:globals.basAppRoute + 'components/templates/platform-image-lib-dir.html',
				controller: 'imglibWinCtrl',
				size: 'lg',
				options: {
					showAlign:showAlign,
					imgConfig: options,
					selectedItem: angular.copy(selectedItem)
				}
			}).then(function (selectedItem) {
				return selectedItem;
			}, function () {
				return false;
			});
		};
		service.loadWechatData = function loadWechatData() {
			var option = {
				method: 'get',
				url: globals.basAppRoot + 'material/materialInfoImage',
				params: {
					appId:nswGlobals.getValue('appId'),
					pageNum:1,
					pageSize:8
				}
			};
			return $http(option).then(function (res) {
				if (res.data.isSuccess) {
					dataload.fire(res.data.data);
				} else {
					platformModalSvc.showWarmingMessage(res.data.data, '获取数据失败');
				}
				return res.data;
			});
		};


		service.registerdataload = function registerdataload(handler) {
			dataload.register(handler);
		};

		service.unregisterdataload = function unregisterdataload(handler) {
			dataload.unregister(handler);
		};



		return service;
	}]);
}(angular));