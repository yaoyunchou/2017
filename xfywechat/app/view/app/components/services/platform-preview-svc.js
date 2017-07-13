/*globals _*/
(function (angular) {
	"use strict";
	angular.module('platform').factory('platformPreviewSvc', ['platformModalSvc', 'nswGlobals', '$http', 'platformMessenger', '$q',
		function (platformModalSvc, nswGlobals, $http, PlatformMessenger, $q) {
			var service = {},swichShow = new PlatformMessenger(), currentItem;
			//var dataload = new PlatformMessenger();
			service.showPreveivModal = function showPreveivModal(options, type) {
				return platformModalSvc.showModal({
					backdrop: 'static',
					templateUrl: globals.basAppRoute + 'components/templates/materials/platform-preview-dir.html',
					controller: 'platformPreviewCtrl',
					size: 'lg',
					windowClass:'preview-bg',
					options: {
						information: options,
						type: type
					}
				}).then(function (selectedItem) {
					return selectedItem;
				}, function () {
					return false;
				});
			};
			service.showPreveivSendModal = function showPreveivModal(options) {
				return platformModalSvc.showModal({
					backdrop: 'static',
					templateUrl: globals.basAppRoute + 'components/templates/materials/platform-preview-send-dir.html',
					controller: 'platformPreviewSendCtrl',
					size: 'sm',
					options: {
						information: options
					}
				}).then(function (selectedItem) {
					return selectedItem;
				}, function () {
					return false;
				});
			};
			service.loadArticle = function loadArticle(id) {
				var uri = globals.basAppRoot + 'material/materialInfo';
				var derfer = $q.defer();
				$http({
					method: 'get',
					url: uri,
					params: {
						type: 'news',
						id: id
					}
				}).then(function (res) {
					if (res.data.isSuccess) {
						derfer.resolve(res.data.data);
					} else {
						derfer.reject(res.data.data);
					}
				});
				return derfer.promise;
			};
			service.loadFans = function loadFans() {
				var uri = globals.basAppRoot + 'fans/fansList';
				var derfer = $q.defer();
				$http({
					method: 'get',
					url: uri,
					params: {
						appId:nswGlobals.getValue('appId'),
						pageNum: 1,
						pageSize:100000
					}
				}).then(function (res) {
					if (res.data.isSuccess) {
						var groupTypes = [];
						_.forEach(res.data.data.dataList,function(value){
							groupTypes.push({id:value.openid,name:value.nickname});
						});
						derfer.resolve(groupTypes);
					} else {
						derfer.reject(res.data.data);
					}
				});
				return derfer.promise;
			};
			service.sendMassMsg = function sendMassMsg(data) {
				var uri = globals.basAppRoot + 'massmsg/sendMassMsg';
				var derfer = $q.defer();
				$http({
					method: 'post',
					url: uri,
					params: {
						appId:nswGlobals.getValue('appId')
					},
					data:data
				}).then(function (res) {
					if (res.data.isSuccess) {
						derfer.resolve(res.data.data);
					} else {
						derfer.reject(res.data.data);
					}
				});
				return derfer.promise;
			};
			service.mobilePreview = function mobilePreview(data) {
				var uri = globals.basAppRoot + 'massmsg/preViewNews';
				data.appId = nswGlobals.getValue('appId');
				var derfer = $q.defer();
				$http({
					method: 'post',
					url: uri,
					data:data
				}).then(function (res) {
					if (res.data.isSuccess) {
						derfer.resolve(res.data.data);
					} else {
						derfer.reject(res.data.data);
					}
				});
				return derfer.promise;
			};
			service.setCurrentItem = function setCurrentItem(item) {
				if(!!item.content){
					item.content = service.transformCmsArticle(item.content);
				}
				currentItem = item;
			};
			service.getCurrentItem = function getCurrentItem(){
				swichShow.fire();
				return currentItem;
			};
			service.omitAttr = function omitAttr(item) {
				var attributes = _.toArray(arguments);
				item = attributes.shift();
				_.forEach(attributes, function (attr) {
					if (item && item.hasOwnProperty(attr)) {
						delete item[attr];
					}
				});

			};
			/**
			 * 转换来自CMS的文章，主要是把图片路径转换成图库绝对路径
			 * @param article
			 */
			service.transformCmsArticle = function transformCmsArticle(article){
				var src = /(src\S*=\S*")((?!http|https|ftp)\S+)"/ig;
				return article.replace(src,'$1'+globals.cmsImagePath+'$2"');
			};
			service.registerSwichShow = function registerSwichShow(hander){
				swichShow.register(hander);
			};
			service.unregisterSwichShow = function unregisterSwichShow(handler) {
				swichShow.unregister(handler);
			};
			return service;
		}]);
}(angular));