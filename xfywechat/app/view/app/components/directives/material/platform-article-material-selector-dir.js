(function (angular) {
	"use strict";
	angular.module('platform').directive('platformArticleMaterialSelector', ['$http', 'nswGlobals', 'platformModalSvc', 'platformArticleMaterialDataSvc',
		function ($http, nswGlobals, platformModalSvc, platformArticleMaterialDataSvc) {
			return {
				restrict: 'A',
				require: 'ngModel',
				scope: {
					remove: '&',
					afterSelect: '&',
					key: '@',
					srcModuleName:'@'
				},
				templateUrl: globals.basAppRoute + 'components/templates/materials/platform-article-material-selector-dir.html',
				link: function (scope, element, attr, ctrl) {
					var dataSvc;
					if (!scope.key) {
						console.error('key is required : platformArticleMaterialSelector');
					}


					scope.imageUrl = globals.imageUrl.replace(/@appId/, nswGlobals.getValue('appId'));
					scope.afterImageSelected = function afterImageSelected(article) {
						scope.material = article;
						scope.materialId = article.id;
						ctrl.$setViewValue(scope.materialId);
						scope.afterSelect({material: article});
					};

					scope.switchToArticle = function switchToArticle() {
						scope.createState = true;
					};

					scope.createArticle = function createArticle(type) {
						dataSvc.createArticle(type, scope.srcModuleName);
					};

					scope.showArtcileLib = function showArtcileLib() {
						platformModalSvc.showModal({
							controller: 'articleLibCtrl',
							templateUrl: globals.basAppRoute + 'materials/templates/articles-lib.html',
							size: 'lg',
							options: {
								selected: {
									id: scope.materialId
								},
								srcModuleName:scope.srcModuleName
							}
						}).then(function (material) {
							scope.afterImageSelected(material);
						});
					};

					scope.doRemove = function doRemove() {
						scope.material = {};
						scope.materialId = '';
						ctrl.$setViewValue(scope.materialId);
						scope.remove();
					};

					var loadArticle = function loadArticle(id) {
						var uri = globals.basAppRoot + 'material/materialInfo';
						$http({
							method: 'get',
							url: uri,
							params: {
								type: 'news',
								id: id
							}
						}).then(function (res) {
							if (res.data.isSuccess) {
								scope.material = res.data.data;
								scope.loadImageFaild = false;
							} else {
								scope.loadImageFaild = true;
							}
						});
					};

					ctrl.$render = function render() {
						var value = ctrl.$viewValue;
						if (value && value !== scope.materialId) {
							loadArticle(value);
						} else {
							scope.material = {};
						}
						scope.materialId = value;
					};

					if(scope.key){
						dataSvc = platformArticleMaterialDataSvc.create(scope.key);
						var created = dataSvc.getCreated();
						if (created) {
							scope.afterImageSelected(created);
						}
					}

					scope.$on('$destroy', function () {
						platformArticleMaterialDataSvc.clear(scope.key);
					});
				}
			};
		}]);

}(angular));