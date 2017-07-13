/*global angular*/
(function (angular) {
	"use strict";
	angular.module('qrCode', ['platform']).config(['$stateProvider', '$urlRouterProvider',
		function ($stateProvider,$urlRouterProvider) {
			$urlRouterProvider.when('/wechat/QRCode','/wechat/QRCode/detail');
			$stateProvider.state('wechat.QRCode', {
				url: '/QRCode',
				templateUrl: globals.basAppRoute + 'qr-code/partials/qr-code.html',
				controller: 'QRCodeCtrl'
			}).state('wechat.QRCode.detail', {
				url: '/detail',
				templateUrl: globals.basAppRoute + 'qr-code/partials/qr-code-detail.html',
				controller: 'QRCodeDetailCtrl'
			}).state('wechat.QRCode.list', {
				url: '/list',
				templateUrl: globals.basAppRoute + 'qr-code/partials/qr-code-list.html',
				controller: 'QRCodeListCtrl'
			}).state('wechat.qrCodeCharts', {
				url: '/qrCodeCharts',
				controller: 'qrCodeChartsCtrl',
				templateUrl: globals.basAppRoute + 'qr-code/partials/qr-code-charts.html'
			}).state('wechat.qrCodeCharts.all', {
				url: '/all',
				templateUrl: globals.basAppRoute + 'qr-code/partials/qr-code-charts-all.html',
				controller: 'qrCodeChartsAllCtrl'
			}).state('wechat.qrCodeCharts.detail', {
				url: '/detail?isCheck',
				templateUrl: globals.basAppRoute + 'qr-code/partials/qr-code-charts-detail.html',
				controller: 'qrCodeChartsDetailCtrl'
			});
		}]);
}(angular));