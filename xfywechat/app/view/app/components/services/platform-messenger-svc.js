/*global angular*/
(function (angular) {
	"use strict";

	angular.module('platform').factory('platformMessenger', [function () {
		return function PlatformMessenger() {
			var service = this || {}, handlers = [];
			service.register = function register(handler) {
				handlers.push(handler);
			};

			service.unregister = function unregister(handler) {
				var index = handlers.indexOf(handler);
				if (index >= 0) {
					handlers.splice(index, 1);
				}
			};

			service.fire = function fire() {
				var args = arguments;
				angular.forEach(handlers, function (handler) {
					handler.apply(this, args);
				});
			};
		};
	}]);
}(angular));