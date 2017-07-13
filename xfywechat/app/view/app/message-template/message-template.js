/*global angular*/
(function (angular) {
	"use strict";
	angular.module('messageTemplate', ['platform','member']).config(['$stateProvider', '$urlRouterProvider',
		function ($stateProvider,$urlRouterProvider) {
			$urlRouterProvider.when("/wechat/message-template", 'wechat/message-template/detail');
			$stateProvider.state('wechat.messageTemplate', {
				url: '/message-template',
				templateUrl: globals.basAppRoute + 'message-template/partials/message-template.html',
				controller: 'messageTemplateCtrl'
			}).state('wechat.messageTemplate.detail', {
				url: '/detail',
				templateUrl: globals.basAppRoute + 'message-template/partials/message-template-detail.html',
				controller: 'messageTemplateDetailCtrl'
			}).state('wechat.messageTemplate.list', {
				url: '/list',
				templateUrl: globals.basAppRoute + 'message-template/partials/message-template-list.html',
				controller: 'messageTemplateListCtrl'
			});
		}]);
}(angular));