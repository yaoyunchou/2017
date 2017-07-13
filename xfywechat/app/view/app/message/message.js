/*global angular*/
(function (angular) {
	"use strict";
	angular.module('message', ['platform']).config(['$stateProvider',
		function ($stateProvider) {
			$stateProvider.state('wechat.message', {
				url: '/message',
				templateUrl: globals.basAppRoute + 'message/partials/message.html',
				controller:'messageCtrl'
			}).state('wechat.chat', {
				url: '/chat',
				templateUrl: globals.basAppRoute + 'message/partials/chat.html'
			}).state('wechat.message.list', {
				url: '/list',
				templateUrl: globals.basAppRoute + 'message/partials/message-list.html',
				controller: 'messageListCtrl'
			});
		}]);
}(angular));