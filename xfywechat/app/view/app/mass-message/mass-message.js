/*global angular*/
(function (angular) {
	"use strict";
	angular.module('massMessage', ['platform']).config(['$stateProvider', '$urlRouterProvider',
		function ($stateProvider, $urlRouterProvider) {
			$urlRouterProvider.when("/wechat/massMessage", 'wechat/massMessage/detail');
			$stateProvider.state('wechat.massMessage', {
				url: '/massMessage',
				templateUrl: globals.basAppRoute + 'mass-message/partials/mass-message.html',
				controller: 'massMessageCtrl'
			}).state('wechat.massMessage.detail', {
				url: '/detail',
				templateUrl: globals.basAppRoute + 'mass-message/partials/mass-message-detail.html',
				controller: 'massMessageDetailCtrl'
			}).state('wechat.massMessage.list', {
				url: '/list',
				templateUrl: globals.basAppRoute + 'mass-message/partials/mass-message-list.html',
				controller: 'massMessageListCtrl'
			});
		}]);
}(angular));