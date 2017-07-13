(function (angular) {
	"use strict";

	angular.module('member').factory('memberDataSvc', ['$http', 'basDataSvc', 'nswGlobals', 'platformModalSvc', 'memberCtgDataSvc','$q',
		function ($http, basDataSvc, nswGlobals, platformModalSvc, memberCtgDataSvc,$q) {
			var options = {
				uri: 'fans/fansInfo',
				requireAppId: true,
				item: {
					default: {
						//name: 'test'
					}
				},
				list: {
					enablePaging: true,
					enableSearch: true,
					pageSize: 6,
					listUri: function(){
						return memberCtgDataSvc.getCurrentItem()&& memberCtgDataSvc.getCurrentItem().name !=='黑名单' ? 'fansTag/getFansByTag': 'fans/fansList';
					},
					selectionMode: 'multi',
					prepareSearchParam:function(opts){
						if(memberCtgDataSvc.getCurrentItem()){
							if(memberCtgDataSvc.getCurrentItem().name ==='黑名单'){
								opts.groupId = (memberCtgDataSvc.getCurrentItem()||{}).groupid;
							}else {
								opts.tagId = (memberCtgDataSvc.getCurrentItem()||{}).tagId;
							}
						}
					}
				}
			};

			var service = basDataSvc.createInstance(options),
				detailDisplayList = [];

			service.toggleDetailDisplay = function toggleDetailDisplay(item) {
				if (_.find(detailDisplayList, item)) {
					_.remove(detailDisplayList, item);
				} else {
					detailDisplayList.push(item);
				}
			};

			service.isShowDetail = function isShowDetail(item) {
				return !!_.find(detailDisplayList, item);
			};

			service.switchCatalog = function switchCatalog(catalogId) {
				var selectedItems = service.getSelectedItems();
				return $http({
					method: 'post',
					url: globals.basAppRoot + 'fans/moveFansToGroup',
					data: {
						openid: _.map(selectedItems, 'openid'),
						appId: nswGlobals.getValue('appId'),
						groupid: catalogId
					}
				});
			};

			service.userTag = function userTag(arr,openid){
				var defer = $q.defer();
				var tagId = [];
				for(var i = 0;i<arr.length;i++){
					tagId.push(arr[i].tagId+'');
				}

				var options ={
					url:globals.basAppRoot+'fansTag/userTag',
					method:'put',
					params:{
						tagId:tagId,
						openId:openid,
						appId: nswGlobals.getValue('appId')
					}
				};
				if(!openid){
					options.params.openId = _.map(service.getSelectedItems(),'openid');
					options.url =globals.basAppRoot+'fansTag/batchAddUserTag';
					options.method = 'post';
				}
				return $http(options).then(function(res){
					if(res.data.isSuccess){
						defer.resolve(res.data.data);
						service.loadData();
						memberCtgDataSvc.loadData();
						platformModalSvc.showSuccessTip(res.data.data);

					}else{
						defer.reject(res.data.data);
						platformModalSvc.showWarmingTip(res.data.data);
					}
					return defer.promise;
				});


			};

			service.showRenameModal = function showRenameModal(item) {
				options = options || {};
				options.selected = angular.copy(item);
				return platformModalSvc.showModal({
					templateUrl: globals.basAppRoute + 'member/partials/member-rename-partial.html',
					controller: 'memberDetailCtrl',
					size: 'sm',
					options: options
				}).then(function (member) {
					angular.extend(item, member);
					service.updateItem(item);
				});
			};

			var itemUpdted = function itemUpdted() {
				memberCtgDataSvc.loadData();
			};

			var currentCatalogChanged = function currentCatalogChanged(){
				service.loadData();
			};

			memberCtgDataSvc.registerCurrentItemChanged(currentCatalogChanged);
			service.registerItemCreated(itemUpdted);
			service.registerItemRemoved(itemUpdted);
			service.loadData();
			return service;
		}]);

}(angular));