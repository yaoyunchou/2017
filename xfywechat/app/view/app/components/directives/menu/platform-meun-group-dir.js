/*global _*/
(function (angular) {
	"use strict";

	angular.module('platform').directive('platformMenuGroup', ['platformMenuDataSvc', '$timeout',
		function (platformMenuDataSvc, $timeout) {
			return {
				restrict: 'A',
				scope: true,
				require: 'ngModel',
				template: '<div>' +
				'               <div class="c-menu c-mkname"  data-ng-class="getGroupClass()" data-ng-click="selectMenu(group)"><span data-ng-class="selectMenuIcon()"></span><div data-ng-bind="group.name"/></div>' +
				'               <div class="c-menu-list">' +
				'                   <div data-ng-repeat="menu in group.menus" data-ng-class="getMenuClass(menu)" class="c-menu-item" data-ng-click="selectMenu(menu)" data-ng-bind="menu.name"></div>' +
				'               </div>' +
				'           </div>',
				link: function (scope, element, attrs, ctr) {
					var lastSelected;
					ctr.$render = function render() {
						scope.group = ctr.$viewValue;
						if (scope.group.selected) {
							scope.selectMenu(scope.group);
						} else {
							_.forEach(scope.group.menus, function (sub) {
								if (sub.selected) {
									scope.selectMenu(sub);
								}
							});
						}
					};

					scope.navigate = function navigate(menu) {
						platformMenuDataSvc.fireMenuSelected(menu);
					};

					scope.selectMenuIcon = function selectMenuIcon() {
						var menuClass = scope.group.icon || 'glyphicon glyphicon-tag';

						if ((scope.selectedMenu === scope.group && scope.selectedGroup === scope.group) ||
							(scope.selectedGroup === scope.group && scope.group.menus)) {
							menuClass += ' active';
						}
						return menuClass;
					};

					scope.selectMenu = function selectMenu(menu) {
						lastSelected = menu;
						if (menu.state) {
							platformMenuDataSvc.fireMenuSelected(menu);
						} else if (menu.menus) {
							scope.setSelectedGroup(menu);
							scope.$root.$broadcast('currentGroupChanged');
						}
					};

					scope.getGroupClass = function getGroupClass() {
						var groupClass = '';
						if (scope.selectedGroup === scope.group && scope.group && (!scope.group.menus || !scope.group.menus.length)) {
							groupClass += 'selected';
						} else if (scope.selectedGroup === scope.group && scope.group) {
							groupClass = 'expend';
						}

						return groupClass;
					};

					scope.getMenuClass = function getMenuClass(menu) {
						return menu && scope.selectedMenu === menu && (!menu.menus || !menu.menus.length) ? 'selected' : '';
					};

					var currentGroupChanged = function currentGroupChanged() {
						var $group = element.find('.c-menu');
						if (scope.selectedGroup && scope.selectedGroup === scope.group && lastSelected === scope.group) {
							if ($group.hasClass('expend')) {
								$group.next().slideUp(500, function () {
									$group.removeClass('expend');
								});
							} else if (scope.group.menus && scope.group.menus.length) {
								$group.next().stop(true).slideDown(500, function () {
									$group.addClass('expend');
								});
							}
						} else if (scope.selectedGroup !== scope.group && $group.hasClass('expend')) {
							$group.next().stop(true).slideUp(500, function () {
								$group.removeClass('expend');
							});
						}
					};


					scope.$on('currentGroupChanged', currentGroupChanged);
				}
			};
		}
	]);
}(angular));