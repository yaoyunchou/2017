(function (angular) {
	"use strict";
	angular.module("member").controller("memberListCtrl", ['$scope', 'basListCtrlSvc', 'platformModalSvc', 'memberDataSvc', 'memberCtgDataSvc',
		function ($scope, basListCtrlSvc, platformModalSvc, memberDataSvc, memberCtgDataSvc) {
			basListCtrlSvc.createInstance($scope, memberDataSvc, {
				detailState: 'wechat.memberDetail'
			});
			$scope.formOptions = {};
			$scope.formOptions.isAllSelected = false;
			$scope.options.showEmptyTip = false;
			$scope.selectArr = [];
			$scope.createCatalog = function createCatalog() {
				memberCtgDataSvc.showCreateModal();
			};

			$scope.toggleDetailDisplay = function toggleDetailDisplay(item) {
				memberDataSvc.toggleDetailDisplay(item);
			};

			$scope.isShowDetail = function isShowDetail(item) {
				return memberDataSvc.isShowDetail(item);
			};

			$scope.selectCatalog = function selectCatalog(ctg) {
				$scope.hasGroupSelected = _.isNumber(ctg.groupid);
				$scope.selectedCatalog = ctg;
				$scope.searchOptions.pageNum = 1;
				memberCtgDataSvc.setCurrentItem(ctg);
			};
			$scope.getTotal = function getTotal() {
				return $scope.Alllist;
			};

			$scope.switchToCatalog = function switchToCatalog(item, value) {
				if (item && !$scope.isItemSelected(item)) {
					$scope.selectItem(item);
				}
				if(value === 1){
					platformModalSvc.showConfirmMessage('加入黑名单后，你将无法接收该粉丝发来的消息，且该粉丝无法接收公众号发出的消息，确认加入黑名单？','温馨提示').then(function(){
						memberDataSvc.switchCatalog(value).then(function () {
							platformModalSvc.showSuccessTip('粉丝转移成功！');
							/*$scope.searchOptions.groupId = value;*/
							$scope.searchOptions.pageNum = 1;

							memberCtgDataSvc.loadData().then(function () {
								//memberCtgDataSvc.setCurrentItem(_.find(memberCtgDataSvc.getDataList(), {groupid: value}));
								memberDataSvc.loadData();
								$scope.formOptions.isAllSelected = false;
							});
						});
					});
				}else{
					platformModalSvc.showConfirmMessage('确定移出黑名单吗?移除黑名单的粉丝默认属于全部用户 ','温馨提示').then(function(){
						memberDataSvc.switchCatalog(value).then(function () {
							platformModalSvc.showSuccessTip('粉丝转移成功！');
							/*$scope.searchOptions.groupId = value;*/
							$scope.searchOptions.pageNum = 1;

							memberCtgDataSvc.loadData().then(function () {
								//memberCtgDataSvc.setCurrentItem(_.find(memberCtgDataSvc.getDataList(), {groupid: value}));
								memberDataSvc.loadData();
								$scope.formOptions.isAllSelected = false;
							});
						});
					});
				}


			};

			$scope.toggleSubCatalogs = function toggleSubCatalogs() {
				//$scope.selectCatalog({});
				$scope.showSubCatalogs = !$scope.showSubCatalogs;
			};

			$scope.getTabTitle = function getTabTitle() {
				var current = memberCtgDataSvc.getCurrentItem();
				if(current&&current.name==='黑名单'){
					return current.name + '(' + $scope.blacklist + ')';
				}
				if (!current || !current.name) {
					current = {$$key: 'all', name: '全部用户', count: $scope.getTotal()};
				}
				return current.name + '(' + ($scope.searchOptions.totalRows || 0) + ')';
			};

			$scope.removeCatalog = function removeCatalog(catalog, e) {
				e.stopPropagation();

				var tip = catalog.count ? '删除标签将会把该已有成员全部移动至未分组里。是否确定删除？' : '你确定删除此标签吗？删除后将不再显示。';

				platformModalSvc.showConfirmMessage(tip, '温馨提示').then(function () {
					memberCtgDataSvc.removeItem(catalog).then(function () {
						memberCtgDataSvc.loadData().then(function () {
							$scope.searchOptions.pageNum = 1;
							$scope.searchOptions.tagId =null;
							$scope.selectCatalog({});
							memberDataSvc.loadData();
							$scope.formOptions.isAllSelected = false;
						});

						platformModalSvc.showSuccessTip('删除成功');
					});
				});
			};

			$scope.editCatalog = function removeCatalog(catalog, e) {
				e.stopPropagation();
				var target = angular.copy(catalog);
				memberCtgDataSvc.showEditModal(target).then(function (result) {
					angular.extend(catalog, result);
				});
			};
			var getListChage = $scope.getList;
			$scope.getList = function getList(){
				var dataList = getListChage.apply(this);
				if($scope.currentCatalog&&$scope.currentCatalog.groupid===1){
					return  dataList;
				}else {
					return _.filter(dataList, function(o) { return o.groupid!==1; });
				}
			};
			$scope.editNickName = function editNickName(item) {
				memberDataSvc.showRenameModal(item);
			};

			$scope.isDefaultCatalog = function isDefaultCatalog(item) {
				return _.includes(['黑名单', '未分组', '星标组'], item.name);
			};

			var catalogLoaded = function catalogLoaded(items) {
				$scope.catalogList = items;
				memberCtgDataSvc.getFansCount().then(function(data){
					$scope.blacklist = data.hmdNum;
					$scope.Alllist = data.allNum;
				});
			};

			//var isDefault = true;
			var listLoaded = function listLoaded(data, isDefault) {
				$scope.formOptions.isAllSelected = false;
				$scope.options.showEmptyTip = !data.length && !isDefault;
				$scope.getTabTitle();

			};

			var currentCatalogChanged = function currentCatalogChanged(catalog) {
				$scope.currentCatalog = catalog;
			};
			$scope.deleteTag = function deleteTag(item,tag){
				item.tagid_list = _.filter(item.tagid_list,function(o){ return o.name !== tag.name;});
				memberDataSvc.userTag(item.tagid_list,item.openid);
			};

			$scope.searchData();
			memberDataSvc.registerListLoaded(listLoaded);
			memberCtgDataSvc.registerListLoaded(catalogLoaded);
			memberCtgDataSvc.loadData();
			memberCtgDataSvc.registerCurrentItemChanged(currentCatalogChanged);

			$scope.$on('$destroy', function () {
				$scope.selectCatalog({});
				memberDataSvc.unregisterListLoaded(catalogLoaded);
				memberCtgDataSvc.unregisterListLoaded(catalogLoaded);
				memberCtgDataSvc.unregisterCurrentItemChanged(currentCatalogChanged);
			});
		}]);
}(angular));