(function (angular) {
	"use strict";

	angular.module('member', ['platform']).config(['$stateProvider', function ($stateProvider) {
		$stateProvider
			.state('wechat.member', {
				url: '/member',
				controller: 'memberListCtrl',
				templateUrl: globals.basAppRoute + 'member/partials/member-list-partial.html'
			})
			.state('wechat.memberDetail', {
				url: '/member-detail',
				controller: 'memberDetailCtrl',
				templateUrl: globals.basAppRoute + 'member/partials/member-detail-partial.html'
			});
	}]);

}(angular));