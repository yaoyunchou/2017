(function (angular) {
	"use strict";
	angular.module('messageTemplate').factory('messageTemplateSvc', ['$http', 'basDataSvc', 'platformModalSvc', 'nswGlobals', '$q',
		function ($http, basDataSvc, platformModalSvc, nswGlobals, $q) {
			var options = {
				requireAppId: true,
				uri: 'templateMsg/template',
				item: {
					default: {
						job: false
					},
					afterCreated: function (item) {
						item.appId = nswGlobals.getValue('appId');
					},
					prepareRemove: function (service, options) {
						options.params.appId = nswGlobals.getValue('appId');
						options.params.ids = options.params.id;
					}
				},
				list: {
					listUri: 'templateMsg/list',
					enablePaging: true,
					enableSearch: true,
					pageSize: 10,
					selectionMode: 'multi',
					prepareMultiRemove: function (service, options) {
						service.omitAttr(options, 'appId');
					}
				}
			};
			var service = basDataSvc.createInstance(options);

			service.toggleStatus = function toggleStatus(item) {
				item.status = !item.status;
				service.updateItem(item, {
					loadingTip: '状态更新中...',
					displayTip: false,
					showLoading: true
				}).then(function () {
					platformModalSvc.showSuccessTip('状态更新成功!');
				}, function (err) {
					platformModalSvc.showWarmingMessage(err, '操作失败');
				});
			};

			service.cancelJob = function cancelJob(id){
				var defer = $q.defer();
				var options = {
					method: 'post',
					url: globals.basAppRoot + 'templateMsg/cancleJob',
					params: {
						id: id
					}
				};
				$http(options).then(function (res) {
					if (res.data.isSuccess) {
						defer.resolve(res.data.data);
						service.loadData();
						platformModalSvc.showSuccessTip(res.data.data);
					} else {
						platformModalSvc.showWarmingMessage(res.data.data, '操作失败');
					}
				});
				return defer.promise;
			};

			service.getAllTemplate = function getAllTemplate() {
				var defer = $q.defer();
				var options = {
					method: 'get',
					url: globals.basAppRoot + 'templateMsg/getAllTemplate',
					params: {
						appId: nswGlobals.getValue('appId')
					}
				};
				$http(options).then(function (res) {
					if (res.data.isSuccess) {
						defer.resolve(res.data.data);
					} else {
						defer.reject(res.data.data);
					}
				});
				return defer.promise;
			};

			service.transformKeywords = function transformKeywords(template, keywords) {
				keywords = keywords || {};
				return template.replace(/(\{\{[^\}]+\}\})/ig, function (src, keyword) {
					keyword = keyword || '';
					keyword = keyword.replace(/\{|\}*/ig, '').split('.')[0];
					return keywords[keyword] || '';
				});
			};

			service.resolveTemplateKeys = function resolveTemplateKeys(template) {
				var matchedKeys = template.match(/\{\{[^\}]+\}\}/ig);
				var keywords = [];
				_.forEach(matchedKeys, function (row) {
					var word = row.replace(/\{|\}*/ig, '');
					if (_.find(keywords, {title: word})) {
						return;
					}

					var keyword = {
						title: word,
						keyValue: word.split('.')[0]
					};
					keywords.push(keyword);
				});
				return keywords;
			};
			return service;
		}]);

}(angular));