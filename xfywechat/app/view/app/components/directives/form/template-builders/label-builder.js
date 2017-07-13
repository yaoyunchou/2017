(function (angular) {
	"use strict";

	angular.module('platform').factory('labelBuilderSvc',
		['baseTemplateBuilder',
			function (baseTemplateBuilder) {

				var service = {}, baseBuilder = new baseTemplateBuilder();

				service.init = function init(formOptions, editorOptions) {
					baseBuilder.init(formOptions, editorOptions);
					baseBuilder.getTemplate('label');

					if (editorOptions.hasLabel) {
						var requiredTemplate = editorOptions.required?baseBuilder.getTemplate('required', true):'';
						baseBuilder.addConfiguration(/%required%/g, requiredTemplate);
					} else {
						baseBuilder.template = '';
						baseBuilder.configuration = [];
					}
				};

				service.build = function () {
					return baseBuilder.buildConfigurations();
				};
				return service;
			}]);
}(angular));