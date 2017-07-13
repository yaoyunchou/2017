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
	angular.module('platform').factory('basDataProcessorSvc', ['$injector', 'platformMessenger',
		function ($injector, PlatformMessenger) {
			return function (service, local) {
				var processors = [];
				var beforeHandlerCall = new PlatformMessenger();
				var afterHandlerCall = new PlatformMessenger();
				_.forEach(local.options.processors, function(processor){
					processors.push({name:processor,instance: $injector.get(processor)});
				});

				local.processData = function processData(item, data) {
					_.forEach(processors, function (processor) {
						var e = {service:service, item:item,data:data};
						beforeHandlerCall.fire(e);
						if(!e.ignore) {
							processor.instance.process.call(service, item, data);
							afterHandlerCall.fire(e);
						}
						if(e.stop){
							return false;
						}
					});
				};
			};
		}]);

}(angular));