/**
 *
 * options: item {
 *      default:{name:'allen', age:18....} #设置创建时的默认值。
 *      .prepareCreate:function
 *      prepareUpdate:function
 *      prepareRemove:function
 *      prepareLoad:function
 *      itemReseted:function
 *      createUri:string
 *      updateUri:string
 *      removeUri:string
 *      loadUri:string
 * }
 */
(function (angular) {
	"use strict";
	angular.module('platform').factory('basDataItemSvc', ['$http', '$q', 'platformMessenger', 'platformModalSvc', 'nswGlobals',
		function ($http, $q, PlatformMessenger, platformModalSvc, nswGlobals) {
			return function (service, local) {
				local.currentItem = {};

				var defaultVal = local.options.item.default;
				var afterCreated = local.options.item.afterCreated || angular.noop;
				var prepareCreate = local.options.item.prepareCreate || angular.noop;
				var prepareUpdate = local.options.item.prepareUpdate || angular.noop;
				var prepareRemove = local.options.item.prepareRemove || angular.noop;
				var prepareLoad = local.options.item.prepareLoad || angular.noop;
				var itemReseted = local.options.item.itemReseted || angular.noop;
				var createUri = local.options.item.createUri || local.options.uri;
				var updateUri = local.options.item.updateUri || local.options.uri;
				var removeUri = local.options.item.removeUri || local.options.uri;
				var loadUri = local.options.item.loadUri || local.options.uri;
				/*var requireAppId  = angular.isDefined(local.options.requireAppId) ? local.options.requireAppId : true;*/

				local.itemCreated = new PlatformMessenger();
				local.itemUpdated = new PlatformMessenger();
				local.itemRemoved = new PlatformMessenger();
				local.itemLoaded = new PlatformMessenger();
				local.currentItemChanged = new PlatformMessenger();

				/**
				 * 设置当前项
				 * @param item
				 */
				service.setCurrentItem = function setCurrentItem(item) {
					local.currentItem = item;
					local.currentItemChanged.fire(item);
				};

				/**
				 * 取得当前项
				 * @returns {{}}
				 */
				service.getCurrentItem = function getCurrentItem() {
					return local.currentItem;
				};

				service.resetCurrentItem = function resetCurrentItem() {
					defaultVal = local.options.item.default;
					angular.extend(local.currentItem, defaultVal);
					itemReseted(local.currentItem);
				};

				/**
				 * 创建新的项
				 */
				service.createNew = function createNew() {
					defaultVal = local.options.item.default;

					if (_.has(defaultVal, 'appId')) {
						defaultVal.appId = nswGlobals.getValue('appId');
					}


					var created = angular.copy(defaultVal);
					created.$$new = true;
					afterCreated.call(service, created);
					service.setCurrentItem(created);
					//local.itemCreated.fire(created);
					return created;
				};

				/**
				 * 保存新增
				 * @param item 被保存的项
				 */
				service.saveCreate = function saveCreate(item, userOptions) {
					item = item || local.currentItem;
					userOptions = userOptions || {};
					userOptions.displayTip = _.isUndefined(userOptions.displayTip) ? true : userOptions.displayTip;
					var defer = $q.defer();

					var itemToSave = angular.copy(item);
					_.omit(itemToSave, '$$new');
					var options = {
						method: 'post',
						url: globals.basAppRoot + createUri,
						data: itemToSave
					};

					if (prepareCreate) {
						prepareCreate(service, options);
					}
					$http(options).then(function (res) {
						if (res.data.isSuccess) {
							_.omit(item, '$$new');
							angular.extend(item, res.data.data);
							if (userOptions.displayTip) {
								var tip = _.isString(res.data.data) ? res.data.data : '保存成功';
								platformModalSvc.showSuccessTip(tip);
							}
							local.searchOptions.totalRows++;
							if (local.dataList.length >= local.searchOptions.pageSize) {
								local.searchOptions.filter = '';
								local.searchOptions.pageNum = 1;
								service.loadData();
							} else {
								local.dataList.push(res.data.data);
							}

							defer.resolve(res.data.data);
							local.itemCreated.fire(res.data.data);

						} else {
							if (userOptions.displayTip) {
								platformModalSvc.showWarmingMessage(res.data.data, '失败提示');
							}
							defer.reject(res.data.data);
						}

						return res.data;
					}, function (error) {
						defer.reject(error);
					});
					var showLoading = _.isBoolean(userOptions.showLoading) ? userOptions.showLoading : userOptions.displayTip;
					if (showLoading) {
						platformModalSvc.showLoadingTip(userOptions.loadingTip || '保存中...').close(defer.promise);
					}
					return defer.promise;
				};

				/**
				 * 保存更新
				 * @param item 被保存对象
				 */
				service.updateItem = function updateItem(item, userOptions) {
					item = item || local.currentItem;
					userOptions = userOptions || {};
					userOptions.displayTip = _.isUndefined(userOptions.displayTip) ? true : userOptions.displayTip;
					var defer = $q.defer();

					var options = {
						method: 'put',
						url: globals.basAppRoot + updateUri,
						data: item
					};
					if (prepareUpdate) {
						prepareUpdate(service, options);
					}
					$http(options).then(function (res) {
						if (res.data.isSuccess) {
							angular.extend(item, res.data.data);
							if (userOptions.displayTip) {
								platformModalSvc.showSuccessTip('保存成功');
							}
							defer.resolve(res.data.data);
							local.itemUpdated.fire(res.data.data);

						} else {
							if (userOptions.displayTip) {
								platformModalSvc.showWarmingMessage(res.data.data, '保存失败');
							}
							defer.reject(res.data.data);
						}
					}, function (error) {
						defer.reject(error);
					});
					var showLoading = _.isBoolean(userOptions.showLoading) ? userOptions.showLoading : userOptions.displayTip;
					if (showLoading) {
						platformModalSvc.showLoadingTip(userOptions.loadingTip ||'保存中...').close(defer.promise);
					}
					return defer.promise;
				};

				/**
				 * 删除项
				 * @param item 被删除的项
				 */
				service.removeItem = function removeItem(item) {
					item = item || local.currentItem;
					var options = {
						method: 'delete',
						url: globals.basAppRoot + removeUri,
						params: {id: item.id}
					};
					if (prepareRemove) {
						prepareRemove(service, options, item);
					}
					var promise = $http(options).then(function (res) {
						if (res.data.isSuccess) {
							local.itemRemoved.fire(item);
							platformModalSvc.showSuccessTip(res.data.data);
							local.searchOptions.totalRows--;
							if (local.options.list.enablePaging && local.searchOptions.totalPages > 1) {
								service.loadData();
							}
						} else {
							platformModalSvc.showWarmingMessage(res.data.data, '删除失败');
						}
						return res.data;
					});
					platformModalSvc.showLoadingTip('数据移除中!').close(promise);
					return promise;
				};

				service.loadItemById = function loadItemById(id) {
					var options = {
						method: 'get',
						url: globals.basAppRoot + loadUri,
						params: {id: id}
					};
					if (prepareLoad) {
						prepareLoad(service, options);
					}
					var promise = $http(options).then(function (res) {
						if (res.data.isSuccess) {
							local.itemLoaded.fire(res.data.data);
							return res.data.data;
						} else {
							platformModalSvc.showWarmingMessage(res.data.data, '数据获取失败');
						}
					});
					platformModalSvc.showLoadingTip('数据加载中!').close(promise);
					return promise;
				};

				service.omitAttr = function omitAttr(item) {
					var attributes = _.toArray(arguments);
					item = attributes.shift(0);
					_.forEach(attributes, function (attr) {
						if (item && item.hasOwnProperty(attr)) {
							delete item[attr];
						}
					});
				};

				service.getImageUrl = function getImageUrl() {
					return globals.imageUrl.replace(/@appId/, nswGlobals.getValue('appId'));
				};

				service.registerItemCreated = function registerItemCreated(handler) {
					local.itemCreated.register(handler);
				};

				service.unregisterItemCreated = function unregisterItemCreated(handler) {
					local.itemCreated.unregister(handler);
				};

				service.registerItemUpdated = function registerItemUpdated(handler) {
					local.itemUpdated.register(handler);
				};

				service.unregisterItemUpdated = function unregisterItemUpdated(handler) {
					local.itemUpdated.unregister(handler);
				};

				service.registerItemRemoved = function registerItemRemoved(handler) {
					local.itemRemoved.register(handler);
				};

				service.unregisterItemRemoved = function unregisterItemRemoved(handler) {
					local.itemRemoved.unregister(handler);
				};

				service.registerItemLoaded = function registerItemLoaded(handler) {
					local.itemLoaded.register(handler);
				};

				service.unregisterItemLoaded = function unregisterItemLoaded(handler) {
					local.itemLoaded.unregister(handler);
				};

				service.registerCurrentItemChanged = function registerCurrentItemChanged(handler) {
					if (local.currentItem && !_.isEmpty(local.currentItem)) {
						handler.call(this, local.currentItem, true);
					}
					local.currentItemChanged.register(handler);
				};

				service.unregisterCurrentItemChanged = function unregisterCurrentItemChanged(handler) {
					local.currentItemChanged.unregister(handler);
				};
			};
		}]);

}(angular));