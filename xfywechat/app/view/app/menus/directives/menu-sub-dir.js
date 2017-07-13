(function (angular) {
	"use strict";
	angular.module('menu').directive('menuSub', [function () {
		return {
			restrict: 'A',
			scope: {
				parent:'=',
				menus: '=',
				selected:'=',
				selectSubMenu: '=',
				addSubMenu: '='
			},
			templateUrl: globals.basAppRoute + 'menus/templates/menu-sub-dir.html',
			link: function (scope) {
				scope.menus = scope.menus || [];

				scope.selectMenu  = function selectMenu(menu){
					scope.currentMenu = menu;
				};

				scope.addMenu = function addMenu(){
					scope.addSubMenu(scope.parent);
				};

				scope.$watch('menus.length',function(){
					scope.subMenus = _.filter(scope.menus,{parentCode:scope.parent.code});
				});

				scope.getSelectedClass = function getSelectedClass(menu){
					if(menu === scope.selected){
						return 'current';
					}
				};
			}
		};
	}]);

}(angular));