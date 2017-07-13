(function (angular) {
	"use strict";
	angular.module('menu').factory('menuCmsDataSvc', ['$timeout', 'basDataSvc',
		function ($timeout, basDataSvc) {
			var options = {
				list: {
					enableSearch: true,
					enablePaging: true,
					listUri: 'cms/getPublishedArticle',
					selectionMode: 'single',
					pageSize: 6
				}
			};
			return basDataSvc.createInstance(options);
		}]);

}(angular));