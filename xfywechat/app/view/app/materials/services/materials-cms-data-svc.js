(function (angular) {
	"use strict";

	angular.module('materials').factory('materialsCmsDataSvc', ['$http', '$q','platformModalSvc', function ($http, $q,platformModalSvc) {
		var service = {}, projectId;

		var assembly = function assembly(data) {
			return data.map(function (item) {
				return {
					_id: item._id,
					name: item.name
				};
			});
		};

		/**
		 * 转换来自CMS的文章，主要是把图片路径转换成图库绝对路径
		 * @param article
		 */
		service.transformCmsArticle = function transformCmsArticle(article) {
			var src = /(src\S*=\S*")((?!http|https|ftp)\S+)"/ig;
			return article.replace(src, '$1' + globals.cmsImagePath + '$2"');
		};

		service.setProject = function setProject(data) {
			projectId = data;
		};

		service.getProject = function getProject() {
			return projectId;
		};

		service.getProjectLists = function getProjectLists() {
			var derfer = $q.defer();
			var option = {
				method: 'get',
				url: globals.basAppRoot + 'cms/getProjectLists'
			};
			$http(option).then(function (res) {
				if (res.data.isSuccess) {
					projectId = res.data.data;
					service.getModuleLists({projId: res.data.data}).then(function (moduleList) {
						derfer.resolve(moduleList);
					});
				} else {
					platformModalSvc.showWarmingMessage(res.data.data, '项目信息失败');
				}
				return res.data;
			});
			return derfer.promise;
		};

		service.getModuleLists = function getModuleLists(params) {
			var derfer = $q.defer();
			var option = {
				method: 'get',
				url: globals.basAppRoot + 'cms/getModuleLists',
				params: params
			};
			$http(option).then(function (res) {
				if (res.data.isSuccess) {
					var modules = res.data.data.modules;
					derfer.resolve(assembly(modules));
				} else {
					platformModalSvc.showWarmingMessage(res.data.data, '取模块列表失败');
				}
				return res.data;
			});
			return derfer.promise;
		};

		service.getCtgLists = function getCtgLists(moduleId) {
			var derfer = $q.defer();
			var option = {
				method: 'get',
				url: globals.basAppRoot + 'cms/getCtgLists',
				params: {
					projId: projectId,
					moduleId: moduleId
				}
			};
			$http(option).then(function (res) {
				if (res.data.isSuccess) {
					derfer.resolve(assembly(res.data.data.ctgs));
				} else {
					platformModalSvc.showWarmingMessage(res.data.data, '分类列表失败');
				}
				return res.data;
			});
			return derfer.promise;
		};

		service.getArticleLists = function getArticleLists(data) {
			var params = data;
			params.projId = projectId;
			var derfer = $q.defer();
			var option = {
				method: 'get',
				url: globals.basAppRoot + 'cms/getArticleLists',
				params: params
			};
			$http(option).then(function (res) {
				if (res.data.isSuccess) {
					derfer.resolve(res.data.data.articles);
				} else {
					platformModalSvc.showWarmingMessage(res.data.data, '项目信息失败');
				}
				return res.data;
			});
			return derfer.promise;
		};

		/*重构方法*/
		service.choseArticle = function choseArticle(item) {
			var article = {};
			article.title = item.title || '';
			if (!!item.imgSm && item.imgSm.url) {
				article.fileId = item.imgSm.url;
			} else {
				article.fileId = '';
			}
			article.digest = window.deletHtmlTag(item.desc) || '';
			article.digest = article.digest.replace(/(^\s*)/, '').replace(/\s*$/, '').replace(/\s{2,}/g, ' ');
			article.digest = article.digest.replace(/&nbsp;/g, ' ').substring(0, 120);
			if(item.content){
				article.content =  service.transformCmsArticle(item.content);
			}else if( item.tabContents&& item.tabContents instanceof Array){
				article.content = service.transformCmsArticle(item.tabContents[0].value);
			}else{
				article.content = '';
			}
			//article.content = service.transformCmsArticle(item.content || item.tabContents[0].value || '');
			article.id = item._id;
			return article;
		};

		return service;
	}]);

}(angular));
