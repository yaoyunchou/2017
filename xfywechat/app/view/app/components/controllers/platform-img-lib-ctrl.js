/*globals _*/
(function (angular) {
	"use strict";
	angular.module('platform').controller('imgLibCtrlx', ['$scope', '$modalInstance', 'platformImgLibSvc', 'platformModalSvc','nswGlobals',
		function ($scope, $modalInstance, platformImgLibSvc,  platformModalSvc,nswGlobals) {
			$scope.imgurl = 'material/image/upload?appId=' + nswGlobals.getValue('appId');
			platformImgLibSvc.loadWechatData();
			platformImgLibSvc.registerdataload(function(data){
				$scope.dataList = data;
			});
			$scope.setCurrentItem = function setCurrentItem(item){
				$scope.currentItem = item;
			};
			$scope.changeFile = function changeFile(file){
				$scope.currentItem = file;
				$scope.closeModal('true',$scope.currentItem);
			};
			$scope.ok = function ok(){
				$scope.closeModal('true',$scope.currentItem);
			};
		}]);

}(angular));