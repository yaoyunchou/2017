(function (angular) {
	"use strict";
	angular.module('qrCode').factory('qrCodeChartsAllSvc', ['$http', 'basDataSvc', 'platformModalSvc', 'nswGlobals','$q','platformDateSvc',
		function ($http, basDataSvc, platformModalSvc, nswGlobals,$q,platformDateSvc) {
			var options = {
				requireAppId: true,
				list: {
					listUri: 'qrCodeMana/list',
					enablePaging: true,
					enableSearch:true,
					pageSize: 10,
					selectionMode: 'multi',
					prepareSearchParam:function( options){
						options.beginDate = service.getBeginDate();
						options.endDate = service.getEndDate();

					}
				}
			};
			var service = basDataSvc.createInstance(options);
			service.getBeginDate = function getBeginDate(){
				return start;
			};
			service.setBeginDate = function setBeginDate(date){
				start = date;
			};
			service.getEndDate = function getEndDate(){
				return end;
			};
			service.setEndDate = function setEndDate(date){
				end = date;
			};
			service.downQrCodeData = function downQrCodeData(){
				var url = globals.basAppRoot+'qrCodeMana/downQrCodeData?appId='+nswGlobals.getValue('appId')+'&beginDate='+service.getBeginDate()+'&endDate='+service.getEndDate();
				window.location.href = url;

			};
			service.dropDownQrCodeList = function dropDownQrCodeList(){
				var defer = $q.defer();
				var options ={
					method:'get',
					url:globals.basAppRoot+'qrCodeMana/list',
					params:{
						appId:nswGlobals.getValue('appId'),
						pageSize: 1000000,
						pageNum:1
					}
				};
				return $http(options).then(function(res){
					if(res.data.isSuccess){
						defer.resolve(res.data.data);
					}else{
						defer.reject(res.data.data);
					}
					return defer.promise;
				});

			};
			var start = platformDateSvc.dateRange({range:30}),end= new Date().format('yyyy-MM-dd');
			service.loadData();
			return service;
		}]);

}(angular));