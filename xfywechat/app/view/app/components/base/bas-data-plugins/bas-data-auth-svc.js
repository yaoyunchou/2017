/**
 *
 * options: item {
 * }
 */
(function (angular) {
	"use strict";
	angular.module('platform').factory('basDataAuthSvc', ['platformNswAuthSvc',
		function (platformNswAuthSvc) {
			return function (service, local) {
				service.checkAuthed = function checkAuthed(code) {
					return platformNswAuthSvc.getAuth(code);
				};
			};
		}]);

}(angular));