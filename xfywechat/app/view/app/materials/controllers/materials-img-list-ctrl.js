/*global angular*/
(function (angular) {
	"use strict";
	angular.module("materials").controller("materialsImgListCtrl", ['$scope', 'materialsImgDataSvc', 'basListCtrlSvc', 'platformModalSvc',
		function ($scope, materialsImgDataSvc, basListCtrlSvc, platformModalSvc) {
			basListCtrlSvc.createInstance($scope, materialsImgDataSvc);
			$scope.ids = [];
			$scope.check = function check(item) {
				if (_.has(item, 'ischeck') && item.ischeck) {
					$scope.ids.push(item.id);
				} else {
					_.remove($scope.ids, function (n) {
						return n === item.id;
					});
				}

			};
			$scope.deleteimgs = function deleteimgs() {
				platformModalSvc.showConfirmMessage('确认删除选中的图片？', '删除提示').then(function () {
					materialsImgDataSvc.removeItems($scope.ids.toString()).then(function (data) {
						if (data.isSuccess) {
							$scope.ids.length = 0;
						}
					});
				});
			};
			$scope.editImgName = function editImgName(item) {
				materialsImgDataSvc.editImgName(item);
			};
			$scope.editNickName = function editNickName(item) {
				materialsImgDataSvc.showRenameModal(item);
			};
			$scope.allimg = function allimg() {
				$scope.searchOptions.filter = '';
				$scope.searchData();
			};
			$scope.searchData();

		}]);
}(angular));