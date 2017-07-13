/*global angular*/
(function (angular) {
	"use strict";
	angular.module("qrCode").controller("QRCodeDetailCtrl", ['$scope', 'nswGlobals', 'QRCodeSvc', 'basDetailCtrlSvc', 'memberCtgDataSvc',
		function ($scope, nswGlobals, QRCodeSvc, basDetailCtrlSvc, memberCtgDataSvc) {
			basDetailCtrlSvc.createInstance($scope, QRCodeSvc, {
				tip: {
					loading: {
						message: '消息发送中...!'
					}
				},
				notCopyCurrent: true,
				listState: 'wechat.QRCode.list'
			});
			//$scope.options.groupType = -100;
			$scope.groupTypes = [{id: -100, name: '全部用户'}, {id: -99, name: '按标签选择'}];
			$scope.options.groupTypes =  [{id: 'temp', name: '临时二维码'}, {id: 'forever', name: '永久二维码'}];
			$scope.options.qrCodeInfo = {mode : 0};
			var init = function init() {
				$scope.options.groupType = $scope.currentItem.groupId  ? -99 : -100;
				if( $scope.currentItem.groupId){
					$scope.currentItem.groupId = parseInt($scope.currentItem.groupId);
				}
				if (!$scope.currentItem || !$scope.currentItem.replyType) {
					$scope.create();
				} else if ($scope.currentItem.appId !== nswGlobals.getValue('appId')) {
					$scope.create();
				}else{
					$scope.options.qrCodeUrl = $scope.currentItem.qrCodeUrl;
					if($scope.currentItem.replyType ==='txt'){
						$scope.currentItem.content = $scope.currentItem.replyContent;
					}else if($scope.currentItem.replyType ==='pic'){
						 $scope.currentItem.fileId = $scope.currentItem.replyContent;
					}else{
						$scope.currentItem.mediaId = $scope.currentItem.replyContent;
					}

				}
				if($scope.currentItem.$$new){
					QRCodeSvc.getQrUrl().then(function(data){
						$scope.currentItem.url = data.url;
						$scope.currentItem.scene_id = data.scene_id;
					});
				}
			};

			$scope.groupTypeSelected = function groupTypeSelected(value) {
				if (value === -100) {
					$scope.options.groupType = -100;
					$scope.currentItem.groupId = null;
				} else {
					$scope.options.groupType = -99;
				}
			};

			$scope.imgSelected = function imgSelected() {
				if ($scope.currentItem.hasOwnProperty('mediaId')) {
					$scope.omitAttr( $scope.currentItem,'mediaId');
				}
				if ($scope.currentItem.hasOwnProperty('content')) {
					delete  $scope.currentItem.content;
				}
			};
			$scope.articleSelected = function articleSelected() {
				if ($scope.currentItem.hasOwnProperty('fileId')) {
					delete  $scope.currentItem.fileId;
				}
				if ($scope.currentItem.hasOwnProperty('content')) {
					delete  $scope.currentItem.content;
				}
			};

			$scope.textChanged = function textChanged() {
				if ($scope.currentItem.hasOwnProperty('mediaId')) {
					delete  $scope.currentItem.mediaId;
				}
				if ($scope.currentItem.hasOwnProperty('fileId')) {
					delete  $scope.currentItem.fileId;
				}
			};

			$scope.reset = function reset(form) {
				var type = $scope.currentItem.massType;
				$scope.create();
				$scope.currentItem.massType = type;
				form.$setPristine();
			};
			var memberCatalogLoaded = function memberCatalogLoaded(catalogs) {
				$scope.memberCatalogs  = catalogs;
			};
			var onItemCreated = function onItemCreated() {
				$scope.goToList();
				$scope.create();
			};
			$scope.changeType = function changeType(type){
				QRCodeSvc.setUrlType(type);
				QRCodeSvc.getQrUrl().then(function(data){
					$scope.currentItem.url = data.url;
					$scope.currentItem.scene_id = data.scene_id;
				});
			};
			$scope.getQrCodeUrl = function getQrCodeUrl(data){
				$scope.options.qrCodeUrl = data;
			};
			var basReset = $scope.reset;
			$scope.reset = function reset(form){
				if($scope.currentItem.style !== 'normal'){
					$('#cancelLogo').click();
				}
				$scope.currentItem.style = 'normal';

				basReset.call(this,form);
			};
			$scope.saveItem = function saveItem(form,saveOptions){
				form.$setPristine();
				if($scope.options.qrCodeUrl!==$scope.currentItem.qrCodeUrl){
					QRCodeSvc.uploadQrCode($scope.options.qrCodeUrl).then(function(data){
						$scope.currentItem.qrCodeUrl = data;
						if($scope.currentItem.replyType ==='txt'){
							$scope.currentItem.replyContent = $scope.currentItem.content;
						}else if($scope.currentItem.replyType ==='pic'){
							$scope.currentItem.replyContent = $scope.currentItem.fileId;
						}else{
							$scope.currentItem.replyContent = $scope.currentItem.mediaId;
						}
						$scope.omitAttr( $scope.currentItem,'mediaId','content','fileId');
						$scope.save(true,form,saveOptions);
					});
				}else{
					if($scope.currentItem.replyType ==='txt'){
						$scope.currentItem.replyContent = $scope.currentItem.content;
					}else if($scope.currentItem.replyType ==='pic'){
						$scope.currentItem.replyContent = $scope.currentItem.fileId;
					}else{
						$scope.currentItem.replyContent = $scope.currentItem.mediaId;
					}
					$scope.omitAttr( $scope.currentItem,'mediaId','content','fileId');
					$scope.save(true,form,saveOptions);
				}
			};


			memberCtgDataSvc.getSearchOptions().isMass = true;
			memberCtgDataSvc.loadData();
			memberCtgDataSvc.registerListLoaded(memberCatalogLoaded);
			QRCodeSvc.registerItemCreated(onItemCreated);
			QRCodeSvc.registerItemUpdated(onItemCreated);

			//$scope.create();
			$scope.$on('$destroy', function () {
				memberCtgDataSvc.unregisterListLoaded(memberCatalogLoaded);
				QRCodeSvc.unregisterItemCreated(onItemCreated);
				QRCodeSvc.unregisterItemUpdated(onItemCreated);
			});

			//$scope.create();

			init();
		}]);
}(angular));