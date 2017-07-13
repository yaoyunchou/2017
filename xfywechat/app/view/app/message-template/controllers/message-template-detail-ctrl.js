/*global angular*/
(function (angular) {
	"use strict";
	angular.module("messageTemplate").controller("messageTemplateDetailCtrl", ['$scope', 'nswGlobals', 'messageTemplateSvc', 'basDetailCtrlSvc', 'memberCtgDataSvc',
		function ($scope, nswGlobals, messageTemplateSvc, basDetailCtrlSvc, memberCtgDataSvc) {
			basDetailCtrlSvc.createInstance($scope, messageTemplateSvc, {
				tip: {
					loading: {
						message: '消息发送中...!'
					}
				},
				notCopyCurrent: true,
				listState: 'wechat.messageTemplate.list'
			});
			$scope.groupTypes = [{id: -100, name: '全部用户'}, {id: -99, name: '按粉丝标签选择'}];
			$scope.options.preview = false;
			var init = function init() {
				if (!$scope.currentItem) {
					$scope.create();
				} else if ($scope.currentItem.appId !== nswGlobals.getValue('appId')) {
					$scope.create();
				} else {
					if ($scope.currentItem.content) {
						$scope.options.para = messageTemplateSvc.resolveTemplateKeys($scope.currentItem.content);
					}
					if($scope.currentItem.groupId) {
						$scope.currentItem.groupId = parseInt($scope.currentItem.groupId);
					}
				}
				$scope.options.groupType = ($scope.currentItem.groupId !== -99) ? -100 : -99;
				$scope.options.showPreview = false;
				messageTemplateSvc.getAllTemplate().then(function (data) {
					$scope.options.allTemplate = data;
				});
			};
			$scope.changeTemplateId = function (template) {
				$scope.options.groupType = ($scope.currentItem.groupId !== -99) ? -100 : -99;
				$scope.currentItem.content = template.content;
				$scope.currentItem.templateId = template.template_id;
				if ($scope.currentItem.content) {
					$scope.options.para = messageTemplateSvc.resolveTemplateKeys($scope.currentItem.content);
				}
			};
			$scope.isUrlChanged = function isUrlChanged() {
				//为空时后端会默认加了个#
				if (!$scope.currentItem.url || $scope.currentItem.url === '#') {
					$scope.currentItem.url = 'http://';
				}
			};
			$scope.getTime = function getTime() {
				$scope.currentItem.sendTime = new Date().format('yyyy-MM-dd hh:mm:ss');
			};
			$scope.groupTypeSelected = function groupTypeSelected(value) {
				if (value === -99 && !$scope.memberCatalogs.length) {
					memberCtgDataSvc.loadData();
				}else{
					$scope.currentItem.groupId = null;
				}

			};
			var memberCatalogLoaded = function memberCatalogLoaded(catalogs) {
				$scope.memberCatalogs = _.filter(catalogs, function (ctg) {
					return !!ctg.count && ctg.id !== 10000;
				});
			};

			$scope.saveItem = function saveItem(form, saveOptions) {
				if(!$scope.currentItem.groupId){
					$scope.currentItem.groupId = -100;
				}
				form.$setPristine();
				$scope.save(true, form, saveOptions);
				$scope.goToList();
			};
			$scope.togglePreview = function togglePreview() {
				$scope.options.showPreview = !$scope.options.showPreview;
				if ($scope.options.showPreview) {
					$scope.options.previewConent = messageTemplateSvc.transformKeywords($scope.currentItem.content, $scope.currentItem.para);
				}
			};

			$scope.updatePreview = function updatePreview() {
				if ($scope.options.showPreview) {
					$scope.options.previewConent = messageTemplateSvc.transformKeywords($scope.currentItem.content, $scope.currentItem.para);
				}
			};
			$scope.hasTime = function hasTime(str){
				return !str.search('time')
			};
			memberCtgDataSvc.registerListLoaded(memberCatalogLoaded);

			init();
			$scope.$on('$destroy', function () {
				memberCtgDataSvc.unregisterListLoaded(memberCatalogLoaded);
			});
		}]);
}(angular));