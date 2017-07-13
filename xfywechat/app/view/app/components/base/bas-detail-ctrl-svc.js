(function (angular) {
	"use strict";
	angular.module('platform').factory('basDetailCtrlSvc', ['$state', '$q', 'nswGlobals', 'platformModalSvc', 'platformNavigationSvc', 'platformNswAuthSvc',
		function ($state, $q, nswGlobals, platformModalSvc, platformNavigationSvc, platformNswAuthSvc) {

			var service = {};

			/**
			 *
			 * @param $scope
			 * @param dataService
			 * @constructor
			 */
			var Constructor = function Constructor($scope, dataService, options) {
				options = options || {};
				$scope.appId = nswGlobals.getValue('appId');
				$scope.currentItem = dataService.getCurrentItem();
				$scope.tabs = {};
				$scope.options = {};
				$scope.imageUrl = dataService.getImageUrl();
				var initCurrentItem;

				var goList = function goList() {
					if (options && options.listState) {
						platformNavigationSvc.goState(options.listState);
					}
				};

				var currentItemChanged = function currentItemChanged(item) {
					if (options && options.notCopyCurrent) {
						$scope.currentItem = item;
					} else {
						$scope.currentItem = angular.copy(item);
					}
				};

				$scope.goState = platformNavigationSvc.goState;

				$scope.resetForm = function resetForm() {
					dataService.resetCurrentItem();
				};

				$scope.create = function create() {
					dataService.createNew();
				};

				$scope.save = function save(golist, form) {
					var defer = $q.defer();
					options.failed = options.failed || {};
					options.success = options.success || {};
					var tipOptions = options.tip || {};
					tipOptions.loading = tipOptions.loading || {};

					if (_.isObject(golist)) {
						form = golist;
						golist = true;
					}
					golist = _.isUndefined(golist) ? true : golist;
					initCurrentItem = dataService.getCurrentItem();
					var promise = null;

					var displayTip = !(options && options.failed && options.failed.title),
						showLoading;
					if (options && options.tip && _.isFunction(options.tip.showLoading)) {
						showLoading = options.tip.showLoading.call(this);
					} else {
						showLoading = options && options.tip && options.tip.showLoading;
					}


					if ($scope.currentItem.$$new) {
						promise = dataService.saveCreate($scope.currentItem, {
							displayTip: displayTip,
							showLoading: showLoading,
							loadingTip: tipOptions.loading.message
						});
					} else {
						promise = dataService.updateItem($scope.currentItem, {
							displayTip: displayTip,
							showLoading: showLoading,
							loadingTip: tipOptions.loading.message
						});
					}

					promise.then(function (result) {
						if (form) {
							form.$setPristine();
						}

						if (_.isObject(result) && _.has(result, 'id')) {
							angular.extend(initCurrentItem, result);
						}
						if (!displayTip) {
							var tip = _.isString(result) ? result : '数据保存成功';
							tip = options.success.tip ? options.success.tip : tip;
							platformModalSvc.showSuccessTip(tip);
						}

						if (golist) {
							goList();
						}

						defer.resolve(result);

					}, function (error) {
						if (!displayTip) {
							var tip = _.isString(error) ? error : '数据保存失败';
							tip = options.failed.tip ? options.failed.tip : tip;
							platformModalSvc.showWarmingMessage(tip, options.failed.title);
						}
						defer.reject(error);
					});

					return defer.promise;
				};

				$scope.selectTab = function selectTab(key) {
					_.forEach($scope.tabs, function (tab, prop) {
						$scope.tabs[prop] = false;
					});
					$scope.tabs[key] = true;
					$scope.tab = key;
				};

				$scope.omitAttr = dataService.omitAttr;

				$scope.goBack = function goBack() {
					goList();
				};

				// $scope.checkAuthed = function checkAuthed(code) {
				// 	return platformNswAuthSvc.getAuth(code);
				// };

				dataService.registerCurrentItemChanged(currentItemChanged);

				$scope.$on('$destroy', function () {
					dataService.unregisterCurrentItemChanged(currentItemChanged);
				});
			};

			service.createInstance = function createInstance($scope, dataService, options) {
				return new Constructor($scope, dataService, options);
			};

			return service;
		}]);

}(angular));