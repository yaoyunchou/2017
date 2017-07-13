(function (angular) {
	"use strict";
	angular.module('materials').factory('articleLibDataSvc', ['$q','$http','$state', '$timeout', 'basDataSvc', 'nswGlobals', 'materialsDataSvc','platformModalSvc',
		function ($q,$http,$state, $timeout, basDataSvc, nswGlobals, materialsDataSvc,platformModalSvc) {
			var options = {
				uri: 'material/materialInfoNews',
				list: {
					listUri: function () {
						return filterType === 'myMaterials' ? 'material/materialInfoNews' : 'wxMaterial/list';
					},
					pageSize: 2,
					enableSearch: true,
					enablePaging: true,
					prepareSearchParam: function (options) {
						options.type='news';
						options.appId = nswGlobals.getValue('appId');
					},
					selectionMode: 'single'
				}
			};
			var filterType = 'myMaterials';
			var service = basDataSvc.createInstance(options);

			var creatingMaterial = false;

			service.createArticle = function createArticle(type, srcModuleName) {
				materialsDataSvc.setCreateType(type, true, srcModuleName);
				creatingMaterial = true;
				materialsDataSvc.createNew();
				/*$state.go('wechat.materials.apply');*/
				if(materialsDataSvc.checkAuthed('phoneProj')) {
					$state.go('wechat.materials.apply');
				}else{
					$state.go('wechat.materials.add');
				}
			};

			var materialCreated = function materialCreated(material) {
				if (!creatingMaterial) {
					return;
				}
				creatingMaterial = false;

				$timeout(function () {
					service.closeModal(true, material);
				});
			};
			service.sync = function sync() {
				var defer = $q.defer();
				var option = {
					method: 'get',
					url: globals.basAppRoot + 'wxMaterial/sync',
					params:{
							appId : nswGlobals.getValue('appId'),
							type:'news'
					}

				};
				return $http(option).then(function (res) {
					if (res.data.isSuccess) {
						defer.resolve(res.data.data);
						platformModalSvc.showWarmingMessage(res.data.data, '温馨提示');
					} else {
						defer.reject(res.data.data);
						platformModalSvc.showWarmingMessage(res.data.data, '温馨提示');
					}
					return defer.promise;
				});
			};
			service.setFilterType = function setFilterType(type) {
				filterType = type;
			};

			materialsDataSvc.registerItemCreated(materialCreated);
			service.loadData();
			return service;
		}]);

}(angular));