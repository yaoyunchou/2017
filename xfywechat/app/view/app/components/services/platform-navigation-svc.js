/*global _*/
(function (angular) {
	"use strict";

	angular.module('platform').factory('platformNavigationSvc', ['$state', 'platformMenuDataSvc', 'platformMessenger', 'nswGlobals',
		function ($state, platformMenuDataSvc, PlatformMessenger, nswGlobals) {

			var service = {},
				routeWillUpdated = new PlatformMessenger(),
				routeUpdated = new PlatformMessenger(),
				stateUpdated = new PlatformMessenger();

			service.routes = [];


			var goState = function goState(state) {
				if ($state.current.name === state) {
					stateUpdated.fire(state);
				} else {
					stateUpdated.fire(state);
					$state.go(state);
				}
			};

			var updateState = function updateState(state, options) {
				if (options && options.promise) {
					options.promise.then(function () {
						goState(state);
					});
				} else if (_.isFunction(options)) {
					options.apply(this, state);
					goState(state);
				} else {
					goState(state);
				}
			};

			service.goState = function goState(state, options) {
				var event = {state: state};
				routeWillUpdated.fire(event);
				var currentMenu = platformMenuDataSvc.getCurrentMenu() || {};
				if (event.confirm && event.confirm.then) {
					event.confirm.then(function () {
						if (!event.stop) {
							updateState(state, options);
						} else if (currentMenu.name) {
							platformMenuDataSvc.selectMenu(currentMenu.name, false);
						}
					});
				} else {
					nswGlobals.setValue('platform_menus_defaultState', {stop: true}, true);
					updateState(state, options);
				}
			};

			var onMenuSelected = function onMenuSelected(menu, group, updateState) {
				var defState = nswGlobals.getValue('platform_menus_defaultState'), state;
				nswGlobals.setValue('platform_menus_defaultState', null, true);
				group = group || {};

				if (updateState) {
					if (_.isString(defState)) {
						state = defState;
					} else if (_.isObject(defState) && defState.stop) {
						return;
					} else {
						state = group !== menu && group.state ? group.state + '.' + menu.state : menu.state;
						if (!state) {
							state = (_.find(menu.menus, {'isDefault': true}) || {}).state;
							if (!state) {
								return;
							}
						}
						if (!/^wechat\./.test(state)) {
							state = 'wechat.' + state;
						}
					}


					service.goState(state);
					routeUpdated.fire(menu);
				}
			};

			platformMenuDataSvc.registerMenuSelected(onMenuSelected);


			service.registerRouteUpdated = function registerRouteUpdated(hander) {
				routeUpdated.register(hander);
			};

			service.unregisterRouteUpdated = function unregisterRouteUpdated(hander) {
				routeUpdated.unregister(hander);
			};

			service.registerStateUpdated = function registerRouteUpdated(hander) {
				stateUpdated.register(hander);
			};

			service.unregisterStateUpdated = function unregisterRouteUpdated(hander) {
				stateUpdated.unregister(hander);
			};


			service.registerRouteWillUpdated = function registerRouteWillUpdated(handler) {
				routeWillUpdated.register(handler);
			};

			service.unregisterRouteWillUpdated = function unregisterRouteWillUpdated(handler) {
				routeWillUpdated.unregister(handler);
			};



			return service;
		}]);

}(angular));