(function (angular) {
	"use strict";
	angular.module('materials').factory('materialsImgDataSvc', ['basDataSvc', 'nswGlobals', '$http', 'platformModalSvc', function (basDataSvc, nswGlobals, $http, platformModalSvc) {
		var options = {
			uri: 'material/materialInfoImage',
			item: {
				removeUri: 'material/materialInfo',
				loadUri: 'material/materialInfo',
				default: {},
				prepareRemove: function (service, options) {
					options.params.type = 'image';
					options.params.appId = nswGlobals.getValue('appId');
				},
				prepareLoad: function (service, options) {
					options.params.type = 'image';
				}
			},
			list: {
				enableSearch: true,
				enablePaging: true,
				pageSize: 12,
				prepareSearchParam: function (options) {
					options.appId = nswGlobals.getValue('appId');
				},
				selectionMode: 'single'
			}
		};
		var service = basDataSvc.createInstance(options);
		service.loadData();
		var createType;
		service.getCreateType = function getCreateType() {
			return createType;
		};
		service.setCreateType = function setCreateType(type) {
			createType = type;
		};
		service.removeItems = function removeItems(ids) {
			var option = {
				method: 'delete',
				url: globals.basAppRoot + 'material/materialInfo',
				params: {id: ids, type: 'image', appId: nswGlobals.getValue('appId')}
			};
			var searchOptions = service.getSearchOptions();
			return $http(option).then(function (res) {
				if (res.data.isSuccess) {
					if (service.getDataList().length <= ids.split(',').length&&searchOptions.pageNum>1) {
						searchOptions.pageNum--;
					}
					service.loadData();
					platformModalSvc.showSuccessTip(res.data.data);

				} else {
					platformModalSvc.showWarmingMessage(res.data.data, '删除失败');
				}
				return res.data;
			});
		};
		service.editImgName = function editImgName(item) {
			var option = {
				method: 'put',
				url: globals.basAppRoot + 'material/materialInfoImage',
				data: item
			};

			return $http(option).then(function (res) {
				if (res.data.isSuccess) {
					service.loadData();
					platformModalSvc.showSuccessTip('修改成功!');
				} else {
					platformModalSvc.showWarmingMessage(res.data.data, '修改失败');
				}
				return res.data;
			});
		};
		service.showRenameModal = function showRenameModal(item) {
			options = options || {};
			options.selected = angular.copy(item);
			return platformModalSvc.showModal({
				templateUrl: globals.basAppRoute + 'materials/partials/materials-img-rename-partial.html',
				controller: 'memberDetailCtrl',
				size: 'sm',
				options: options
			}).then(function (member) {
				angular.extend(item, member);
				service.updateItem(item);
			});
		};
		return service;
	}]);

}(angular));