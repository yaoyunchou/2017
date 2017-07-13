(function (angular) {
	"use strict";
	angular.module('massMessage').factory('massMessageSvc', ['$http','$q', 'basDataSvc', 'platformModalSvc', 'nswGlobals',
		function ($http,$q, basDataSvc, platformModalSvc, nswGlobals) {
			var options = {
				requireAppId: true,
				uri:'massmsg/sendMassMsgByJob',
				item: {
					default: {
						groupid: -100,
						massType: 'txt',
						hasDatePicker:false
					},
					afterCreated:function(item){
						item.appId = nswGlobals.getValue('appId');
					},
					prepareCreate:function(service,options){
						if(options.data&&options.data.jobTime===''){
							if(options.data.hasOwnProperty('jobTime')){
								delete  options.data.jobTime;
							}
							options.url = globals.basAppRoot+'massmsg/sendMassMsg';
						}

					},
					prepareRemove:function(service, options){
						options.url = globals.basAppRoot+'massmsg/sendMassMsg';
						options.params.appId = nswGlobals.getValue('appId');
					}
				},
				list: {
					listUri: 'massmsg/massMsgList',
					enablePaging: true,
					enableSearch:true,
					pageSize: 6,
					selectionMode: 'single'
				}
			};
			var service = basDataSvc.createInstance(options);

			service.showArtcileLib = function showArtcileLib() {
				platformModalSvc.showModal({
					controller: 'articleLibCtrl',
					templateUrl: globals.basAppRoute + 'materials/templates/articles-lib.html',
					size: 'lg',
					options: {
						selected: {
							id: service.selected.key
						}
					}
				}).then(function (material) {
					return material;
				});
			};
			service.cancelJob = function cancelJob(jobId){
				var defer = $q.defer();
				var options ={
					method:'get',
					url:globals.basAppRoot+'massmsg/cancelJob',
					params:{
						jobId:jobId
					}
				};
				return $http(options).then(function(res){
					if(res.data.isSuccess){
						defer.resolve(res.data.data);
						platformModalSvc.showSuccessTip(res.data.data);
					}else{
						defer.reject(res.data.data);
						platformModalSvc.showWarmingTip(res.data.data);
					}
					return defer.promise;
				});
			};
			service.loadData();
			return service;
		}]);

}(angular));