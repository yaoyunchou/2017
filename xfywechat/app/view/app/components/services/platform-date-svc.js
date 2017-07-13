(function (angular) {
	"use strict";
	angular.module('platform').factory('platformDateSvc', [function () {
		var service = {};

		service.dateRange = function dateRange(options){
			var deOption = {
				start:new Date().valueOf(),
				range:7
			};
			var opt = $.extend({},deOption,options);
			return  new Date(opt.start-opt.range*86400000).format('yyyy-MM-dd');
		};

		return service;
	}]);

}(angular));