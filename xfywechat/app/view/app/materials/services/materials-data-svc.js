(function (angular) {
	"use strict";
	angular.module('materials').factory('materialsDataSvc', ['$state', 'basDataSvc', 'nswGlobals', '$http', 'platformModalSvc', '$q', 'materialsCacheDataSvc',
		function ($state, basDataSvc, nswGlobals, $http, platformModalSvc, $q, materialsCacheDataSvc) {
			var options = {
				name: 'materialsDataSvc',
				uri: 'material/materialInfoNews',
				item: {
					removeUri: 'material/materialInfo',
					loadUri: 'material/materialInfo',
					default: {
						articles: [{
							content: '',
							title: '',
							digest: '',
							show_cover_pic: '',
							isArticle: true
						}, {
							content: '',
							title: '',
							digest: '',
							show_cover_pic: '',
							isArticle: true
						}]
					},
					afterCreated: function (item) {
						item.appId = nswGlobals.getValue('appId');
						item.update_time = new Date().format("yyyy-MM-dd  hh:mm:ss");
					},
					prepareRemove: function (service, options) {
						options.params.type = 'news';
						options.params.appId = nswGlobals.getValue('appId');
					},
					prepareLoad: function (service, options) {
						options.params.type = 'news';
					},
					prepareUpdate: function (service, options) {
						_.omit(options.params, 'id');
					}
				},
				list: {
					enableSearch: true,
					enablePaging: true,
					pageSize: 12,
					prepareSearchParam: function (options) {
						options.appId = nswGlobals.getValue('appId');
					},
					selectionMode: 'single'
				},
				cache: {
					getCache: materialsCacheDataSvc.resolveCache,
					applyCache: materialsCacheDataSvc.applyCache
				}
			};

			var service = basDataSvc.createInstance(options);

			var createType, createSource, createSourceName, arrowIndex, _isDirty;

			service.setArrowIndex = function setArrowIndex(index) {
				arrowIndex = index;
			};
			service.getArrowIndex = function getArrowIndex() {
				return arrowIndex || 0;
			};

			service.getCreateType = function getCreateType() {
				return createType || nswGlobals.getValue('type');
			};

			/*service.loadItemById();*/
			service.getAppId = function getAppId() {
				return nswGlobals.getValue('appId');
			};

			service.isArticleEmpty = function isArticleEmpty(article) {
				article = article || {};
				return !(article.title || article.fileId || article.desc || article.content);
			};

			service.getCreateSource = function getCreateSource() {
				return createSource;
			};
			service.getCreateSourceName = function getCreateSourceName() {
				return createSourceName;
			};
			service.setCreateType = function setCreateType(type, source, sourceName) {
				var needGoBack = _.isBoolean(source) ? source : _.isString(source);
				if (needGoBack) {
					source = _.isString(source) ? source : $state.current.name;
					createSourceName = sourceName;
				}
				createType = type;
				createSource = source;

				nswGlobals.setValue('type', type, true);
			};

			service.registerItemCreated(function (material) {
				service.setCurrentItem(material);
			});

			service.registerItemLoaded(function (material) {
				service.setCurrentItem(material);
			});

			var completeUrl = function completeUrl(url) {
				if (url && !/^(http|ftp|https):\/\//.test(url)) {
					url = 'http://' + url;
				}
				return url;
			};

			service.createArticle = function createArticle(formPhone) {
				return {
					isArticle: true,
					show_cover_pic: '',
					title: '',
					content_source_url: '',
					otherUrl: '',
					content: '',
					fileId: '',
					digest: '',
					isFromPhone: !!formPhone
				};
			};

			service.validateSaveData = function validateSaveData(item) {
				var isMulti = item.articles.length > 1;
				item.articles = _.filter(item.articles, function (article) {
					return !service.isArticleEmpty(article);
				});
				if (isMulti && service.isArticleEmpty(item.articles[1])) {
					platformModalSvc.showWarmingTip('请完成前两篇图文!');
					if (item.articles.length < 2) {
						item.articles[1] = service.createArticle();
					}
					return false;
				}
				_.forEach(item.articles, function (article) {
					if (angular.isDefined(article.isArticle)) {
						if (article.isArticle) {
							article.content_source_url = completeUrl(article.content_source_url);
							service.omitAttr(article, 'isArticle', 'hasUrl', 'otherUrl');
						} else {
							service.omitAttr(article, 'isArticle', 'hasUrl', 'content', 'content_source_url');
							article.otherUrl = completeUrl(article.otherUrl);
						}

						var content = article.content;
						if (item.articles.length === 1 && !article.digest && content) {
							article.digest = window.deletHtmlTag(content.replace(/&nbsp;/ig,' ')).slice(0, 54);
						}
					}
				});
				return true;
			};
			service.validatePreviewData = function validatePreviewData(item) {
				if(!item.articles){
					return;
				}
				var isMulti = item.articles.length > 1;
				var valiList = _.filter(item.articles, function (article) {
					return !service.isArticleEmpty(article);
				});

				return !(isMulti && service.isArticleEmpty(valiList[1]));
			};

			materialsCacheDataSvc.init(service);
			return service;
		}]);

}(angular));