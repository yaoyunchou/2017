(function (angular) {
	"use strict";
	angular.module('message').factory('messageSvc', ['$http', 'basDataSvc', 'platformModalSvc', 'nswGlobals', 'messageCacheDataSvc',
		function ($http, basDataSvc, platformModalSvc, nswGlobals, messageCacheDataSvc) {
			var openid, service;
			var options = {
				name: 'messageSvc',
				uri: 'message/sendMsg',
				item: {
					default: {
						msgType: 'txt',
						content: ''
					},
					afterCreated: function (item) {
						item.appId = nswGlobals.getValue('appId');
						item.openId = this.getOpenId();
					}
				},
				list: {
					listUri: 'message/msgList',
					enablePaging: true,
					enableSearch: true,
					selectionMode: 'single',
					pageSize: 20,
					prepareSearchParam: function (option) {
						option.dayNum = this.getSearchOptions().dayNum || 0;
					}
				},
				cache: {
					getCache: messageCacheDataSvc.resolveCache,
					applyCache: messageCacheDataSvc.applyCache
				}
			};
			service = basDataSvc.createInstance(options);
			service.setOpenId = function setOpenId(id) {
				openid = id;
				service.saveCache();
			};
			service.getOpenId = function getOpenId() {
				return openid;
			};
			service.send = function send(item, msgId) {
				item.appId = nswGlobals.getValue('appId');
				item.msgType = "txt";
				var options = {
					method: 'post',
					url: globals.basAppRoot + 'message/sendMsg',
					data: item,
					params: {
						'msgId': msgId
					}
				};
				return $http(options).then(function (res) {
					if (res.data.isSuccess) {
						service.loadData();
						platformModalSvc.showSuccessTip('发送成功');
					} else {
						platformModalSvc.showWarmingMessage(res.data.data, '发送失败');
					}

					return res.data;
				}, function (error) {
					platformModalSvc.showWarmingMessage('发送失败:' + error, '发送失败');
				});
			};

			service.setMsgType = function setMsgType(type, material) {
				var currentItem = service.getCurrentItem();
				currentItem.msgType = type || '';
				if (material && !!material.id) {
					currentItem.mediaId = material.id || '';
				}
				switch (type) {
					case 'txt':
						if (currentItem.content) {
							currentItem.msgType = type;
						}
						break;
					case 'pic':
						if (currentItem.fileId) {
							currentItem.msgType = type;
						}
						break;
					case 'news':
						if (currentItem.mediaId) {
							currentItem.msgType = type;
						}
						break;
				}

			};

			service.getSelectedType = function getSelectedType() {
				var currentItem = service.getCurrentItem();
				if (currentItem.fileId) {
					return 'pic';
				} else if (currentItem.mediaId) {
					return 'news';
				}
				return 'txt';
			};

			return service;
		}]);

}(angular));