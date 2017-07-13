(function (angular) {
	"use strict";
	angular.module('menu').factory('menuKeyWordSvc', ['basDataSvc',
		function (basDataSvc) {
			var options = {
				requireAppId: true,
				list: {
					enableSearch: true,
					enablePaging: true,
					listUri: 'keyWord/list',
					prepareSearchParam: function (options) {
						options.type = 1;
					},
					selectionMode: 'multi',
					pageSize:100000
				}
			};
			var service = basDataSvc.createInstance(options),currentTag;
			service.setCurrentTag = function setCurrentTag(tag){
				currentTag = tag;
			};
			service.getCurrentTage = function getCurrentTag(){
				return currentTag;
			};
			return service;
		}]);

}(angular));