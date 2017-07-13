(function (angular) {
	"use strict";
	angular.module('menu', ['platform']).config(['$stateProvider', function ($stateProvider) {
		$stateProvider
			.state('wechat.menu', {
				url: '/menu',
				controller: 'menuDetailCtrl',
				templateUrl: globals.basAppRoute + 'menus/partials/menu-detail-partial.html'
			})
			.state('wechat.enable-menu', {
				url: '/enable-menu',
				controller: 'menuEnableCtrl',
				templateUrl: globals.basAppRoute + 'menus/partials/menu-enable-partial.html'
			});
	}]);

}(angular));