/*global angular*/
(function (angular) {
	"use strict";
	angular.module("qrCode").controller("qrCodeChartsDetailCtrl", ['$scope', '$state', 'qrCodeChartsSvc', 'basListCtrlSvc', 'platformDateSvc',
		function ($scope, $state, qrCodeChartsSvc, basListCtrlSvc, platformDateSvc) {
			basListCtrlSvc.createInstance($scope, qrCodeChartsSvc, {});
			if (!qrCodeChartsSvc.getChartId()) {
				$state.go('wechat.qrCodeCharts.all');
			}
			qrCodeChartsSvc.qrCodeScanDev().then(function (data) {
				$scope.options.echartData = data;
			});
			$scope.lineConfig = {
				theme: 'vintage',
				dataLoaded: true
			};


			$scope.lineOption = {
				tooltip: {
					trigger: 'axis'
				},
				toolbox: {
					show: true,
					feature: {
						dataZoom: {
							yAxisIndex: 'none'
						},
						dataView: {readOnly: false},
						magicType: {type: ['line', 'bar']},
						restore: {},
						saveAsImage: {}
					}
				},
				xAxis: {
					type: 'category',
					boundaryGap: false,
					data: []
				},
				yAxis: {
					type: 'value',
					axisLine: {
						show: false
					},
					minInterval: 1
				},
				series: [
					{
						name: '扫描次数',
						type: 'line',
						data: [],
						symbol: 'circle',
						itemStyle: {
							normal: {
								color: '#f08300',
								lineStyle: {
									color: '#f08300',
									width: 1
								},
								borderColor: '#f08300'
							}
						}
					}
				]
			};


			$scope.options.dateRange = [{
				range: {
					end: new Date().format('yyyy-MM-dd'),
					start: platformDateSvc.dateRange()
				}, name: '最近7天'},
				{
					range: {end: new Date().format('yyyy-MM-dd'), start: platformDateSvc.dateRange({range: 15})},
					name: '最近15天'
				},
				{
					range: {end: new Date().format('yyyy-MM-dd'), start: platformDateSvc.dateRange({range: 30})},
					name: '最近30天'
				}];


			$scope.options.dateRangeInfo = {end: new Date().format('yyyy-MM-dd'), start: platformDateSvc.dateRange()};
			$scope.options.dateRangeListInfo = $scope.options.dateRangeInfo;
			var loadCodeScanDev = function loadCodeScanDev(data) {
				$scope.lineOption.xAxis.data = _.map(data, 'scanDate');
				$scope.lineOption.series[0].data = _.map(data, 'count');
				$scope.searchData();
			};
			$scope.getDateRangeList = function getDateRangeList(data) {
				qrCodeChartsSvc.setListBeginDate(data.start);
				qrCodeChartsSvc.setListEndDate(data.end);
				$scope.searchData();
			};
			qrCodeChartsSvc.registerloadCodeScanDev(loadCodeScanDev);
			$scope.getNewEchat = function getNewEchat(data) {
				qrCodeChartsSvc.setBeginDate(data.start);
				qrCodeChartsSvc.setEndDate(data.end);
				$scope.options.dateRangeListInfo = data;
				$scope.getDateRangeList(data);
				qrCodeChartsSvc.qrCodeScanDev();
			};
			$scope.$on("$destroy", function () {
				qrCodeChartsSvc.unregisterloadCodeScanDev(loadCodeScanDev);
			});
		}]);
}(angular));