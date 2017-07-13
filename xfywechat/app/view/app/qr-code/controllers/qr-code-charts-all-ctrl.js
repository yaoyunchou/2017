/*global angular*/
(function (angular) {
	"use strict";
	angular.module("qrCode").controller("qrCodeChartsAllCtrl", ['$scope', 'qrCodeChartsAllSvc', 'basListCtrlSvc','qrCodeChartsSvc','$state',
		function ($scope, qrCodeChartsAllSvc, basListCtrlSvc,qrCodeChartsSvc,$state) {
			basListCtrlSvc.createInstance($scope,qrCodeChartsAllSvc,{});
			if(qrCodeChartsSvc.getChartId()){
				$state.go('wechat.qrCodeCharts.detail');
			}
			$scope.getNewList= function getNewList(data){
				qrCodeChartsAllSvc.setBeginDate(data.start);
				qrCodeChartsAllSvc.setEndDate(data.end);
				$scope.searchData();
			};
			$scope.downQrCodeData = function downQrCodeData(){
				qrCodeChartsAllSvc.downQrCodeData();
			};
		}]);
}(angular));