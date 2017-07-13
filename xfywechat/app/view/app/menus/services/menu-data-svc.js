(function (angular) {
	"use strict";
	angular.module('menu').factory('menuDataSvc', ['$timeout', 'basDataSvc', 'nswGlobals', '$state', 'materialsDataSvc', 'materialsImgDataSvc', 'platformImgLibSvc', 'platformModalSvc', 'accountDataSvc','platformMenuDataSvc','$q','$http',
		function ($timeout, basDataSvc, nswGlobals, $state, materialsDataSvc, materialsImgDataSvc, platformImgLibSvc, platformModalSvc, accountDataSvc, platformMenuDataSvc,$q,$http) {
			var options = {
				uri: 'menu/menuInfo',
				item: {
					prepareLoad: function (service, options) {
						options.params.appId = nswGlobals.getValue('appId');
						_.omit(options.params, 'id');
					},
					default: {
						//name: 'test'
						enable: false
					}
				},
				list: {
					enableSearch: true,
					listUri: 'menu/getWxMenuList',
					selectionMode: 'single'
				}
			};
			var service = basDataSvc.createInstance(options), menus = [],
				creatingMaterial = false, articles = {};


			service.registerItemLoaded(function (item) {
				menus = service.getMenus();
				item.appId = nswGlobals.getValue('appId');
				item.button = item.button || [];
				menus.length = 0;
				_.forEach(item.button, function (button, index) {
					menus[index] = button;
				});

				service.setCurrentItem(item);
			});

			service.isCreatingMaterial = function isCreatingMaterial(){
				return creatingMaterial;
			};

			service.getMenus = function getMenus() {
				var data = service.getCurrentItem() || {};
				return data.button || [];
			};

			service.setCurrentSubMenu = function setCurrentSubMenu(sub) {
				service.selectedSubMenu = sub;
			};

			service.setCurrentMenu = function setCurrentMenu(menu) {
				service.currentMenu = menu;
			};

			service.setSelected = function setSelected(item) {
				service.selected = item;
			};

			service.checkExists = function checkExists(source, item, name) {
				var exists = false;
				name = name || item.name;
				_.forEach(service.getMenus(), function (menu) {
					exists = menu !== item && menu.name === name;
					if (!exists) {
						_.forEach(menu.sub_button, function (sub) {
							exists = sub !== item && sub.name === name;
							if (exists) {
								return false;
							}
						});
					}
					if (exists) {
						return false;
					}
				});
				return exists;
			};

			service.removeAttr = function removeAttr(obj, attr) {
				if (obj.hasOwnProperty(attr)) {
					delete  obj[attr];
				}
			};

			service.resetMenu = function resetMenu(selected) {
				service.removeAttr(selected, 'url');
				service.removeAttr(selected, 'key');
				service.removeAttr(selected, 'materialType');
				service.removeAttr(selected, 'picName');
				service.removeAttr(selected, 'keyWord');
			};

			service.selectImg = function selectImg(file) {
				if (file) {
					service.resetMenu(service.selected);
					service.removeAttr(service.selected, 'url');
					service.selected.key = file.fileId;
					service.selected.materialType = 'pic';
					service.selected.picName = file.name || file.fileName;
				}
			};
			service.selectKeyWord = function selectKeyWord(file) {
				if (file) {
					service.resetMenu(service.selected);
					service.removeAttr(service.selected, 'url');
					service.selected.key = file.rule.id;
					service.selected.materialType = 'keyWord';
					service.selected.keyWord = file.keyword ;
					service.fetchMaterialById(file.rule.id,'keyWord');
				}
			};

			service.showArtcileLib = function showArtcileLib() {
				creatingMaterial = true;
				platformModalSvc.showModal({
					controller: 'articleLibCtrl',
					templateUrl: globals.basAppRoute + 'materials/templates/articles-lib.html',
					size: 'lg',
					options: {
						selected: {
							id: service.selected.key
						},
						srcModuleName:'自定义菜单'
					}
				}).then(function (material) {
					$state.go('wechat.menu');
					service.resetMenu(service.selected);
					articles[material.id] = material;
					service.selected.key = material.id;
					service.selected.materialType = 'news';
					creatingMaterial = false;
				});
			};

			service.selectImageLib = function selectImageLib() {
				creatingMaterial = true;
				platformImgLibSvc.showImgLibModal({
						count: 1,
						size: 300,
						width: 800,
						height: 800,
						ext: 'gif,jpg,jpeg,bmp,png'
					}, articles[service.selected.key])
					.then(function (image) {
						$state.go('wechat.menu');
						service.selectImg(image);
						creatingMaterial = false;
					});
			};

			var checkUrl = function checkUrl(menu) {
				if (menu.type === 'view') {
					var url = menu.url || '';
					if (url && !/^(http|ftp|https):\/\//.test(url)) {
						menu.url = 'http://' + url;
					}
				}
			};

			service.validateSaveData = function validateSaveData(parent, buttons) {
				buttons = buttons || service.getCurrentItem().button;
				var invalidItem = null;
				_.forEach(buttons, function (button) {
					var hasSub = button.sub_button && button.sub_button.length;
					if (!hasSub) {
						if (button.type === 'click' && !button.key) {
							invalidItem = {
								parent: parent,
								selected: button,
								desc: '没有选择相关的素材'
							};
							return false;
						} else if (button.type === 'view') {
							checkUrl(button);
							if (!button.url) {
								invalidItem = {
									parent: parent,
									selected: button,
									desc: '没有选择菜单的URL'
								};
							}
						} else if (!button.type) {
							invalidItem = {
								parent: parent,
								selected: button,
								desc: '没有选择菜单类型'
							};
						}
					}
					if (!invalidItem && button.sub_button) {
						invalidItem = service.validateSaveData(button, button.sub_button);
					}
					return !invalidItem;
				});
				return invalidItem;
			};

			var create = function create() {
				materialsDataSvc.createNew();
				/*$state.go('wechat.materials.apply');*/
				if(materialsDataSvc.checkAuthed('phoneProj')) {
					$state.go('wechat.materials.apply');
				}else{
					$state.go('wechat.materials.add');
				}
			};

			service.createArticle = function createArticle(type) {
				materialsDataSvc.setCreateType(type,'wechat.menu','自定义菜单');
				create();
				creatingMaterial = true;
			};

			var materialCreated = function materialCreated(material) {
				if (!creatingMaterial || !service.selected) {
					return;
				}
				creatingMaterial = false;

				if (service.selected.hasOwnProperty('url')) {
					delete  service.selected.url;
				}

				articles[material.id] = material;
				service.selected.key = material.id;
				service.selected.materialType = 'news';
			};

			service.getMaterials = function getMaterials() {
				return articles;
			};
			service.loadKeyWordInfo = function loadKeyWordInfo(id){
				var defer = $q.defer();
				var options = {
					url:globals.basAppRoot + 'keyWord/reply',
					method:'get',
					params:{
						id:id
					}
				};
				return $http(options).then(function(res){
					if(res.data.isSuccess){
						defer.resolve(res.data.data);
					}else{
						defer.reject(res.data.data);
					}
					return defer.promise;
				});
			};

			service.fetchMaterialById = function fetchMaterialById(id, type) {
				//if (!id) {
				//	return;
				//}
				if (type === 'news') {
					materialsDataSvc.loadItemById(id).then(function (material) {
						articles[id] = material;
					});
				}
				if(type === 'keyWord'){
					service.loadKeyWordInfo(id).then(function(data){
						if(data.replyType==='news'){
							materialsDataSvc.loadItemById(data.mediaId).then(function (material) {
								articles[id] ={
									data:material,
									keyWordReplyType:'news'
								} ;
							});
						}else if(data.replyType==='pic'){
							articles[id] ={
								data:data.fileId,
								keyWordReplyType:'pic'
							};
						}else{
							articles[id] ={
								data:data.content,
								keyWordReplyType:'txt'
							};
						}
					});
				}
			};

			service.registerItemLoaded(function (item) {
				_.forEach(item.button, function (button) {
					if (button.type === 'click') {
						service.fetchMaterialById(button.key, button.materialType);
					}
					_.forEach(button.sub_button, function (sub) {
						if (sub.type === 'click') {
							service.fetchMaterialById(sub.key, sub.materialType);
						}
					});
				});
			});

			var accountChanged = function accountChanged(account) {
				service.selected = null;
				service.selectedSubMenu =null;
				service.currentMenu = null;
				if(account && account.appId) {
					service.loadItemById();
				}else{
					service.createNew();
				}
			};

			var selectedMenuChanged = function selectedMenuChanged(){
				creatingMaterial = false;
			};

			materialsDataSvc.registerItemCreated(materialCreated);
			accountDataSvc.registerCurrentItemChanged(accountChanged);
			platformMenuDataSvc.registerMenuSelected(selectedMenuChanged);

			//service.loadItemById();
			accountChanged();

			return service;
		}]);

}(angular));