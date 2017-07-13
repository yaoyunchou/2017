(function (angular) {
	"use strict";
	angular.module('platform').factory('platformArticleMaterialDataSvc', ['materialsDataSvc', '$state', '$timeout','platformMenuDataSvc',
		function (materialsDataSvc, $state, $timeout,platformMenuDataSvc) {
			var instances = {};

			var Constructor = function Constructor() {
				var instance = this, currentState, created;
				instance.createArticle = function createArticle(type, srcModuleName) {
					currentState = $state.current.name;
					materialsDataSvc.setCreateType(type, true, srcModuleName);
					materialsDataSvc.createNew();
					//$state.go('wechat.materials.apply');
					if(materialsDataSvc.checkAuthed('phoneProj')) {
						$state.go('wechat.materials.apply');
					}else{
						$state.go('wechat.materials.add');
					}
				};

				var articleCreated = function articleCreated(article) {
					if (currentState) {
						var state = currentState;
						created = article;
						$timeout(function () {
							$state.go(state);
						});
						currentState = null;
					}
				};

				instance.getCreated = function getCreated() {
					var item = created;
					created = null;
					return item;
				};

				materialsDataSvc.registerItemCreated(articleCreated);

				instance.clear = function clear() {
					if (!currentState) {
						materialsDataSvc.unregisterItemCreated(articleCreated);
						return true;
					}
				};
			};

			var createInstance = function createInstance(key) {
				if (instances[key]) {
					return instances[key];
				} else {
					var instance = new Constructor();
					instances[key] = instance;
					return instance;
				}
			};

			var clear = function clear(key) {
				if (instances[key] &&
					instances[key].clear()) {
					delete  instances[key];
				}
			};

			return {
				create: createInstance,
				clear: clear
			};
		}]);

}(angular));