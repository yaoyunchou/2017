/*global angular*/
(function(angular){
    "use strict";
	angular.module("autoReply").controller("noMatchReplyCtrl",['$scope','noMatchReplyDataSvc','basDetailCtrlSvc','nswGlobals','materialsImgDataSvc',function($scope,noMatchReplyDataSvc,basDetailCtrlSvc,nswGlobals,materialsImgDataSvc){
		basDetailCtrlSvc.createInstance($scope, noMatchReplyDataSvc);
		var initSelectTab = $scope.selectTab;
		$scope.selectTab = function selecteTab(tab){
			if(tab===1){
				$scope.currentItem.replyType = 'txt';
			}else{
				$scope.currentItem.replyType = 'pic';
			}
			initSelectTab.apply(this, arguments);
		};


		noMatchReplyDataSvc.loadData().then(function(list){
			if (list.length) {
				var currentItem = list[0];
				noMatchReplyDataSvc.filterData(currentItem);
				noMatchReplyDataSvc.setCurrentItem(currentItem);
				if (currentItem.replyType === 'pic') {
					$scope.selectTab(2);
				}
			} else {
				noMatchReplyDataSvc.createNew();
			}
		});


		$scope.imgurl = 'material/image/upload?appId=' + nswGlobals.getValue('appId');
		$scope.afterImageSelected = function afterImageSelected(image){
			$scope.keyWordImage = image;
			$scope.currentItem.fileId = image.fileId;
		};
		$scope.deleteMaterial = function deleteMaterial(){
			$scope.keyWordImage = null;
		};
		$scope.changeFile = function changeFile(img){
			$scope.keyWordImage = img;
			$scope.currentItem.fileId = img.fileId;
		};
		$scope.replaySave = function replySave(){
			$scope.save(true, $scope.formmaterials);
			$scope.currentItem.$$new = false;
		};
		$scope.textReset = function textReset(){
			$scope.currentItem.content ='';
		//	$scope.currentItem.fileId = '';
		//	$scope.keyWordImage = null;
		};
		$scope.imgReset = function imgReset(){
				$scope.currentItem.fileId = '';
			//	$scope.keyWordImage = null;
		};





	}]);
}(angular));