(function (angular) {
	"use strict";
	angular.module('autoReply').factory('keyWordReplyDataSvc', ['basDataSvc', 'platformMenuDataSvc', 'platformModalSvc', 'nswGlobals', '$q', '$http',
		function (basDataSvc, platformMenuDataSvc, platformModalSvc, nswGlobals, $q, $http) {
			var options = {
				requireAppId: true,
				uri: 'keyWord/reply',
				item: {
					default: {
						matchType: 0,
						replyType: 'txt',
						keyWordList: ['', '', ''],
						type: 1
					},
					afterCreated:function(item){
						item.appId = nswGlobals.getValue('appId');
					},
					prepareCreate: function (service, options) {
						service.filterData(options.data);
					},
					prepareRemove: function (service, options) {
						options.params.appId = nswGlobals.getValue('appId');
						options.params.ids = [];
						options.params.ids.push(options.params.id);
						_.omit(options.params, 'id');
					}
				},
				list: {
					enableSearch: true,
					enablePaging: true,
					listUri: 'keyWord/list',
					prepareSearchParam: function (options) {
						options.type = 1;
					},
					selectionMode: 'multi',
					pageSize:10
				}
			};
			var service = basDataSvc.createInstance(options);
			service.loadData();
			service.showArtcileLib = function showArtcileLib(type) {
				var defer = $q.defer();
				platformModalSvc.showModal({
					controller: 'articleLibCtrl',
					templateUrl: globals.basAppRoute + 'materials/templates/articles-lib.html',
					size: 'lg',
					options: {
						type: type
					}
				}).then(function (material) {
					defer.resolve(material);
				});
				return defer.promise;
			};
			service.setSelected = function setSelected(item) {
				service.selected = item;
			};
			service.filterData = function filterData(data) {
				if (data.replyType === 'pic') {
					if (data.hasOwnProperty('content')) {
						delete  data.content;
					}
					if (data.hasOwnProperty('mediaId')) {
						delete  data.mediaId;
					}
				} else if (data.replyType === 'news') {
					if (data.hasOwnProperty('content')) {
						delete  data.content;
					}
					if (data.hasOwnProperty('fileId')) {
						delete  data.fileId;
					}
				} else {
					if (data.hasOwnProperty('mediaId')) {
						delete  data.mediaId;
					}
					if (data.hasOwnProperty('fileId')) {
						delete  data.fileId;
					}
				}
			};

			service.removeItems = function removeItems(ids) {
				var options = {
					method: 'delete',
					url: globals.basAppRoot + 'keyWord/reply',
					params: {ids: ids, appId: nswGlobals.getValue('appId')}
				};
				return $http(options).then(function (res) {
					if (res.data.isSuccess) {
						var pageNum = service.getSearchOptions();
						if (service.getDataList().length === ids.length&&pageNum>1) {
							pageNum.pageNum--;
							service.loadData();
						}
						service.loadData();
						platformModalSvc.showSuccessTip(res.data.data);
					} else {
						platformModalSvc.showWarmingMessage(res.data.data, '删除失败');
					}
					return res.data;
				});
			};
			return service;
		}]);

}(angular));