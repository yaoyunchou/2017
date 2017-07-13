/*globals _*/
(function (angular) {
	"use strict";

	angular.module('platform').factory('validationBuilderSvc',
		['baseTemplateBuilder',
			function (baseTemplateBuilder) {

				var service = {}, baseBuilder = new baseTemplateBuilder();
				service.init = function init(formOptions, editorOptions) {
					baseBuilder.getTemplate('errorContainer');
					baseBuilder.init(formOptions, editorOptions);
					
					var errorTemplate = baseBuilder.getTemplate('error', true);
					editorOptions.validates = editorOptions.validates || [];
					if (editorOptions.required && !_.find(editorOptions.validates,{'type':'required'})) {
						editorOptions.validates.push({type: 'required', message: '请填写%label%',directive:'data-ng-required=true'});
					}
					if (editorOptions.maxLength && !_.find(editorOptions.validates,{'type':'nswmaxlength'})) {
						editorOptions.validates.push({type: 'nswmaxlength', message: '%label%长度为0~%maxLength%字符',directive:'data-nsw-max-length="'+editorOptions.maxLength+'"'});
					}
					if (editorOptions.maxWord && !_.find(editorOptions.validates,{'type':'maxword'})) {
						editorOptions.validates.push({type: 'maxword', message: '%label%使用逗号、空格和分隔符，并不能超过%maxWord%个关键字',directive:'data-maxword="'+editorOptions.maxWord+'"'});
					}

					var errorTemplates = [];
					_.forEach(baseBuilder.editor.validates, function (validate) {
						var template = errorTemplate
							.replace(/%error%/g, validate.type)
							.replace(/%errorMessage%/g, validate.message);
						errorTemplates.push(template);
					});

					editorOptions.validateDirectives = _.map(editorOptions.validates,'directive').join(' ');

					baseBuilder.addConfiguration(/%content%/g, errorTemplates.join('\r\n'));
				};

				service.build = function () {
					return baseBuilder.buildConfigurations();
				};

				return service;

			}]);
}(angular));