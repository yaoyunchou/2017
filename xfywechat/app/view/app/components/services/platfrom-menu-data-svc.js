(function (angular) {
	"use strict";
	angular.module('platform').factory('platformMenuDataSvc', ['$http', 'platformMessenger', 'nswGlobals',
		function ($http, PlatformMessenger, nswGlobals) {
			var service = {},
				menuKey = 'platform_menus_selectedMenu',
				groupKey = 'platform_menus_selectedMenuGroup',
				menus = {groups: []},
				selectedMenu,
				selectedGroup,
				currentAppId,
				menuSelected = new PlatformMessenger(),
				menuLoaded = new PlatformMessenger();

			var updateSelected = function updateSelected(groups) {
				selectedMenu = getMenuByName((selectedMenu || nswGlobals.getValue(menuKey) || {}).name);
				selectedGroup = getParentGroup(selectedMenu) || nswGlobals.getValue(groupKey) || {};
				selectedGroup = getGroupByName(selectedGroup.name);
				selectedMenu = selectedMenu || selectedGroup;

				_.forEach(groups, function (group) {
					if (_.has(group, 'selected')) {
						delete  group.selected;
					}

					if (group.defaultSelected && !selectedGroup) {
						selectedGroup = group;
					}

					_.forEach(group.menus, function (menu) {
						if (_.has(menu, 'selected')) {
							delete  menu.selected;
						}
						if (menu.defaultSelected && !selectedMenu) {
							selectedMenu = menu;
						}
					});

					selectedMenu = selectedMenu || selectedGroup;
					selectedMenu.defaultSelected = true;
				});
				menuSelected.fire(selectedMenu, selectedGroup);
			};

			var getMenuByName = function getMenuByName(name) {
				var result;
				_.forEach(menus.groups, function (group) {
					if (group.name === name) {
						result = group;
						return false;
					}

					if (group.menus) {
						_.forEach(group.menus, function (menu) {
							if (menu.name === name) {
								result = menu;
								return false;
							}
						});
					}
				});

				return result;
			};

			var getGroupByName = function getGroupByName(name) {
				return _.find(menus.groups, {
					name: name
				});
			};

			service.getMenuByState = function getMenuByState(state) {
				var result;
				state = state.replace(/^wechat./, '');
				_.forEach(menus.groups, function (group) {
					if (group.state === state || (state || '').slice(0, (group.state || '').length) === group.state) {
						result = group;
						return false;
					}

					if (group.menus) {
						_.forEach(group.menus, function (menu) {
							if (menu.state === state || (group.state + '.' + menu.state) === state) {
								result = menu;
								return false;
							}
						});
					}

					if (result) {
						return false;
					}
				});

				return result || {name: ''};
			};


			var getSystemMenus = function getSystemMenus() {
				if (!currentAppId || currentAppId !== nswGlobals.getValue('appId')) {
					currentAppId = nswGlobals.getValue('appId');
					return $http({
						method: 'get',
						url: globals.basAppRoot + 'app/main/content/json/menu-options.json',
						params: {
							appId: currentAppId
						}
					}).then(function (res) {
						if (res.data.isSuccess) {
							menus = res.data.data || {groups: []};
							menus.groups.push({
								name: '公众号管理',
								state: 'accountEdit',
								hide: true
							});

							if (selectedMenu && selectedMenu.updateState) {
								var menu = getMenuByName(selectedMenu.name);
								nswGlobals.setValue(menuKey, menu, true);
								if (menu) {
									service.fireMenuSelected(menu);
								}
							}
							updateSelected(menus.groups);
							menuLoaded.fire(menus);
						}
					});
				}
			};


			var getParentGroup = function getParentGroup(menu) {
				var selectedGroup;
				_.forEach(menus.groups, function (group) {
					if (group === menu) {
						return false;
					}

					_.forEach(group.menus, function (sub) {
						if (sub === menu) {
							selectedGroup = group;
							return false;
						}
					});
					return !selectedGroup;
				});

				return selectedGroup || menu;
			};

			service.getMenus = function getMenus() {
				return menus;
			};

			service.fireMenuSelected = function fireMenuSelected(menu, updateState) {
				updateState = _.isBoolean(updateState) ? updateState : true;
				var  _selectedMenu = getMenuByName(menu.name) || '';
				var  _selectedGroup = getParentGroup(menu);
				if (_selectedMenu) {
					nswGlobals.setValue('platform_menus_defaultState', null, true);
					menuSelected.fire(_selectedMenu, _selectedGroup, updateState);
					nswGlobals.setValue(menuKey, {name: _selectedMenu.name}, true);
					nswGlobals.setValue(groupKey, {name: _selectedGroup.name}, true);
				} else {
					nswGlobals.setValue('platform_menus_defaultState', true, true);
					nswGlobals.setValue(menuKey, {name: menu.name}, true);
					nswGlobals.setValue(groupKey, {name: menu.name}, true);
				}
				selectedMenu = getMenuByName(menu.name) || '';
				selectedGroup = getParentGroup(menu);
			};

			service.getCurrentMenu = function getCurrentMenu() {
				return selectedMenu;
			};

			service.getCurrentMenuGroup = function getCurrentMenuGroup() {
				return selectedGroup;
			};

			service.selectMenu = function selectMenu(name, updateState) {
				if (!name) {
					return;
				}
				var menu = getMenuByName(name) || service.getMenuByState(name);
				if (menu && menu.name) {
					service.fireMenuSelected(menu, updateState);
				} else {
					selectedMenu = {name: name, updateState: true};
					nswGlobals.setValue(menuKey, selectedMenu, true);
				}
			};

			service.registerMenuLoaded = function registerMenuLoaded(handler) {
				if (menus && menus.groups.length) {
					handler.apply(this, menus);
				}
				menuLoaded.register(handler);
			};
			service.unregisterMenuLoaded = function registerMenuLoaded(handler) {
				menuLoaded.unregister(handler);
			};
			service.registerMenuSelected = function registerMenuSelected(handler) {
				if (selectedMenu && menus.groups.length) {
					handler.apply(this, selectedMenu, getParentGroup(selectedMenu));
				}
				menuSelected.register(handler);
			};
			service.unregisterMenuSelected = function unregisterMenuSelected(handler) {
				menuSelected.unregister(handler);
			};

			service.reloadSystemMenus = function reloadSystemMenus() {
				return getSystemMenus();
			};
			//getSystemMenus();

			return service;
		}]);

}(angular));