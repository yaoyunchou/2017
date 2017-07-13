(function (angular) {
	"use strict";
	angular.module('platform').filter('nswDate', ['$filter', function ($filter) {
		return function (input, format) {
			if(!!input){
				var strDate = input.replace(/-/g, "/");
				var date = new Date(strDate);
				return $filter('date')(date,format);
			}
		};
	}]);

}(angular));