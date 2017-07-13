(function (angular) {
	"use strict";
	angular.module('qrCode').factory('qrCodeChartsSvc', ['$http', 'basDataSvc', 'platformMessenger', 'nswGlobals', '$q', 'platformDateSvc',
		function ($http, basDataSvc, PlatformMessenger, nswGlobals, $q, platformDateSvc) {
			var loadCodeScanDev = new PlatformMessenger(), chartId = '';
			var options = {
				requireAppId: true,
				list: {
					listUri: 'qrCodeMana/scanOneQrcodeList',
					enablePaging: true,
					enableSearch: true,
					pageSize: 10,
					selectionMode: 'multi',
					prepareSearchParam: function (options) {
						options.beginDate = service.getListBeginDate();
						options.endDate = service.getListEndDate();
						options.id = service.getChartId();

					}
				}
			};
			var service = basDataSvc.createInstance(options);

			service.getChartsInfo = function getChartsInfo(id) {
				var defer = $q.defer();
				var options = {
					method: 'get',
					url: globals.basAppRoot + 'qrCodeMana/todayStatistics',
					params: {
						appId: nswGlobals.getValue('appId'),
						id: id
					}
				};
				return $http(options).then(function (res) {
					if (res.data.isSuccess) {
						defer.resolve(res.data.data);
					} else {
						defer.reject(res.data.data);
					}
					return defer.promise;
				});

			};
			service.qrCodeScanDev = function qrCodeScanDev() {
				var defer = $q.defer();
				var options = {
					method: 'get',
					url: globals.basAppRoot + 'qrCodeMana/qrCodeScanDev',
					params: {
						id: service.getChartId(),
						beginDate: service.getBeginDate(),
						endDate: service.getEndDate()
					}
				};
				return $http(options).then(function (res) {
					if (res.data.isSuccess) {
						service.buildDateList(service.getBeginDate(), service.getEndDate(), res.data.data);
						defer.resolve(res.data.data);
					} else {
						defer.reject(res.data.data);
					}
					return defer.promise;
				});

			};
			service.downQrCodeData = function downQrCodeData() {
				var url = globals.basAppRoot + 'qrCodeMana/scanOneQrcodeListExport?id=' + service.getChartId() + '&beginDate=' + service.getListBeginDate() + '&endDate=' + service.getListEndDate();
				window.location.href = url;

			};

			service.buildDateList = function (startDate, endDate, data) {
				var dataArr = [];

				function getDate(datestr) {
					var temp = datestr.split("-");
					return new Date(temp[0], temp[1], temp[2]);
				}

				function filterDate(data, filter) {
					return _.find(data, function (o) {
						return o.scanDate === filter;
					});
				}

				var startTime = getDate(startDate);
				var endTime = getDate(endDate);
				while ((endTime.getTime() - startTime.getTime()) >= 0) {
					var year = startTime.getFullYear();
					var month = startTime.getMonth().toString().length === 1 ? "0" + startTime.getMonth().toString() : startTime.getMonth();
					var day = startTime.getDate().toString().length === 1 ? "0" + startTime.getDate() : startTime.getDate();
					var num = filterDate(data, year + "-" + month + "-" + day);
					if (num) {
						dataArr.push({scanDate: year + "-" + month + "-" + day, count: num.count});
					} else {
						dataArr.push({scanDate: year + "-" + month + "-" + day, count: 0});
						console.log(year + "-" + month + "-" + day);
					}
					startTime.setDate(startTime.getDate() + 1);
				}
				loadCodeScanDev.fire(dataArr);
			};
			service.getBeginDate = function getBeginDate() {
				return start;
			};
			service.setBeginDate = function setBeginDate(date) {
				start = date;
			};
			service.getEndDate = function getEndDate() {
				return end;
			};
			service.setEndDate = function setEndDate(date) {
				end = date;
			};
			service.getListBeginDate = function getListBeginDate() {
				return startList;
			};
			service.setListBeginDate = function setListBeginDate(date) {
				startList = date;
			};
			service.getListEndDate = function getListEndDate() {
				return endList;
			};
			service.setListEndDate = function setListEndDate(date) {
				endList = date;
			};
			service.getChartId = function getChartId() {
				return chartId;
			};
			service.setChartId = function setChartId(data) {
				chartId = data;
			};
			service.registerloadCodeScanDev = function registerloadCodeScanDev(headler) {
				loadCodeScanDev.register(headler);
			};
			service.unregisterloadCodeScanDev = function unregisterloadCodeScanDev(headler) {
				loadCodeScanDev.unregister(headler);
			};
			var start = platformDateSvc.dateRange(), end = new Date().format('yyyy-MM-dd'), startList = platformDateSvc.dateRange(), endList = new Date().format('yyyy-MM-dd');
			return service;
		}]);

}(angular));