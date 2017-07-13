(function (angular) {
	"use strict";
	angular.module("materials").controller("materialsRenameCtrl", ['$scope', 'basDetailCtrlSvc', 'materialsImgDataSvc',
		function ($scope, basDetailCtrlSvc, materialsImgDataSvc) {
			basDetailCtrlSvc.createInstance($scope, materialsImgDataSvc);
		}]);
}(angular));