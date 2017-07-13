(function (angular) {
	"use strict";
	angular.module('qrCode').factory('QRCodeSvc', ['$http', 'basDataSvc', 'platformModalSvc', 'nswGlobals','$q',
		function ($http, basDataSvc, platformModalSvc, nswGlobals,$q) {
			var options = {
				requireAppId: true,
				uri:'qrCodeMana/qrCode',
				item: {
					default: {
						groupid: -100,
						replyType: 'txt',
						reply:false,
						type:'forever',
						style:'normal'
					},
					afterCreated:function(item){
						item.appId = nswGlobals.getValue('appId');
					},
					prepareRemove:function(service, options){
						options.params.appId = nswGlobals.getValue('appId');
						options.params.ids = options.params.id;
					}
				},
				list: {
					listUri: 'qrCodeMana/list',
					enablePaging: true,
					enableSearch:true,
					pageSize: 10,
					selectionMode: 'multi'
				}
			};
			var service = basDataSvc.createInstance(options),urlType = 'forever',isNew = true;

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
			service.getQrUrl = function getQrUrl(){
				var defer = $q.defer();
				var options = {
					method:'get',
					url:globals.basAppRoot+'qrCodeMana/getQrCodeUrl',
					params:{
						type:service.getUrlType(),
						appId:nswGlobals.getValue('appId')
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
			service.uploadQrCode = function uploadQrCode(data){
				var defer = $q.defer();
				var options = {
					method:'post',
					url:'/wx/file/local/uploadBase64',
					data:{image:data}
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
			service.download = function download(url){

					window.open(globals.basAppRoot+'qrCodeMana/downQrCode?url='+url);

			};
			service.removeItems = function removeItems(ids) {
				var options = {
					method: 'delete',
					url: globals.basAppRoot + 'qrCodeMana/qrCode',
					params: {ids: ids, appId: nswGlobals.getValue('appId')}
				};
				return $http(options).then(function (res) {
					if (res.data.isSuccess) {
						var pageNum = service.getSearchOptions();
						if (service.getDataList().length === ids.length&&pageNum>1) {
							pageNum.pageNum--;
							service.loadData();
						}
						service.loadData();
						platformModalSvc.showSuccessTip(res.data.data);
					} else {
						platformModalSvc.showWarmingMessage(res.data.data, '删除失败');
					}
					return res.data;
				});
			};
			service.setUrlType = function setUrlType(type){
				urlType = type;
			};
			service.getUrlType = function getUrlType(){
				return urlType;
			};
			service.setIsNew = function setIsNew(type){
				isNew = type;
			};
			service.getIsNew = function getIsNew(){
				return isNew;
			};
			return service;
		}]);

}(angular));