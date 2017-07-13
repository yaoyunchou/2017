/**
 * Created by yaoyc on 2016/5/25.
 */
(function (angular) {
	"use strict";
	angular.module("message").controller("messageCtrl", ['$scope', '$state',
		function ($scope, $state) {
			$scope.tabs = {};
			$scope.selectTab = function selectTab(key, route) {
				_.forEach($scope.tabs, function (tab, prop) {
					$scope.tabs[prop] = false;
				});
				$scope.tabs[key] = true;
				$scope.tab = key;
			};

			$scope.goToList = function goToList(){
				$scope.selectTab(2,'list');
			};

			$scope.goToDetail = function goToDetail(){
				$scope.selectTab(1,'detail');
			};
		}]);
}(angular));