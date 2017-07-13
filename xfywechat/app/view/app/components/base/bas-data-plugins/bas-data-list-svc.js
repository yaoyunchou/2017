/**
 * options: list{
 *      enablePaging:boolean , #是否允许分页，默认 false
 *      enableSearch:boolean , #是否允许添加搜索条件，默认 false
 *      prepareSearchParam:function #可以通过此方法来修整过滤条件
 *      selectionMode: single, multi #单选、多选 默认 multi
 *      listMethod : get post
 *      pageSize
 * }
 */
(function (angular) {
	"use strict";
	angular.module('platform').factory('basDataListSvc', ['$http', '$q', 'platformMessenger', 'platformModalSvc', 'nswGlobals',
		function ($http, $q, PlatformMessenger, platformModalSvc, nswGlobals) {
			return function (service, local) {
				var enablePaging = !!local.options.list.enablePaging,
					enableSearch = !!local.options.list.enableSearch,
					pageSize = local.options.list.pageSize || 10,
					listUri = local.options.list.listUri || local.options.uri,
					listMethod = local.options.list.listMethod || 'get',
					selectionMode = local.options.list.selectionMode || 'multi',
					requireAppid = angular.isDefined(local.options.requireAppId) ? local.options.requireAppId : true,
					multiRemoveUri = local.options.list.multiRemoveUri || local.options.item.removeUri || local.options.uri,
					prepareMultiRemove = local.options.list.prepareMultiRemove;

				var prepareSearchParam = local.options.list.prepareSearchParam;

				local.dataList = [];
				local.searchOptions = {};
				local.currentSearchOptions = null;
				local.dataProcessors = [];
				local.selectedItems = [];
				local.listLoaded = new PlatformMessenger();
				local.beforeListLoad = new PlatformMessenger();
				local.multiRemoved = new PlatformMessenger();

				/**
				 * 1. 移除列表中的对应项
				 * 2. 移除选中列表中的对应项
				 * @param item
				 */
				var onItemRemoved = function onItemRemoved(item) {
					item = _.isString(item) ? {id: item} : item;
					var index = _.indexOf(local.dataList, {id: item.id});
					_.remove(local.dataList, {id: item.id});
					if (local.currentItem.id === item.id) {
						if (local.dataList.length > index) {
							service.setCurrentItem(local.dataList[index]);
						} else if (local.dataList.length === index && index > 0) {
							service.setCurrentItem(local.dataList[index - 1]);
						}
					} else {
						service.setCurrentItem({});
					}

					if (local.dataList.length === 0) {
						local.searchOptions.pageNum--;
					}
					_.remove(local.selectedItems, {id: item.id});
				};


				local.resetFilterOptions = function resetFilterOptions() {
					local.searchOptions = local.searchOptions || {};

					_.forEach(local.searchOptions, function (value, key) {
						if (local.searchOptions.hasOwnProperty(key)) {
							delete  local.searchOptions[key];
						}
					});

					if (enablePaging) {
						_.extend(local.searchOptions, {
							totalRows: 0,
							pageNum: 1, //currentPage
							totalPages: 0,
							pageSize: pageSize,
							maxSize: 5,
							title: '',
							advanced: {},
							advancedSearch: false
						});
					}
				};

				local.getSearchParam = function getSearchParam(userOptions) {
					var options = angular.copy(local.searchOptions);

					options = _.omit(options, 'advanced');
					options = _.omit(options, 'advancedSearch');
					options = _.omit(options, 'totalRows');
					options = _.omit(options, 'maxSize');

					if (local.currentSearchOptions && local.currentSearchOptions.filter !== options.filter) {
						local.searchOptions.pageNum = options.pageNum = 1;
					}

					local.currentSearchOptions = options;

					angular.extend(local.currentSearchOptions, options);

					if (prepareSearchParam) {
						prepareSearchParam.call(service, local.currentSearchOptions, userOptions);
					}

					return options;
				};

				service.resetSearchOptions = function resetSearchOptions() {
					local.resetFilterOptions();
				};

				service.getSearchOptions = function getSearchOptions() {
					return local.searchOptions;
				};

				service.loadSearchData = function getSearchList(userOptions) {
					var options = {};
					userOptions = userOptions || {};
					userOptions.displayTip = _.isUndefined(userOptions.displayTip) ? true : userOptions.displayTip;
					if (enableSearch) {
						options = local.getSearchParam(userOptions);
						angular.extend(options);
					}

					if (requireAppid) {
						options.appId = nswGlobals.getValue('appId');
					}

					var uri = _.isFunction(listUri) ? listUri.call(this, options) : listUri;
					var queryOptions = {
						method: listMethod,
						url: globals.basAppRoot + uri
					};

					if (queryOptions.method === 'get') {
						queryOptions.params = options;
					} else {
						queryOptions.data = options;
					}

					local.beforeListLoad.fire();
					var promise = $http(queryOptions).then(function (res) {
						var data = res.data;
						if (data.isSuccess) {
							data = data.data;
							local.searchOptions.totalRows = 0;

							if (enablePaging && data.dataList) {
								local.dataList = data.dataList;
								local.searchOptions.totalPages = data.totalPages;
								local.searchOptions.totalRows = data.totalRows;
								local.selectedItems.length = 0;
							}
							if (!enablePaging) {
								local.dataList = data;
								local.searchOptions.totalRows = local.dataList.length;
							}

							local.listLoaded.fire(local.dataList);
							return local.dataList;
						}
						else {
							if (userOptions.displayTip) {
								platformModalSvc.showWarmingMessage(data.data, '温馨提示');
							}
						}
					}, function () {
						console.log('系统异常或网络不给力！');
					});

					if (userOptions.displayTip) {
						platformModalSvc.showLoadingTip('数据加载中!').close(promise);
					}
					return promise;
				};

				service.loadData = function loadData(options) {
					return service.loadSearchData(options);
				};

				/**
				 * 删除项
				 * @param item 被删除的项
				 */
				service.removeItems = function removeItems(items) {
					items = items || service.getSelectedItems();
					var _itemsId = _.map(items, 'id');
					var options = {
						method: 'delete',
						url: globals.basAppRoot + multiRemoveUri,
						params: {ids: _itemsId}
					};

					if (requireAppid) {
						options.params.appId = nswGlobals.getValue('appId');
					}

					if (prepareMultiRemove) {
						prepareMultiRemove(service, options, items);
					}
					var promise = $http(options).then(function (res) {
						if (res.data.isSuccess) {
							local.multiRemoved.fire(items);
							platformModalSvc.showSuccessTip(res.data.data);
							local.searchOptions.totalRows -= items.length;
							_.forEach(_.map(items,'id'), onItemRemoved);
							if (local.options.list.enablePaging && local.searchOptions.totalPages >= 1) {
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

				/**
				 * 选中项，如果是单选状态的话会自动把选中的项设置为当前项，否则加入到选中列表中，而且不改变选中项。
				 * @param item 添加到选中的项
				 */
				service.selectItem = function selectItem(item) {
					if (selectionMode === 'single') {
						local.selectedItems[0] = item;
						service.setCurrentItem(item);
					} else {
						if (!_.find(local.selectedItems, item)) {
							local.selectedItems.push(item);
						} else {
							_.remove(local.selectedItems, item);
						}
					}
				};

				/**
				 * 获得当前选中的项
				 * @returns {*} 返回选中的项
				 */
				service.getSelectedItems = function getSelectedItems() {
					return local.selectedItems;
				};

				/**
				 * 获得当前的数据列表
				 * @returns {Array} 返回所有的数据表副本
				 */
				service.getDataList = function getDataList() {
					return local.dataList;
				};

				/**
				 * 设置当前的数据列表
				 * @param data 新的数据列表
				 * @returns {constructor}
				 */
				service.setDataList = function setDataList(data) {
					local.dataList.length = 0;
					_.forEach(data, function (item, index) {
						local.dataList[index] = item;
					});

					_.forEach(local.dataList, function (item) {
						local.processData(item, local.dataList);
					});

					return service;
				};

				service.registerListLoaded = function registerListLoaded(handler) {
					if (local.dataList) {
						handler.call(this, local.dataList, true);
					}
					local.listLoaded.register(handler);
				};

				service.unregisterListLoaded = function unregisterListLoaded(handler) {
					local.listLoaded.unregister(handler);
				};

				service.registerBeforeListLoad = function registerBeforeListLoad(handler) {
					local.beforeListLoad.register(handler);
				};

				service.unregisterBeforeListLoad = function unregisterBeforeListLoad(handler) {
					local.beforeListLoad.unregister(handler);
				};

				service.registerMultiRemoved = function registerMultiRemoved(handler) {
					local.multiRemoved.register(handler);
				};

				service.unregisterMultiRemoved = function unregisterMultiRemoved(handler) {
					local.multiRemoved.unregister(handler);
				};

				local.init.push(function () {
					service.registerItemRemoved(onItemRemoved);
					local.resetFilterOptions();
				});


			};
		}]);

}(angular));