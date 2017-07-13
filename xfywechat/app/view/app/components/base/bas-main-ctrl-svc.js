(function (angular) {
	"use strict";

	angular.module('platform').factory('basMainControllerSvc', [function () {
		var service = {};

		/**
		 *
		 * @param dataService
		 * @param options {detailState:url, listState:url}
		 * @constructor
		 */
		var Constructor = function Constructor($scope, options) {

			$scope.$on('$destroy', function () {
				/*dataService.unregisterCurrentItemChanged(currentItemChanged);*/
			});
		};

		service.createInstance = function createInstance($scope, dataService) {
			return new Constructor($scope, dataService);
		};

		return service;
	}]);
}(angular));