/*globals _*/
(function (angular) {
	"use strict";

	angular.module('platform').service('baseTemplateBuilder', ['$templateCache',
		function ($templateCache) {
			return function Constructor() {
				var service = {};
				service.nameFormat = 'form-%name%.html';

				service.init = function init(formOptions, editorOptions) {
					service.form = formOptions;
					service.editor = editorOptions;
					//service.template = '';
					resetConfiguration();
				};

				service.getTemplate = function getTemplate(name, readonly) {
					name = service.nameFormat.replace(/%name%/g, name);
					var template = $templateCache.get(name);
					service.template = readonly ? service.template : template;
					return template;
				};

				service.buildTemplateKey = function buildTemplateKey(reg, value) {
					service.template = service.template.replace(reg, value);
				};

				service.buildConfigurations = function buildConfigurations() {
					angular.forEach(service.configuration, function (config) {
						service.buildTemplateKey(config.key, config.value);
					});
					return service.template;
				};

				service.addConfiguration = function addConfiguration(configurations) {
					if (_.isUndefined(configurations)) {
						return;
					}

					if (!_.isArray(configurations)) {
						configurations = [configurations];
					}

					if ((_.isRegExp(arguments[0]) && !_.isUndefined(arguments[0]))) {
						configurations = [{key: arguments[0], value: arguments[1]}];
					}

					_.forEach(configurations, function (config) {
						service.configuration.unshift(config);//new added items has a higher priority
					});
				};

				var gridSize = 'col-md-%s% col-lg-%s% col-sm-%s% col-xs-%s%';
				var resetConfiguration = function resetConfiguration() {
					service.configuration = [
						{key: /%formName%/g, value: (service.form.name || '')},
						{key: /%name%/g, value: (service.editor.name || '')},
						{key: /%default%/g, value: (service.editor['default'] || '')},
						{key: /%lookup%/g, value: (service.editor.lookup || '')},
						{key: /%size%/g, value: gridSize.replace(/%s%/g, service.editor.size)},
						{key: /%type%/g, value: (service.editor.type || '')},
						{key: /%model%/g, value: ('data.' + service.editor.model || '')},
						{key: /%directive%/g, value: (service.editor.directive || '')},
						{key: /%options%/g, value: (service.editor.options || '')},
						{key: /%maxLength%/g, value: (service.editor.maxLength || '')},
						{key: /%maxWord%/g, value: (service.editor.maxWord || '')},
						{key: /%label%/g, value: (service.editor.label || '')},
						{key: /%placeholder%/g, value: (service.editor.placeholder || '')},
						{key: /%validators%/g, value: (service.editor.validateDirectives || '')},
						{key: /%id%/g, value: (service.editor.id|| '')}
					];
				};
				return service;
			};
		}]);
}(angular));