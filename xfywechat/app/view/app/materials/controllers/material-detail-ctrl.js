(function (angular) {
	"use strict";
	angular.module("materials").controller("materialsDetailCtrl", ['$scope', '$state', '$timeout', 'materialsDataSvc', 'basDetailCtrlSvc', 'platformModalSvc',
		function ($scope, $state, $timeout, materialsDataSvc, basDetailCtrlSvc, platformModalSvc) {

			var createSource = materialsDataSvc.getCreateSource(), _isDirty = false;
			$scope.sourceName = materialsDataSvc.getCreateSourceName() || '图文回复';
			basDetailCtrlSvc.createInstance($scope, materialsDataSvc, {
				listState: createSource || 'wechat.materialsList'
			});

			$scope.option = {selectedIndex: 0};
			$scope.option.article = materialsDataSvc.createArticle();
			$scope.type = materialsDataSvc.getCreateType();

			var _formGetter = angular.noop;
			$scope.setForm = function setForm(formGetter) {
				_formGetter = formGetter;
			};

			var getForm = function getForm() {
				return _formGetter.call($scope) || {
						$setDirty: angular.noop,
						$setPristine: angular.noop
					};
			};


			$scope.setArrowIndex = function setArrowIndex(index) {
				$scope.option.selectedIndex = index;
				materialsDataSvc.setArrowIndex(index);
			};

			var init = function init() {
				var articles = $scope.currentItem.articles || [],
					article = articles && articles[0] ? articles[0] : null,
					selectedIndex = materialsDataSvc.getArrowIndex();

				if (!articles.length) {
					$scope.create();
					articles = $scope.currentItem.articles;
					article = articles && articles[0] ? articles[0] : null;
				}

				if ($scope.type === 'single' && articles.length) {
					articles.length = 1;
				}

				if (articles.length) {
					$scope.option.article = article;
					article.isArticle = !article.otherUrl;
					article.hasUrl = !!article.content_source_url;
					if ($scope.type === 'single') {
						article.create_time = new Date().toString();
					}
				}

				$scope.setArrowIndex(selectedIndex);
			};
			$scope.hasUrl = function hasUrl() {
				if (!$scope.option.article.hasUrl) {
					$scope.option.article.content_source_url = '';
				}
			};

			$scope.addArticle = function addArticle() {
				$scope.currentItem.articles = $scope.currentItem.articles || [];
				var articles = $scope.currentItem.articles;
				if (articles.length < 8) {
					articles.push(materialsDataSvc.createArticle());
				} else {
					platformModalSvc.showWarmingTip('多图文不能超过8个!');
				}
			};

			$scope.editArticle = function editArticle(index, checkDirty) {
				$scope.option.article = $scope.option.article || {};
				var hasArticle = !!_.find($scope.currentItem.articles, {$$hashKey: $scope.option.article.$$hashKey}),
					formmaterials = getForm();

				_isDirty = _isDirty || formmaterials.$dirty;

				if (!hasArticle || (formmaterials.$valid)) {
					formmaterials.$setPristine();
					var article = $scope.option.article = $scope.currentItem.articles[index];
					article.isArticle = !article.otherUrl;
					article.hasUrl = !!article.content_source_url;
					$scope.setArrowIndex(index);
				} else if (checkDirty) {
					if(!$scope.option.article.fileId){
						platformModalSvc.showWarmingTip('请先上传封面图片!');
					}else{
						platformModalSvc.showWarmingTip('请先完成当前图文!');
					}

				}
			};

			/**
			 * 用于控制表单弹出数据未保存提示
			 */
			$scope.isDataDirty = function isDataDirty(isDirty) {
				return isDirty || _isDirty;
			};

			$scope.setDataDirty = function setDataDirty(isDirty) {
				return _isDirty = isDirty;
			};

			$scope.saveArticles = function saveArticles() {
				$scope.option.article = angular.copy($scope.option.article); //为了界面不会被刷
				var validateResult = materialsDataSvc.validateSaveData($scope.currentItem),
					formmaterials = getForm();

				if (validateResult) {
					_isDirty = false;
					$scope.save(true, formmaterials);
					$scope.setArrowIndex(0);
				} else {
					$scope.option.article = $scope.currentItem.articles[$scope.option.selectedIndex];
				}
			};


			var doDeleteArticle = function doDeleteArticle(articles, article, index) {
				articles.splice(index, 1);
				article = articles[index] || articles[index - 1];
				article.isArticle = !article.otherUrl;
				article.hasUrl = !!article.content_source_url;
				$scope.setArrowIndex(_.indexOf(articles, article));
			};

			$scope.deleteArticle = function deleteAtrice(index) {
				var article = $scope.option.article,
					articles = $scope.currentItem.articles,
					formmaterials = getForm();

				if (formmaterials.$valid || article === articles[index]) {
					if (articles.length > 2) {
						platformModalSvc.showConfirmMessage('确认删除文章？', '温馨提示').then(function () {
							doDeleteArticle(articles, article, index);
						});
					} else {
						platformModalSvc.showWarmingTip('多图文最少为2个!');
					}
				} else {
					platformModalSvc.showWarmingTip('请先完成当前图文!');
				}
			};

			$scope.switchToReference = function switchToReference() {
				if (materialsDataSvc.isArticleEmpty($scope.option.article)) {
					$state.go('wechat.materials.apply');
				} else {
					platformModalSvc.showConfirmMessage('切换时内容会清空,你确认要切换吗?', '温馨提示').then(function () {
						angular.extend($scope.option.article, materialsDataSvc.createArticle());
						$state.go('wechat.materials.apply');
					});
				}
			};


			$scope.switchToWrite = function switchToWrite() {
				if (materialsDataSvc.isArticleEmpty($scope.option.article)) {
					$state.go('wechat.materials.add');
				} else {
					platformModalSvc.showConfirmMessage('切换时内容会清空,你确认要切换吗?', '温馨提示').then(function () {
						angular.extend($scope.option.article, materialsDataSvc.createArticle());
						$state.go('wechat.materials.add');
					});
				}
			};

			$scope.resetForm = function resetForm() {
				angular.extend($scope.option.article, materialsDataSvc.createArticle());
			};

			$scope.isArticleChanged = function isArticleChanged(article) {
				if (!article.isArticle) {
					article.otherUrl = article.otherUrl || 'http://';
				}
			};
			$scope.isContentChanged = function isContentChanged(article) {
				article.content_source_url = article.content_source_url || 'http://';
			};

			var onCurrentItemChanged = function onCurrentItemChanged() {
				var selectedIndex = materialsDataSvc.getArrowIndex();
				$timeout(function () {
					$scope.editArticle(selectedIndex);
				});
			};

			var onSaved = function onSaved() {
				_isDirty = false;
			};
			materialsDataSvc.registerCurrentItemChanged(onCurrentItemChanged);

			init();
			materialsDataSvc.registerItemCreated(onSaved);
			materialsDataSvc.registerItemUpdated(onSaved);
			$scope.$on('$destroy', function () {
				//watcher();
				_isDirty = false;
				materialsDataSvc.unregisterCurrentItemChanged(onCurrentItemChanged);
				materialsDataSvc.unregisterItemCreated(onSaved);
				materialsDataSvc.unregisterItemUpdated(onSaved);
			});
		}]);

}(angular));