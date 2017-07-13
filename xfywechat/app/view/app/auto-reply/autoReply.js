/*global angular*/
(function(angular){
    "use strict";
	angular.module('autoReply',['platform']).config(['$stateProvider', '$urlRouterProvider',function ($stateProvider, $urlRouterProvider){
		$stateProvider.state('wechat.autoReplyOnFollow', {
			url: '/replyOnFollow',
			templateUrl:  globals.basAppRoute+'auto-reply/partials/reply-on-follow.html',
			controller: 'replyOnFollowCtrl'
		}).state('wechat.keywordautoReply', {
			url: '/keywordautoReply',
			templateUrl:  globals.basAppRoute+'auto-reply/partials/keyword-reply.html',
			controller: 'replyKeyWordCtrl'
		}).state('wechat.noMatchReply', {
			url: '/noMatchReply',
			templateUrl:  globals.basAppRoute+'auto-reply/partials/no-match-reply.html',
			controller: 'noMatchReplyCtrl'
		});
	}]);
}(angular));