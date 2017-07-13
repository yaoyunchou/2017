(function (angular) {
	"use strict";
	angular.module('platform').service('htmleditorBuilderSvc',
		['baseTemplateBuilder', 'validationBuilderSvc', 'validationTipBuilderSvc',
			function (baseTemplateBuilder, validationBuilderSvc, validationTipBuilderSvc) {
				var service = {}, baseBuilder = new baseTemplateBuilder();
				service.init = function init(formOptions, editorOptions) {
					baseBuilder.init(formOptions, editorOptions);
					baseBuilder.getTemplate('htmleditor');
					validationBuilderSvc.init(formOptions, editorOptions);
					validationTipBuilderSvc.init(formOptions, editorOptions);
					baseBuilder.addConfiguration(/%errors%/g, validationBuilderSvc.build());
					baseBuilder.addConfiguration(/%validateTip%/g, validationTipBuilderSvc.build());
					baseBuilder.addConfiguration(/%validators%/g, editorOptions.validateDirectives || '');
					//%simple%
					baseBuilder.addConfiguration(/%simple%/g, !!editorOptions.isSimple);
				};

				service.build = function build() {
					return baseBuilder.buildConfigurations();
				};
				return service;
			}]);




}(angular));