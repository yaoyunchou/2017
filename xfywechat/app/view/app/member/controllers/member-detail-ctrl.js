(function (angular) {
	"use strict";
	angular.module("member").controller("memberDetailCtrl", ['$scope', 'basDetailCtrlSvc', 'memberDataSvc',
		function ($scope, basDetailCtrlSvc, memberDataSvc) {
			basDetailCtrlSvc.createInstance($scope, memberDataSvc);
		}]);
}(angular));