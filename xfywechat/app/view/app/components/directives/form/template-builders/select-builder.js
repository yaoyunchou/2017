(function (angular) {
	"use strict";
	angular.module('platform').service('selectBuilderSvc',
		['baseTemplateBuilder', 'validationBuilderSvc', 'validationTipBuilderSvc',
			function (baseTemplateBuilder, validationBuilderSvc, validationTipBuilderSvc) {
				var service = {}, baseBuilder = new baseTemplateBuilder();
				service.init = function init(formOptions, editorOptions) {
					baseBuilder.init(formOptions, editorOptions);
					baseBuilder.getTemplate('select');

					validationBuilderSvc.init(formOptions, editorOptions);
					validationTipBuilderSvc.init(formOptions, editorOptions);
					baseBuilder.addConfiguration(/%errors%/g, validationBuilderSvc.build());
					baseBuilder.addConfiguration(/%validateTip%/g, validationTipBuilderSvc.build());
					baseBuilder.addConfiguration(/%validators%/g, editorOptions.validateDirectives||'');

					baseBuilder.addConfiguration(/%key%/g, editorOptions.key||'');
					baseBuilder.addConfiguration(/%display%/g, editorOptions.display||'');
				};

				service.build = function build() {
					return baseBuilder.buildConfigurations();
				};
				return service;
			}]);
}(angular));