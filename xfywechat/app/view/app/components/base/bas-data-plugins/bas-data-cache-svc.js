/**
 * options: processors [
 processName ... #数据处理器名称
 * ]
 *
 * dataProcessor :{
 *      process: function(service, item, data) #处理方法入口
 * }
 */
(function (angular) {
	"use strict";
	angular.module('platform').factory('basDataCacheSvc', ['platformMessenger', '$localStorage',
		function (PlatformMessenger, $localStorage) {
			return function (service, local) {

				var cacheLoaded = new PlatformMessenger();

				service.saveCache = function saveCache() {
					if (!local.options.cache || !local.options.name || !local.options.cache.getCache) {
						return null;
					}
					var cache = local.options.cache.getCache.call(service);
					$localStorage.moduleCache = $localStorage.moduleCache || {};
					$localStorage.moduleCache[local.options.name] = cache;
					return cache;
				};

				service.loadCache = function loadCache() {
					if (!local.options.cache || !local.options.name || !local.options.cache.applyCache) {
						return null;
					}
					$localStorage.moduleCache = $localStorage.moduleCache || {};
					var cache = $localStorage.moduleCache[local.options.name]||{};
					local.options.cache.applyCache.call(this, cache);
					cacheLoaded.fire(cache);
					return cache;
				};

				service.registerCacheLoaded = function registerCacheLoaded(handler) {
					cacheLoaded.register(handler);
				};

				service.unregisterCacheLoaded = function unregisterCacheLoaded(handler) {
					cacheLoaded.register(handler);
				};

				local.init.push(function () {
					service.loadCache();
				});
			};
		}]);

}(angular));