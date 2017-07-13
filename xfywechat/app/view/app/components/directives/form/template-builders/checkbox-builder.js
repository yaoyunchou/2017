/*globals _*/
(function (angular) {
	"use strict";
	angular.module('platform').factory('checkboxBuilderSvc',
		['baseTemplateBuilder',
			function (baseTemplateBuilder) {

				var service = {}, baseBuilder = new baseTemplateBuilder();

				service.init = function init(formOptions, editorOptions){
					baseBuilder.init(formOptions, editorOptions);

					var radioTemplate = baseBuilder.getTemplate('checkbox', true);
					baseBuilder.getTemplate('radioGroup');

					var optionTemplates = [];
					_.forEach(baseBuilder.editor.options, function (option) {
						var template = radioTemplate
							.replace(/%checked%/g, !!option.checked)
							.replace(/%key%/g, option[baseBuilder.editor.key])
							.replace(/%model%/g,'data.'+option.parent+'.'+option.model)
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

