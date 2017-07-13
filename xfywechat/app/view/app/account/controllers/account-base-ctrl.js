/*global angular*/
(function (angular) {
	"use strict";
	angular.module("account").controller("accountBaseCtrl", ['$scope', '$stateParams', '$state', 'basDetailCtrlSvc', 'accountDataSvc', 'nswGlobals',
		function ($scope, $stateParams, $state, basDetailCtrlSvc, accountDataSvc, nswGlobals) {
			$scope.getStage = function getStage(){
				if($state.current.name ==='wechat.authorizeMain.explain'){
					return 1;
				}else if($state.current.name ==='wechat.authorizeMain.success'){
					return 3;
				}else{
					return 2;
				}
			};
		}]);
}(angular));
