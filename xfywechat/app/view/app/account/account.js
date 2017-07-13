/*global angular*/
(function(angular){
    "use strict";
	angular.module('account',['platform']).config(['$stateProvider', '$urlRouterProvider',function ($stateProvider, $urlRouterProvider){
		$urlRouterProvider.when("/wechat",'/wechat/account');
		$stateProvider.state('wechat.account', {
			url: '/account',
			templateUrl:  globals.basAppRoute+'account/partials/account-list.html',
			controller: 'accountListController'
		}).state('wechat.accountNotice',{
			url:'/account/notice',
			templateUrl:  globals.basAppRoute+'account/partials/notice-list.html',
			controller:'noticeListCtrl'
		}).state('wechat.accountAuthorize',{
			url:'/account/authorize',
			templateUrl:  globals.basAppRoute+'account/partials/account-authorize.html',
			controller:'accountListController'
		}).state('wechat.accountAdd',{
				url:'/account/add',
				templateUrl:  globals.basAppRoute+'account/partials/account-edit.html',
				controller:'accountEditCtrl'
		}).state('wechat.accountEdit',{
			url:'/account/edit',
			templateUrl:  globals.basAppRoute+'account/partials/account-edit.html',
			controller:'accountEditCtrl'
		}).state('wechat.authorizeAbout',{
			url:'/account/authorizeAbout?state&id',
			templateUrl:  globals.basAppRoute+'account/partials/account-authorize-about.html',
			controller:'accountAuthorizeCtrl'
		}).state('wechat.authorizeUrl',{
			url:'/account/authorizeUrl?appId',
			templateUrl:  globals.basAppRoute+'account/partials/account-authorize-url.html',
			controller:'accountAuthorizeUrlCtrl'
		}).state('wechat.authorizeMain',{
			url:'/account/authorizeMain',
			templateUrl:  globals.basAppRoute+'account/partials/account-authorize-base.html',
			controller:'accountBaseCtrl'
		}).state('wechat.authorizeMain.explain',{
			url:'/explain',
			templateUrl:  globals.basAppRoute+'account/partials/account-authorize-explain.html',
			controller:'accountListController'
		}).state('wechat.authorizeMain.mode',{
			url:'/mode',
			templateUrl:  globals.basAppRoute+'account/partials/account-authorize-mode.html',
			controller:'accountEditCtrl'
		}).state('wechat.authorizeMain.success',{
			url:'/success?state&id',
			templateUrl:  globals.basAppRoute+'account/partials/account-authorize-success.html',
			controller:'accountAuthorizeCtrl'
		}).state('wechat.authorizeMain.write',{
			url:'/write?appId',
			templateUrl:  globals.basAppRoute+'account/partials/account-authorize-write-info.html',
			controller:'accountAuthorizeUrlCtrl'
		});
	}]);
}(angular));