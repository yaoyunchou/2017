(function (angular) {
	"use strict";
	angular.module('account').factory('accountDataSvc', ['basDataSvc', 'nswGlobals', '$http', 'platformModalSvc', '$q', 'platformMenuDataSvc',
		function (basDataSvc, nswGlobals, $http, platformModalSvc, $q, platformMenuDataSvc) {
			var options = {
				requireAppId: false,
				uri: 'account/wxAccountInfo',
				item: {
					default: {
						bindType: 0,
						verify_type_info: -1,
						encryptType: false
					}
				},
				list: {
					enableSearch: true,
					listUri: 'account/getWxAccountList',
					selectionMode: 'single'
				}
			},eidtHistory = {};
			var service = basDataSvc.createInstance(options);
			//service.loadData();

			service.registerCurrentItemChanged(function (currentItem) {
				nswGlobals.setValue('accountId', currentItem.id, true);
				nswGlobals.setValue('appId', currentItem.appId, true);
				nswGlobals.setValue('platform_menus_defaultState', {stop: true}, true);
				platformMenuDataSvc.reloadSystemMenus();
			});

			service.clearCache = function clearCache() {
				nswGlobals.setValue('accountId', null, true);
				nswGlobals.setValue('appId', null, true);
			};

			service.registerListLoaded(function (accounts) {
				var accountId = nswGlobals.getValue('accountId');
				if (accountId && accounts && accounts.length) {
					service.setCurrentItem(_.find(accounts, {id: accountId}));
				}
			});

			service.authorizeAotu = function authorizeAotu() {
				var defer = $q.defer();
				var options = {
					method: 'get',
					url: globals.basAppRoot + 'oauth/authorCheck'
				};
				$http(options).then(function (res) {
					if (res.data.isSuccess) {
						defer.resolve(res.data);
					} else {
						platformModalSvc.showWarmingMessage(res.data.data, '温馨提示');
					}
				});
				return defer.promise;
			};
			service.getEidtHistory = function getEidtHistory(){
				return eidtHistory.back||'欢迎页面';
			};
			service.setEidtHistory = function setEidtHistory(history){
				eidtHistory.back = eidtHistory.current||'';
				eidtHistory.current = history;
			};


			return service;
		}]);

}(angular));