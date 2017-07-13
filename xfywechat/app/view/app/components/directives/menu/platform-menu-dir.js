(function (angular) {
	"use strict";

	angular.module('platform').directive('platformMenu', ['platformMenuDataSvc',
		function (platformMenuDataSvc) {
			return {
				restrict: 'A',
				scope: true,
				template: '<div class="c-menu-div"> ' +
				'               <div class="c-menu-title" data-ng-bind="menus.title"></div>' +
				'               <div class="c-menu-box">' +
				'				    <div data-ng-repeat="group in menus.groups" ng-show="!group.hide"  data-platform-menu-group data-ng-model="group"/></div>' +
				'               </div>' +
				'           </div>',
				link: function (scope) {
					var menuLoaded = function menuLoaded(menus) {
						scope.menus = menus;
					};

					scope.setSelectedGroup = function setSelectedGroup(group){
						scope.selectedGroup = group;
						scope.$broadcast('currentGroupChanged');
					};

					scope.setSelectedMenu = function setSelectedMenu(menu, group){
						scope.selectedMenu = menu;
						if(group) {
							scope.selectedGroup = group;
						}
						scope.$broadcast('currentGroupChanged');
					};

					var menuSelected = function menuSelected(menu, group) {
						scope.selectedGroup = group;
						scope.selectedMenu = menu;
						scope.$broadcast('currentGroupChanged');
					};

					platformMenuDataSvc.registerMenuSelected(menuSelected);

					platformMenuDataSvc.registerMenuLoaded(menuLoaded);

					scope.$on('$destroy', function () {
						platformMenuDataSvc.unregisterMenuLoaded(menuLoaded);
					});

					scope.$evalAsync(function () {
						menuSelected(platformMenuDataSvc.getCurrentMenu(), platformMenuDataSvc.getCurrentMenuGroup());
					});
				}
			};
		}
	]);
}(angular));