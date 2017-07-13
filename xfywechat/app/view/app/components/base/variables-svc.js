(function (angular) {
	"use strict";
	angular.module('platform').factory('nswGlobals', ['$localStorage', 'platformMessenger','$sessionStorage',
		function ($localStorage, PlatformMessenger,$sessionStorage) {
			var service = {};
			var globals = {};
			var propertyChanged = new PlatformMessenger();
			$localStorage.globals = $localStorage.globals || {};
			$sessionStorage.globals = $localStorage.globals || {};

			service.setValue = function setValue(key, value, isStatic) {
				_.set(globals, key, value);
				propertyChanged.fire(key, value);
				if (isStatic) {
					_.set($localStorage.globals, key, value);
					if(isStatic) {
						_.set($sessionStorage.globals, key, value);
					}
				}
				return service;
			};

			service.getValue = function getValue(key) {
				if (globals.hasOwnProperty(key)) {
					return globals[key];
				} else {
					var value = $sessionStorage.globals[key] || $localStorage.globals[key];

					if(angular.isDefined(value)) {
						service.setValue(key, value, true);
					}
					return value;
				}
			};

			service.registerPropertyChanged = function registerPropertyChanged(hander) {
				propertyChanged.register(hander);
			};

			service.unregisterPropertyChanged = function unregisterPropertyChanged(hander) {
				propertyChanged.unregister(hander);
			};

			return service;
		}]);
}(angular));