(function (angular) {
	"use strict";

	angular.module('menu').controller('menuDetailCtrl', ['$scope', 'menuDataSvc', 'basDetailCtrlSvc', 'platformModalSvc', '$state', 'platformNavigationSvc',
		function ($scope, menuDataSvc, basDetailCtrlSvc, platformModalSvc, $state, platformNavigationSvc) {
			basDetailCtrlSvc.createInstance($scope, menuDataSvc, {
				notCopyCurrent: true,
				tip: {showLoading: false}
			});
			$scope.imgurl = 'material/image/upload?appId=' + $scope.appId;
			$scope.currentMenu = menuDataSvc.currentMenu;
			$scope.selected = menuDataSvc.selected;
			$scope.editModel = true;
			$scope.materials = menuDataSvc.getMaterials();


			var itemWatcher = angular.noop();

			var comparenMenu = function comparenMenu(newVal, oldVal) {
				var result = false;
				_.forEach(newVal, function (val, prop) {
					if (oldVal && oldVal[prop] !== val) {
						result = true;
						return false;
					}
				});
				return result;
			};

			var setDirty = function setDirty(val, force) {
				if (force) {
					$scope.isDirty = val;
				} else if (!$scope.isDirty) {
					$scope.isDirty = val;
				}
			};

			var enableWatch = function enableWatch() {
				itemWatcher = $scope.$watch('selected', function (newVal, oldVal) {
					setDirty(comparenMenu(newVal, oldVal));
				}, true);
			};

			var disableWatch = function disableWatch() {
				if (angular.isFunction(itemWatcher)) {
					itemWatcher();
				}
			};

			var updateSelected = function updateSelected() {
				var selected;
				if ($scope.selected && $scope.selected.materialType === 'news') {
					selected = 'message';
				} else if ($scope.selected && $scope.selected.materialType === 'keyWord') {
					selected = 'keyWord';
				} else {
					selected = 'pic';
				}
				$scope.selectTab(selected);
			};

			updateSelected();

			var showInputModal = function showInputModal(menu, options, callBack) {
				var source = angular.copy(menu);
				options = options || {};
				options.selected = source;
				platformModalSvc.showModal({
					templateUrl: globals.basAppRoute + 'menus/partials/menu-rename-partial.html',
					controller: 'menuRenameCtrl',
					size: 'sm',
					options: options
				}).then(function () {
					callBack(source);
					setDirty(true);
				});
			};
			var showCmsMobileModal = function showCmsMobileModal(options, callBack) {
				options = options || {};
				platformModalSvc.showModal({
					templateUrl: globals.basAppRoute + 'menus/partials/menu-cms-mobile-partial.html',
					controller: 'menuCmsMobileCtrl',
					size: 'md',
					options: options
				}).then(function (data) {
					callBack(data);
					setDirty(true);
				});
			};
			$scope.getCmsMobileUrl = function () {
				var opt = {url: $scope.selected.url};
				showCmsMobileModal(opt, function (data) {
					$scope.selected.url = data.url;
				});
			};
			var getKeyWordModel = function getKeyWordModel(options, callBack) {
				options = options || {};
				platformModalSvc.showModal({
					templateUrl: globals.basAppRoute + 'menus/partials/menu-key-word-partial.html',
					controller: 'menuKeyWordCtrl',
					size: 'md',
					options: options
				}).then(function (data) {
					callBack(data);
					setDirty(true);
				});
			};
			$scope.disable = function disable() {
				$scope.currentItem.enable = false;
				menuDataSvc.updateItem().then(function () {
					$state.go('wechat.enable-menu');
				});
			};

			$scope.createMenu = function createMenu(parent) {
				if ($scope.currentItem.button&&$scope.currentItem.button.length!==0&&$scope.menuForm.name&&$scope.menuForm.name.$invalid) {
					platformModalSvc.showWarmingTip('当前菜单名不合法!');
				} else {
					var newItem = {type: 'click'};
					if (parent) {
						parent.sub_button.push(newItem);
						$scope.selectSubMenu(newItem);
						$scope.resetMenu(parent);
					} else {
						newItem.sub_button = [];
						$scope.currentItem.button.push(newItem);
						$scope.selectMenu(newItem);
					}
				}

			};
			$scope.selectedNameChange = function selectedNameChange() {
				if (menuDataSvc.checkExists(null, $scope.selected)) {
					platformModalSvc.showWarmingTip('该名称已经存在,请重新命名？');
				}
			};

			$scope.validateName = function validateName(name) {

				return !menuDataSvc.checkExists(null, $scope.selected, name);
			};

			$scope.selectSubMenu = function selectSubMenu(subMenu) {
				if ($scope.menuForm.name && $scope.menuForm.name.$invalid) {
					platformModalSvc.showWarmingTip('菜单名不合法!');
				} else {
					disableWatch();
					menuDataSvc.setCurrentSubMenu(subMenu);
					$scope.currentSubMenu = subMenu;
					$scope.selected = subMenu;
					menuDataSvc.selected = subMenu;
					updateSelected();
					enableWatch();
				}
			};

			$scope.selectMenu = function selectMenu(menu) {
				if ($scope.menuForm.name && $scope.menuForm.name.$invalid) {
					platformModalSvc.showWarmingTip('菜单名不合法!');
				} else {
					disableWatch();
					$scope.currentMenu = menu;
					$scope.selected = menu;
					menuDataSvc.selected = menu;
					menuDataSvc.currentMenu = menu;
					updateSelected();
					enableWatch();
				}
			};

			$scope.removeMenu = function removeMenu(menu) {
				platformModalSvc.showConfirmMessage('删除确认', '温馨提示', '删除后该菜单下设置的消息将同步被删除！').then(function () {
					if (menu === $scope.currentMenu) {
						_.remove($scope.currentItem.button, menu);
					} else if (menu === $scope.currentSubMenu) {
						_.remove($scope.currentMenu.sub_button, menu);
					}
					$scope.selected = null;
				});
			};

			$scope.reNameMenu = function reNameMenu(menu) {
				showInputModal(menu, {title: '修改菜单名称'}, function (item) {
					if (menuDataSvc.checkExists(menu, item)) {
						platformModalSvc.showConfirmMessage('该名称已经存在,是否需要重新命名？', '温馨提示').then(function () {
							$scope.reNameMenu(menu);
						});
						return false;
					}
					menu.name = item.name;
				});
			};

			$scope.setType = function setType(menu, type) {
				$scope.resetMenu(menu);
				menu.type = type;

				if (type === 'view') {
					$scope.selected.url = 'http://';
				}
			};

			$scope.showArtcileLib = function showArtcileLib() {
				menuDataSvc.showArtcileLib();
			};

			$scope.showImageLib = function showImageLib() {
				menuDataSvc.selectImageLib();
			};

			$scope.selectImg = function selectImg(file) {
				menuDataSvc.selectImg(file);
			};

			$scope.removeImg = function removeImg(img) {
				menuDataSvc.removeAttr(img, 'url');
				menuDataSvc.removeAttr(img, 'key');
				menuDataSvc.removeAttr(img, 'picName');
			};

			$scope.removeArticle = function removeArticle(article) {
				menuDataSvc.removeAttr(article, 'url');
				menuDataSvc.removeAttr(article, 'key');
			};


			$scope.resetMenu = function resetMenu(selected) {
				menuDataSvc.resetMenu(selected);
			};

			$scope.createArticle = function createArticle(type) {
				menuDataSvc.createArticle(type, $scope.selected);
			};

			$scope.toggleSortable = function toggleSortable() {
				$scope.enableSort = !$scope.enableSort;
			};

			$scope.saveMenu = function saveMenu() {
				var validateError = menuDataSvc.validateSaveData();
				if (validateError) {
					if (!validateError.sub_button) {
						$scope.selectMenu(validateError.parent);
						$scope.selectSubMenu(validateError.selected);
					} else {
						$scope.selectMenu(validateError.selected);
					}

					platformModalSvc.showErrorMessage('验证错误', '验证错误', '菜单：' + validateError.selected.name + '<br/> 错误信息：' + validateError.desc);
				} else {
					$scope.save();
				}
			};

			var currentItemChanged = function currentItemChanged(menu) {
				if (!menu.enable) {
					$state.go('wechat.enable-menu');
				}
			};

			var itemUpdated = function itemUpdated(menu) {
				if (menuDataSvc.currentMenu && menuDataSvc.selected) {
					menuDataSvc.currentMenu = _.find(menu.button, {name: menuDataSvc.currentMenu.name}) || {};
					menuDataSvc.selected = menuDataSvc.selected.name === menuDataSvc.currentMenu.name ?
						menuDataSvc.currentMenu : _.find(menuDataSvc.currentMenu.sub_button, {name: menuDataSvc.selected.name});
					$scope.currentMenu = menuDataSvc.currentMenu;
					$scope.selected = menuDataSvc.selected;
					setDirty(false, true);
				}
			};

			var onRouteWillUpdated = function onRouteWillUpdated(e) {
				if ($scope.isDirty) {
					e.confirm = platformModalSvc.showConfirmMessage('当前页面没有保存是否确认离开？', '温馨提示').then(function () {
						e.stop = false;
						$scope.$emit('formDirtyInfo', e);
						menuDataSvc.currentMenu = null;
						menuDataSvc.selected = null;
						return true;
					}, function () {
						e.stop = true;
						$scope.$emit('formDirtyInfo', e);
						return false;
					});
				} else {
					menuDataSvc.currentMenu = null;
					menuDataSvc.selected = null;
					$scope.$emit('formDirtyInfo', {dirty: false});
				}
			};
			$scope.getKeyWords = function getKeyWords() {
				var opt = {keyWord: $scope.selected.keyWord, id: $scope.selected.key};
				getKeyWordModel(opt, function (data) {
					$scope.selected.keyWord = data.keyword;
					menuDataSvc.selectKeyWord(data);
					$scope.materials = menuDataSvc.getMaterials();
				});
			};

			$scope.isContentChanged = function isContentChanged() {
				$scope.selected.url = $scope.selected.url || 'http://';
			};

			platformNavigationSvc.registerRouteWillUpdated(onRouteWillUpdated);
			menuDataSvc.registerCurrentItemChanged(currentItemChanged);
			menuDataSvc.registerItemUpdated(itemUpdated);

			$scope.$on('$destroy', function () {
				menuDataSvc.unregisterCurrentItemChanged(currentItemChanged);
				menuDataSvc.unregisterItemUpdated(itemUpdated);
				platformNavigationSvc.unregisterRouteWillUpdated(onRouteWillUpdated);
				disableWatch();
				if (!menuDataSvc.isCreatingMaterial()) {
					menuDataSvc.loadItemById();
				}
			});

			//menuDataSvc.loadItemById();

		}]);

}(angular));