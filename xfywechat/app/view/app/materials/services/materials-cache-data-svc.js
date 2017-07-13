(function (angular) {
	"use strict";
	angular.module('materials').factory('materialsCacheDataSvc', ['$timeout', '$state',
		function ($timeout, $state) {
			var service = {}, _materialSvc;

			var onCurrentItemChanged = function onCurrentItemChanged() {
				_materialSvc.saveCache();
			};

			service.init = function init(materialSvc) {
				_materialSvc = materialSvc;
				_materialSvc.registerCurrentItemChanged(onCurrentItemChanged);
			};

			//resolve cache to bas class, for save data to storage when page reloaded
			//liangcl 2016-06-27
			service.resolveCache = function resolveCache() {
				var svc = this;
				var currentItem = svc.getCurrentItem();
				return {
					current: {
						id: currentItem.id,
						name: currentItem.name
					},
					selectedIndex: svc.getArrowIndex(),
					createType: svc.getCreateType(),
					createSource: svc.getCreateSource(),
					searchoptions: svc.getSearchOptions()
				};
			};

			var doApplyCache = function doApplyCache(cache) {
				var svc = this,
					currentItem = svc.getCurrentItem(),
					isFromCache = false,
					searchOptions = cache.searchoptions || {};
				svc.setCreateType(cache.createType, cache.createSource);
				svc.setArrowIndex(cache.selectedIndex);
				if (!currentItem || !currentItem.id) {
					isFromCache = true;
					currentItem = cache.current || {};
				}
				if (searchOptions) {
					angular.extend(svc.getSearchOptions(), searchOptions);
				}
				if (currentItem.id) {
					currentItem.articles = [{}];
					svc.setCurrentItem(currentItem);
					svc.loadData().then(function (items) {
						currentItem = _.find(items, {id: currentItem.id});
						if (currentItem && currentItem.id) {
							svc.setCurrentItem(currentItem);

							if($state.current.name==='wechat.materials.apply') {
								$state.go('wechat.materials.add');
							}
						}
					});
				} else {
					svc.loadData();
				}
			};

			//load cache form storage and do init view
			//liangcl 2016-06-27
			service.applyCache = function applyCache(cache) {
				var self = this;
				$timeout(function () {
					doApplyCache.call(self, cache);
				});
			};


			return service;
		}]);
}(angular));