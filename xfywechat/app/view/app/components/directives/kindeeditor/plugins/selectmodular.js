/*globals KindEditor, _*/
(function (angular) {
	"use strict";

	angular.module('platform').factory('selectmodularPluginSvc', ['platformModalSvc', function (platformModalSvc) {
		var service = {};
		service.init = function init() {
			KindEditor.plugin('selectmodular', function (K) {
				var self = this, name = 'selectmodular';

				self.lang({
					'selectmodular': '文章模板'
				});

				var updateDisplay = function updateDisplay(content, replace) {
					if (replace) {
						self.html(content);
					} else {
						self.insertHtml(content);
					}
				};

				var showImageDialog = function showImageDialog() {
					return platformModalSvc.showModal({
						backdrop: 'static',
						templateUrl: globals.basAppRoute + '/components/templates/platform-template-view.html',
						controller: 'templateLib',
						size: 'lg'
					}).then(function (module) {
						if (module && module.template) {
							updateDisplay(module.template.htmlContent || '', module.replace);
						}
					});
				};

				self.plugin.spechars = {
					edit: function () {
						showImageDialog();
					}
				};

				self.clickToolbar(name, self.plugin.spechars.edit);
			});
		};
		return service;
	}]);
}(angular));