/*global angular*/
(function (angular) {
	"use strict";
	angular.module("account").controller("accountAuthorizeUrlCtrl", ['$scope', '$stateParams', '$state', 'basDetailCtrlSvc', 'accountDataSvc',
		function ($scope, $stateParams, $state, basDetailCtrlSvc, accountDataSvc) {
			accountDataSvc.loadItemById($stateParams.appId).then(function(item){
				//accountDataSvc.setCurrentItem(item);
				$scope.currentItem = item;
				$scope.currentItem.appId = '';
				$scope.isCertifi = $scope.currentItem.bindType===2 && $scope.currentItem.verify_type_info===0;
				$scope.accountType = $scope.currentItem.verify_type_info+''+$scope.currentItem.bindType;
			});



			$scope.saveAirticle = function saveAirticle() {
				//var html = '<label>验证结果:</label><p>1.重新关注绑定的微信号<br>2.关注时收到"绑定成功,欢迎您!",即表明您已绑定成功,未收到信息,则绑定失败<br>3.<a href="https://mp.weixin.qq.com/advanced/advanced?action=dev&t=advanced/dev&">去验证</a></p>';
				//platformModalSvc.showSuccessMessage('添加成功，请验证结果！', '温馨提示', html).then(function () {
				$state.go('wechat.authorizeMain.success',{'id': $stateParams.appId,'state':'success'});
				//});
			};
			//accountDataSvc.registerItemCreated = function registerItemCreated(function(){
			//
			//});
		}]);
}(angular));
