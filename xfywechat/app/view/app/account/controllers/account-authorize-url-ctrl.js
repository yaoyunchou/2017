/*global angular*/
(function (angular) {
	"use strict";
	angular.module("account").controller("accountAuthorizeCtrl", ['$scope','$stateParams','$state', 'basDetailCtrlSvc', 'accountDataSvc','platformModalSvc','nswGlobals','platformMenuDataSvc',
		function ($scope,$stateParams,$state, basDetailCtrlSvc, accountDataSvc,platformModalSvc,nswGlobals,platformMenuDataSvc) {
			basDetailCtrlSvc.createInstance($scope, accountDataSvc,{});
			if($stateParams.state==='success'){
				accountDataSvc.loadItemById($stateParams.id).then(function(item){
					//accountDataSvc.setCurrentItem(item);
					$scope.currentItem = item;
					$scope.isCertifi = $scope.currentItem.bindType===2 && $scope.currentItem.verify_type_info===0;
					$scope.accountType = $scope.currentItem.verify_type_info+''+$scope.currentItem.bindType;
					platformMenuDataSvc.reloadSystemMenus();
				});
			}else {
				platformModalSvc.showWarmingMessage('授权失败,请确认是否绑定的微信号已到上限,或咨询客服解决!','温馨提示').then(function(){
					$state.go('wechat.account');
				});
			}





			//$scope.reAuthorize = function reAuthorize(){
			//	$state.go('wechat.accountAuthorize');
			//};
			$scope.reAuthorize = function reAuthorize(){
				nswGlobals.setValue('platform_menus_defaultState', {stop: true}, true);
				nswGlobals.setValue('platform_menus_selectedMenu', null, true);
				nswGlobals.setValue('platform_menus_selectedMenuGroup', null, true);
				//$scope.$broadcast('app.exit');
				window.location.href = globals.basAppRoot + 'oauth/goAuthor';
			};
			$scope.goList = function goList(){
				$state.go('wechat.account');
			};

		}]);
}(angular));