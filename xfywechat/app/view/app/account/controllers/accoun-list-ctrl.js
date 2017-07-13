/*global angular*/
(function (angular) {
	"use strict";
	angular.module("account").controller("accountListController", ['$scope', 'basListCtrlSvc', 'accountDataSvc', 'platformModalSvc', '$state', 'nswGlobals', 'platformMenuDataSvc',
		function ($scope, basListCtrlSvc, accountDataSvc, platformModalSvc, $state, nswGlobals, platformMenuDataSvc) {
			//默认选中 我已满足以上条件
			$scope.isAgree = true;
			//定义选中的授权方式   ture 为自动  false 为普通  默认为自动
			$scope.isAutoAuthorize = true;


			basListCtrlSvc.createInstance($scope, accountDataSvc, {
				detailState: 'wechat.authorizeMain.mode'
			});
			$scope.addAccount = function addAccount() {
				accountDataSvc.authorizeAotu().then(function (data) {
					if (data.isSuccess) {
						$state.go("wechat.authorizeMain.explain");
					}
				});

			};
			$scope.changeChooes = function changeChooes(bl) {
				$scope.isAutoAuthorize = bl;
			};
			$scope.removeItem = function removeItem(account) {
				account.deleteing = true;
				platformModalSvc.showConfirmMessage('你确定要删除<font class="promise-color">已选择的</font>账号吗?', '温馨提示', '<div>删除之后所有与此账号相关的信息，如已录入的回复信息、自定义菜单等都将删除无法还原</div>').then(function () {
					$scope.remove(account);
				},function(){
					account.deleteing = false;
				});
			};
			$scope.setCurrentItem = function setCurrentItem(item) {
				accountDataSvc.setCurrentItem(item);
				if(item.appId) {
					platformMenuDataSvc.selectMenu('关注时回复');
				}
			};

			$scope.setCurrentItem({});
		}]);
}(angular));