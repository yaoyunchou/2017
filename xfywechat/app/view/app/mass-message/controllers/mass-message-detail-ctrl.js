/*global angular*/
(function (angular) {
	"use strict";
	angular.module("massMessage").controller("massMessageDetailCtrl", ['$scope', 'nswGlobals', 'massMessageSvc', 'basDetailCtrlSvc', 'memberCtgDataSvc', 'platformNavigationSvc',
		function ($scope, nswGlobals, massMessageSvc, basDetailCtrlSvc, memberCtgDataSvc, platformNavigationSvc) {
			basDetailCtrlSvc.createInstance($scope, massMessageSvc, {
				notCopyCurrent: true,
				failed: {
					title: '群发失败'
				},
				tip: {
					loading: {
						message: '消息发送中...!'
					}
				}
			});
			$scope.hasDatePicker = false;
			$scope.options.groupType = -100;

			$scope.groupTypes = [{id: -100, name: '全部用户'}, {id: -99, name: '按粉丝标签选择'}];

			var init = function init() {
				$scope.options.groupType = ($scope.currentItem.groupid === -100) ? -100 : -99;
				if (!$scope.currentItem || !$scope.currentItem.massType) {
					$scope.create();
				} else if ($scope.currentItem.appId !== nswGlobals.getValue('appId')) {
					$scope.create();
				}
			};

			$scope.groupTypeSelected = function groupTypeSelected(value) {
				if (value === -100) {
					$scope.currentItem.groupid = value;
					$scope.options.groupType = -100;
				} else {
					$scope.options.groupType = -99;
				}
			};

			$scope.imgSelected = function imgSelected() {
				if ($scope.currentItem.hasOwnProperty('mediaId')) {
					delete  $scope.currentItem.mediaId;
				}
				if ($scope.currentItem.hasOwnProperty('content')) {
					delete  $scope.currentItem.content;
				}
			};

			$scope.articleSelected = function articleSelected() {
				if ($scope.currentItem.hasOwnProperty('fileId')) {
					delete  $scope.currentItem.fileId;
				}
				if ($scope.currentItem.hasOwnProperty('content')) {
					delete  $scope.currentItem.content;
				}
			};

			$scope.textChanged = function textChanged() {
				if ($scope.currentItem.hasOwnProperty('mediaId')) {
					delete  $scope.currentItem.mediaId;
				}
				if ($scope.currentItem.hasOwnProperty('fileId')) {
					delete  $scope.currentItem.fileId;
				}
			};
			$scope.getTime = function getTime(){
				$scope.currentItem.jobTime = new Date().format('yyyy-MM-dd hh:mm:ss');
			};
			$scope.reset = function reset(form) {
				var type = $scope.currentItem.massType;
				$scope.create();
				$scope.currentItem.massType = type;
				form.$setPristine();
			};

			var memberCatalogLoaded = function memberCatalogLoaded(catalogs) {
				$scope.memberCatalogs = _.filter(catalogs, function (ctg) {
					return !!ctg.count&&ctg.id!==10000;
				});
			};

			var onCurrentItemChanged = function onCurrentItemChanged(item) {
				$scope.options.groupType = item.groupid === -100 ? -100 : -99;
			};

			var onItemCreated = function onItemCreated() {
				//$scope.formMsg.$setPristine();
				$scope.goToList();
				$scope.create();
			};

			var onMenuChanged = function onMenuChanged(selectedMenu) {
				if ((selectedMenu && selectedMenu.name !== '群发消息') || !$scope.currentItem.massType) {
					massMessageSvc.createNew();
				}
			};
			var save = $scope.save;
			$scope.save = function(flog,form,saveOption){
				if(!$scope.currentItem.hasDatePicker){
					$scope.currentItem.jobTime = '';
				}
				form.$setPristine();
				save.call(flog,form,saveOption);
			};

			memberCtgDataSvc.getSearchOptions().isMass = true;
			memberCtgDataSvc.loadData();
			$scope.omitAttr(memberCtgDataSvc.getSearchOptions(), 'isMass');
			platformNavigationSvc.registerStateUpdated(onMenuChanged);
			memberCtgDataSvc.registerListLoaded(memberCatalogLoaded);
			massMessageSvc.registerCurrentItemChanged(onCurrentItemChanged);
			massMessageSvc.registerItemCreated(onItemCreated);

			//$scope.create();
			$scope.$on('$destroy', function () {
				memberCtgDataSvc.unregisterListLoaded(memberCatalogLoaded);
				massMessageSvc.unregisterCurrentItemChanged(onCurrentItemChanged);
				massMessageSvc.unregisterItemCreated(onItemCreated);
				platformNavigationSvc.unregisterStateUpdated(onMenuChanged);
			});
			init();
		}]);
}(angular));