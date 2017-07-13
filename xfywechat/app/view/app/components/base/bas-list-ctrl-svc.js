(function (angular) {
	"use strict";

	angular.module('platform').factory('basListCtrlSvc', ['$state', 'nswGlobals', 'platformModalSvc', 'platformNavigationSvc', 'platformNswAuthSvc',
		function ($state, nswGlobals, platformModalSvc, platformNavigationSvc, platformNswAuthSvc) {
			var service = {};

			/**
			 *
			 * @param $scope
			 * @param dataService
			 * @param options {detailState:''}
			 * @constructor
			 */
			var Constructor = function Constructor($scope, dataService, options) {
				$scope.appId = nswGlobals.getValue('appId');
				$scope.currentItem = dataService.getCurrentItem();
				$scope.dataList = dataService.getDataList();
				$scope.searchOptions = dataService.getSearchOptions();
				$scope.tabs = {};
				$scope.imageUrl = dataService.getImageUrl();
				$scope.options = {};

				var currentItemChanged = function currentItemChanged(item) {
					$scope.currentItem = item;
				};

				var listLoaded = function listLoaded(list) {
					$scope.dataList = list;
					angular.extend($scope.searchOptions, dataService.getSearchOptions());
				};

				var showEdit = function showEdit() {
					if (options && options.detailState) {
						platformNavigationSvc.goState(options.detailState);
					}
				};


				$scope.goState = platformNavigationSvc.goState;

				$scope.setCurrentItem = function setCurrentItem(item) {
					dataService.setCurrentItem(item);
				};

				$scope.selectAll = function selectAll(value) {
					value = !!value;
					_.forEach($scope.dataList, function (item) {
						if ($scope.isItemSelected(item) !== value) {
							$scope.selectItem(item);
						}
					});
				};

				$scope.selectReverse = function selectReverse() {
					_.forEach($scope.dataList, function (item) {
						$scope.selectItem(item);
					});
				};

				$scope.selectItem = function selectItem(item) {
					dataService.selectItem(item);
				};

				$scope.isItemSelected = function isItemSelected(item) {
					return !!_.find(dataService.getSelectedItems(), {_id: item._id});
				};

				$scope.hasSelectedItems = function hasSelectedItems() {
					return dataService.getSelectedItems().length;
				};

				$scope.isCurrentItem = function isCurrentItem(item) {
					return $scope.currentItem === item;
				};

				$scope.searchData = function searchData(options) {
					return dataService.loadData(options);
				};

				$scope.resetSearchData = function resetSearchData(options) {
					angular.extend($scope.searchOptions, {
						pageNum: 1,
						filter: ''
					});
					return dataService.loadData(options);
				};

				$scope.save = function save(item) {
					dataService.updateItem(item);
				};

				$scope.create = function create() {
					dataService.createNew();
					showEdit();
				};

				$scope.edit = function edit(item) {
					dataService.setCurrentItem(item);
					showEdit();
				};

				$scope.remove = function remove(item, tip) {
					var tipMsg = _.isString(tip) ? tip : '确认删除？';

					if (tip) {
						platformModalSvc.showConfirmMessage(tipMsg, '删除提示').then(function () {
							dataService.removeItem(item);
						});
					} else {
						dataService.removeItem(item);
					}
				};

				$scope.selectTab = function selectTab(key) {
					_.forEach($scope.tabs, function (tab, prop) {
						$scope.tabs[prop] = false;
					});
					$scope.tabs[key] = true;
					$scope.tab = key;
				};

				$scope.goBack = function goBack() {

				};

				$scope.getList = function getList() {
					return $scope.dataList;
				};

				$scope.getSelectedItems = function getSelectedItems() {
					return dataService.getSelectedItems();
				};

				// $scope.checkAuthed = function checkAuthed(code) {
				// 	return platformNswAuthSvc.getAuth(code);
				// };

				var onRouteUpdated = function onRouteUpdated() {
					dataService.resetSearchOptions();
					dataService.loadData();
				};

				$scope.omitAttr = dataService.omitAttr;

				dataService.registerCurrentItemChanged(currentItemChanged);
				dataService.registerListLoaded(listLoaded);
				platformNavigationSvc.registerRouteUpdated(onRouteUpdated);

				$scope.$on('$destroy', function () {
					dataService.unregisterCurrentItemChanged(currentItemChanged);
					dataService.unregisterListLoaded(listLoaded);
					dataService.resetSearchOptions();
					platformNavigationSvc.unregisterRouteUpdated(onRouteUpdated);
				});
			};

			service.createInstance = function createInstance($scope, dataService, options) {
				return new Constructor($scope, dataService, options);
			};

			return service;
		}]);
}(angular));