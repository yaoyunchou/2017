/*global angular*/
(function (angular) {
	"use strict";
	angular.module("qrCode").controller("QRCodeListCtrl", ['$scope', 'QRCodeSvc', 'basListCtrlSvc','platformModalSvc','$state','qrCodeChartsSvc','platformMenuDataSvc',
		function ($scope, QRCodeSvc, basListCtrlSvc,platformModalSvc,$state,qrCodeChartsSvc,platformMenuDataSvc) {
			basListCtrlSvc.createInstance($scope,QRCodeSvc,{
				detailState: 'wechat.QRCode.detail'
			});
			//var searchOptions = angular.copy($scope.searchOptions);
			$scope.searchData();
			$scope.editItem = function editItem(item){
				$scope.edit(item);
				$scope.goToDetail();
			};
			$scope.getQrUrl = function getQrUrl(){
				QRCodeSvc.getQrUrl($scope.currentItem.type);
			};
			$scope.removeitems = function removeitems() {
				platformModalSvc.showConfirmMessage('确定要批量删除二维码吗？', '温馨提示').then(function () {
					QRCodeSvc.removeItems(_.map(QRCodeSvc.getSelectedItems(), 'id')).then(function () {
						if ($scope.dataList.length <= QRCodeSvc.getSelectedItems().length&&$scope.searchOptions.pageNum!==1) {
							$scope.searchOptions.pageNum--;
							$scope.searchData();
						}
					});
					//var listSize = keyWordReplyDataSvc.getSelectedItems().length;
					//$scope.searchOptions.totalRows -= listSize;

				});

			};
			$scope.download = function download(url){
				QRCodeSvc.download(url);
			};
			$scope.goChart = function goChart(item){
				qrCodeChartsSvc.setChartId(item.id);
				platformMenuDataSvc.selectMenu('二维码统计');
				//$state.go('wechat.qrCodeCharts.detail',{isCheck:true});
			};
			$scope.downloadImg = function download(url){
				var imgWindow = window.open(url);
				imgWindow.document.execCommand('SaveAs ');

			};
			$scope.$on("$destroy",function(){
				if($state.current&&$state.current.url === '/QRCode'){
					$scope.goToDetail();
				}
			});

		}]);
}(angular));