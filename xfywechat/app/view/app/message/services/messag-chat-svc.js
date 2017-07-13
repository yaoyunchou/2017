(function (angular) {
	"use strict";
	angular.module('message').factory('messageChatSvc', ['$http', 'basDataSvc', 'platformModalSvc', 'messageSvc',
		function ($http, basDataSvc, platformModalSvc, messageSvc) {
			var options = {
				name: 'messageChatSvc',
				list: {
					listUri: 'message/msgList',
					enablePaging: true,
					enableSearch: true,
					selectionMode: 'single',
					pageSize: 20,
					prepareSearchParam: function (option) {
						option.openId = messageSvc.getOpenId();
					}
				}
			};
			var service = basDataSvc.createInstance(options), openId;
			service.setOpenId = function setOpenId(id) {
				openId = id;
				service.saveCache();
			};

			service.getOpenId = function getOpenId() {
				return openId;
			};

			return service;
		}]);

}(angular));