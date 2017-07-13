(function (angular) {
	"use strict";

	angular.module('app').factory('switchProjectSvc', ['$http','$q', function ($http,$q) {
		var service = {}, projectSelected = false;
		service.getProjects = function getProjects() {
			var url = globals.basAppRoot + 'cms/getProjects';
			return $http.get(url).then(function (res) {
				if (res.data.isSuccess) {
					return res.data.data.projects;
				}
				return [];
			}, function (error) {
				console.error(error);
			});
		};

		return service;
	}]);

}(angular));