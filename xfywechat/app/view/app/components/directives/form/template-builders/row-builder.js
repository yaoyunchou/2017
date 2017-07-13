/*globals*/
(function (angular) {
	"use strict";
	angular.module('platform').factory('rowBuilderSvc',
		['baseTemplateBuilder', '$injector', 'labelBuilderSvc',
			function (baseTemplateBuilder, $injector, labelBuilderSvc) {

				var service = {}, baseBuilder = new baseTemplateBuilder();
				service.init = function (formOptions, editorOptions) {
					baseBuilder.init(formOptions, editorOptions);
					baseBuilder.getTemplate('row');

					var editorBuilderSvc = $injector.get(editorOptions.template + 'BuilderSvc');
					editorBuilderSvc.init(formOptions, editorOptions);
					labelBuilderSvc.init(formOptions, editorOptions);

					var labelTemplate = labelBuilderSvc.build();
					var editorTemplate = editorBuilderSvc.build();

					baseBuilder.addConfiguration(/%label%/g, labelTemplate);
					baseBuilder.addConfiguration(/%content%/g, editorTemplate);

				};

				service.build = function () {
					return baseBuilder.buildConfigurations();
				};
				return service;
			}]);
}(angular));