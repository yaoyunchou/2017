(function (angular) {
	"use strict";
	angular.module('materials').factory('messageCacheDataSvc', ['$timeout', function ($timeout) {
		var service = {};

		//resolve cache to bas class, for save data to storage when page reloaded
		//liangcl 2016-06-27
		service.resolveCache = function resolveCache() {
			var svc = this;
			return {
				openId: svc.getOpenId(),
				searchoptions: svc.getSearchOptions()
			};
		};

		var doApplyCache = function doApplyCache(cache) {
			var svc = this,
				openId = cache.openId,
				searchOptions = cache.searchoptions || {};

			if (searchOptions) {
				angular.extend(svc.getSearchOptions(), searchOptions);
			}
			if (openId) {
				svc.setOpenId(openId);
			}
			svc.loadData({displayTip: true});
		};

		//load cache form storage and do init view
		//liangcl 2016-06-27
		service.applyCache = function applyCache(cache) {
			var svc = this;
			$timeout(function () {
				doApplyCache.call(svc, cache);
			});
		};


		return service;
	}]);
}(angular));