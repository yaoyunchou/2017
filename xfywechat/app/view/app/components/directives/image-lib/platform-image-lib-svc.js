/*global angular, _*/
(function (angular) {
	"use strict";

	var module = angular.module('platform');
	module.service('platformImageLibSvc', ['$q', '$http', 'basDataSvc', 'nswGlobals', 'platformModalSvc', function ($q, $http, basDataSvc, nswGlobals, platformModalSvc) {
		var filterType = 'wechat';
		var options = {
			uri: 'material/materialInfoImage',
			list: {
				listUri: function () {
					return filterType === 'wechat' ? 'material/materialInfoImage' : 'cms/listFiles';
				},
				enableSearch: true,
				enablePaging: true,
				pageSize: 8,
				prepareSearchParam: function (options) {
					options.appId = nswGlobals.getValue('appId');
					options.projId = service.projectId;
				},
				selectionMode: 'single'
			}
		};


		var service = basDataSvc.createInstance(options);


		service.registerListLoaded(function (items) {
			_.forEach(items, function (item) {
				item.name = item.name || item.fileName;
			});
		});


		service.getProjectId = function getProjectId() {
			$http.get(globals.basAppRoot + '/cms/getProjectLists').then(function (res) {
				if (res.data.isSuccess) {
					service.projectId = res.data.data;
					service.getSearchOptions().projectId = service.projectId;
				}
			});
		};
		service.loadImageSize = function loadImageSize() {
			var defer = $q.defer();
			var option = {
				method: 'get',
				url: globals.basAppRoot + 'cms/listImageSize',
				params: {
					appId: nswGlobals.getValue('appId')
				}
			};
			return $http(option).then(function (res) {
				if (res.data.isSuccess) {
					defer.resolve(res.data.data);
				} else {
					defer.reject(res.data.data);
					platformModalSvc.showWarmingMessage(res.data.data, '获取数据失败');
				}
				return defer.promise;
			});
		};

		service.saveFile = function saveFile(module, files) {
			var defer = $q.defer();
			var option = {
				method: 'post',
				url: globals.basAppRoot + module + '/saveFile',
				data: files
			};
			return $http(option).then(function (res) {
				if (res.data.isSuccess) {
					defer.resolve(res.data.data);
				} else {
					defer.reject(res.data.data);
					platformModalSvc.showWarmingMessage(res.data.data, '图片保存失败！');
				}
				return defer.promise;
			});
		};

		service.setFilterType = function setFilterType(type) {
			filterType = type;
		};
		service.getFilterType = function getFilterType() {
			return filterType;
		};

		service.getProjectId();
		service.loadData();
		return service;
	}]);
}(angular));