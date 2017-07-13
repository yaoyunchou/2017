/*global angular*/
(function (angular) {
	"use strict";
	angular.module("account").controller("accountEditCtrl", ['$scope', '$stateParams', '$state', 'basDetailCtrlSvc', 'accountDataSvc', 'nswGlobals','platformMenuDataSvc',
		function ($scope, $stateParams, $state, basDetailCtrlSvc, accountDataSvc, nswGlobals,platformMenuDataSvc) {
			basDetailCtrlSvc.createInstance($scope, accountDataSvc, {});
			$scope.isEdit = false;
			$scope.isWrite = true;

			//当前菜单为空时返回到列表界面
			//处理浏览器回退或者刷新时的异常
			if(!platformMenuDataSvc.getMenus().groups.length){
				$scope.goState('wechat.authorizeMain.explain');
			}

			var initSave = $scope.save;
			$scope.save = function save() {
				$scope.currentItem.head_img = $scope.currentItem.head_img || globals.defaultImg;
				$scope.currentItem.$new = !$scope.currentItem.type;
				$scope.isEdit = !$scope.currentItem.$new;

				initSave(false, $scope.formaccount).then(function (res) {
					if (!$scope.isEdit && res.appId) {
						$state.go('wechat.authorizeMain.write',{'appId': res.id});
					}else{
						platformMenuDataSvc.selectMenu(accountDataSvc.getEidtHistory());
					}
					accountDataSvc.loadData();
				});
			};
			$scope.cancleBtn = function cancleBtn(){
				window.history.back(-1);
			};
			$scope.imgurl = 'file/local/upload';
			if ($scope.currentItem.type) {
				$scope.isEdit = true;
			}
			$scope.accountType = [{
				_id: 0,
				name: '订阅号'
			}, {
				_id: 2,
				name: '服务号'
			}];

			if (!$scope.currentItem) {
				accountDataSvc.create();
			}
			$scope.changeFile = function changeFile(file) {
				$scope.currentItem.head_img = file.fileId;
			};
			$scope.reAuthorize = function reAuthorize(){
				nswGlobals.setValue('platform_menus_defaultState', {stop: true}, true);
				nswGlobals.setValue('accountId', null, true);
				nswGlobals.setValue('appId', null, true);
				nswGlobals.setValue('platform_menus_selectedMenu', null, true);
				nswGlobals.setValue('platform_menus_selectedMenuGroup', null, true);
				//$scope.$broadcast('app.exit');
				window.location.href = globals.basAppRoot + 'oauth/goAuthor';
			};
			$scope.chooesAuthorizeWay = function chooesAuthorizeWay(tab) {
				if (tab===1) {
					accountDataSvc.authorizeAotu().then(function () {
						nswGlobals.setValue('platform_menus_defaultState', {stop: true}, true);
						nswGlobals.setValue('accountId', null, true);
						nswGlobals.setValue('appId', null, true);
						nswGlobals.setValue('platform_menus_selectedMenu', null, true);
						nswGlobals.setValue('platform_menus_selectedMenuGroup', null, true);
						window.location.href = globals.basAppRoot + 'oauth/goAuthor';
					});
				} else {
					$scope.isWrite = false;
				}
			};
			$scope.saveAirticle = function saveAirticle() {
					$state.go('wechat.account');
			};
		}]);
}(angular));
