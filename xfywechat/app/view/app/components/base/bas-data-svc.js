(function (angular) {
	"use strict";

	angular.module('platform').factory('basDataSvc', ['basDataListSvc', 'basDataItemSvc', 'basDataProcessorSvc', 'basDataValidationSvc', 'basDataCacheSvc', 'basDataAuthSvc',
		function (basDataListSvc, basDataItemSvc, basDataProcessorSvc, basDataValidationSvc, basDataCacheSvc, basDataAuthSvc) {
			var service = {}, services = [], index = 0;

			var createUUID = function createUUID() {
				index += 1;
				var length = 3 - index.toString().length;
				length = length < 0 ? 0 : length;
				return '00'.slice(0, length) + index;
			};

			var injectPlugins = function injectPlugins(dataSvc, local) {
				basDataListSvc(dataSvc, local);
				basDataItemSvc(dataSvc, local);
				basDataProcessorSvc(dataSvc, local);
				basDataValidationSvc(dataSvc, local);
				basDataCacheSvc(dataSvc, local);
				basDataAuthSvc(dataSvc, local);
			};

			var Constructor = function Constructor(options) {
				var dataSvc = this, local = {};
				local.init = [];
				local.options = options;
				local.options.item = local.options.item || {};
				local.options.list = local.options.list || {};
				dataSvc.$$serviceId = createUUID();
				injectPlugins(dataSvc, local);

				_.forEach(local.init, function (handler) {
					handler.call(this);
				});
			};

			service.createInstance = function createInstance(options) {
				var instance = new Constructor(options);
				services.push(instance);
				return instance;
			};

			return service;
		}]);
}(angular));