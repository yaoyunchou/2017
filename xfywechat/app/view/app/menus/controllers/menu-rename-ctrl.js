(function (angular) {
	"use strict";
	angular.module('menu').controller('menuRenameCtrl', ['$scope', function ($scope) {
		$scope.maxCount = $scope.modalOptions.maxCount ||(!!$scope.modalOptions.selected.sub_button ? 8 : 16);
	}]);

}(angular));