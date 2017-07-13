/*global angular*/
(function (angular) {
	"use strict";
	angular.module('qrCode').controller("qrCodeChartsCtrl", ['$scope','$stateParams', 'qrCodeChartsSvc','$state','qrCodeChartsAllSvc','platformMenuDataSvc',
		function ($scope,$stateParams, qrCodeChartsSvc,$state,qrCodeChartsAllSvc,platformMenuDataSvc) {

			$scope.options = {};

			$scope.options.groupTypes = [{id: -100, name: '查看所有二维码'}, {id: -99, name: '查看单个二维码'}];
			$scope.groupTypeSelected = function groupTypeSelected(data){
					if(data !== -99){
						qrCodeChartsSvc.setChartId('');
						$state.go('wechat.qrCodeCharts.all');
						qrCodeChartsSvc.getChartsInfo().then(function (data) {
							$scope.options.info = data;
							$scope.options.id = null;
						});
					}
				qrCodeChartsAllSvc.loadData();
			};
			$scope.getId = function getId(id){
				if(id){
					qrCodeChartsSvc.setChartId(id);
					qrCodeChartsSvc.getChartsInfo(id).then(function (data) {
						$scope.options.info = data;
						$state.go('wechat.qrCodeCharts.detail');
					});
					qrCodeChartsSvc.qrCodeScanDev().then(function(data){
						$scope.options.echartData = data;
					});
				}
			};
			if(qrCodeChartsSvc.getChartId()){
				$scope.options.groupType =-99;
				$scope.options.id = qrCodeChartsSvc.getChartId();
				$scope.getId(qrCodeChartsSvc.getChartId());

			}else{
				qrCodeChartsSvc.getChartsInfo().then(function (data) {
					$scope.options.info = data;
				});
				$scope.options.groupType =-100;
			}
			var qrCodeListLoaded = function qrCodeListLoaded(){
				qrCodeChartsAllSvc.dropDownQrCodeList().then(function(data){
					$scope.qrCodeList = data.dataList;
				});
			};
			qrCodeChartsAllSvc.registerListLoaded(qrCodeListLoaded);
			$scope.downQrCodeData = function downQrCodeData(){
				qrCodeChartsSvc.downQrCodeData();
			};
			$scope.$on('$destroy',function(){
				$scope.options.groupType =-100;
				qrCodeChartsSvc.setChartId('');
				qrCodeChartsAllSvc.unregisterListLoaded(qrCodeListLoaded);
			});
		}]);
}(angular));