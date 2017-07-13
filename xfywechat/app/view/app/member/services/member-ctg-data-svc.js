(function (angular) {
	"use strict";

	angular.module('member').factory('memberCtgDataSvc', ['basDataSvc', 'nswGlobals', 'platformModalSvc','$q','$http', function (basDataSvc, nswGlobals, platformModalSvc,$q,$http) {
		var options = {
			uri: 'fansTag/tag',
			requireAppId: true,
			item: {
				prepareLoad: function (service, options) {
					_.omit(options.data, 'tagId');
				},
				prepareRemove: function (service, options, item) {
					options.params.tagId = item.tagId;
					options.params.appId = item.appId;
				},
				afterCreated:function(item){
					item.appId = nswGlobals.getValue('appId');
				},
				default: {}
			},
			list: {
				prepareSearchParam:function( options){
					options.showDefault = true;
				},
				enableSearch:true,
				listUri: 'fansTag/tagList',
				selectionMode: 'single'
				//enablePaging: true
			}
		};

		var service = basDataSvc.createInstance(options),ctgSelectList;
		//replace the default create method, for we not need to set the new item as current item;
		service.createNew = function createNew(){
			var item = {};
			item.appId = nswGlobals.getValue('appId');
			return item;
		};

		service.showCreateModal = function showCreateModal() {
			options = options || {};
			options.selected = service.createNew();
			return platformModalSvc.showModal({
				templateUrl: globals.basAppRoute + 'member/partials/member-catalog-create-partial.html',
				controller: 'memberCatalogCreateCtrl',
				size: 'sm',
				options: options
			});
		};
		service.getFansCount = function getFansCount(){
			var derfer = $q.defer();
			var opt = {
				method:'get',
				url:globals.basAppRoot+'fans/getFansCount',
				params:{
					appId: nswGlobals.getValue('appId')
				}
			};
			return $http(opt).then(function(res){
				if(res.data.isSuccess){
					derfer.resolve(res.data.data);
				}else{
					derfer.reject(res.data.data);
				}
				return derfer.promise;
			});
		};
		service.getCtgDataList = function getCtgDataList(){
			var derfer = $q.defer();
			var opt = {
				method:'get',
				url:globals.basAppRoot+'fansTag/tagList',
				params:{
					appId: nswGlobals.getValue('appId'),
					showDefault:false
				}
			};
			return $http(opt).then(function(res){
				if(res.data.isSuccess){
					ctgSelectList = res.data.data;
					derfer.resolve(res.data.data);
				}else{
					derfer.reject(res.data.data);
				}
				return derfer.promise;
			});
		};
		service.getCtgDataList();
		service.showEditModal = function showEditModal(catalog) {
			options = options || {};
			options.selected =  angular.copy(catalog);
			return platformModalSvc.showModal({
				templateUrl: globals.basAppRoute + 'member/partials/member-catalog-edit-partial.html',
				controller: 'memberCatalogEditCtrl',
				size: 'sm',
				options: options
			});
		};
		service.getCtgSelectList = function getCtgSelectList(){
			return ctgSelectList;
		};

		return service;
	}]);

}(angular));