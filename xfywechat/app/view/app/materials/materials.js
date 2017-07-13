/*global angular*/
(function(angular){
    "use strict";
	angular.module('materials',['platform']).config(['$stateProvider', function ($stateProvider){
		$stateProvider.state('wechat.materials', {
			url: '/materials/detail',
			templateUrl:  globals.basAppRoute+'materials/partials/materials-detail.html',
			controller: 'materialsDetailCtrl'
		}).state('wechat.materials.add', {
			url: '/add',
			templateUrl:  globals.basAppRoute+'materials/partials/materials-detail-add.html',
			controller: 'materialsDetailAddCtrl'
		}).state('wechat.materials.apply', {
			url: '/apply',
			templateUrl:  globals.basAppRoute+'materials/partials/materials-detail-apply.html',
			controller: 'materialsDetailApplyCtrl'
		}).state('wechat.materialsList', {
			url: '/materialsList',
			templateUrl:  globals.basAppRoute+'materials/partials/materials-list.html',
			controller: 'materialsListCtrl'
		});

	}]);
}(angular));