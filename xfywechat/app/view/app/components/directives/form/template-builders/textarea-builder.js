(function (angular) {
	"use strict";
	angular.module('platform').service('textareaBuilderSvc',
		['baseTemplateBuilder', 'validationBuilderSvc', 'validationTipBuilderSvc',
			function (baseTemplateBuilder, validationBuilderSvc, validationTipBuilderSvc) {
				var service = {}, baseBuilder = new baseTemplateBuilder();
				service.init = function init(formOptions, editorOptions) {
					baseBuilder.init(formOptions, editorOptions);
					baseBuilder.getTemplate('textarea');
					validationBuilderSvc.init(formOptions, editorOptions);
					validationTipBuilderSvc.init(formOptions, editorOptions);
					baseBuilder.addConfiguration(/%errors%/g, validationBuilderSvc.build());
					baseBuilder.addConfiguration(/%validateTip%/g, validationTipBuilderSvc.build());
					baseBuilder.addConfiguration(/%validators%/g, editorOptions.validateDirectives || '');
					baseBuilder.addConfiguration(/%rows%/g, editorOptions.rows || '3');
				};

				service.build = function build() {
					return baseBuilder.buildConfigurations();
				};
				return service;
			}]);
}(angular));