/*globals _*/
(function (angular) {
	"use strict";
	angular.module('platform').factory('radioBuilderSvc',
		['baseTemplateBuilder',
			function (baseTemplateBuilder) {

				var service = {}, baseBuilder = new baseTemplateBuilder();

				service.init = function init(formOptions, editorOptions){
					baseBuilder.init(formOptions, editorOptions);

					var radioTemplate = baseBuilder.getTemplate('radio', true);
					baseBuilder.getTemplate('radioGroup');

					var optionTemplates = [];
					_.forEach(baseBuilder.editor.options, function (option) {
						var template = radioTemplate
							.replace(/%checked%/g, !!option.checked)
							.replace(/%key%/g, option[baseBuilder.editor.key])
							.replace(/%display%/g, option[baseBuilder.editor.display]);
						optionTemplates.push(template);
					});
					baseBuilder.addConfiguration(/%content%/g, optionTemplates.join('\r\n'));

				};

				service.build = function () {

					return baseBuilder.buildConfigurations();
				};
				return service;
			}]);
}(angular));

