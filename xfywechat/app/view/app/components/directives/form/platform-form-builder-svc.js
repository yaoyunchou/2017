/*globals _*/
(function (angular) {
	"use strict";

	angular.module('platform').factory('platformFormBuilderSvc', ['$templateCache', '$compile', 'rowBuilderSvc', 'platformFormDomainSvc',
		function ($templateCache, $compile, rowBuilderSvc, platformFormDomainSvc) {
			var service = {};
			var getTemplate = function getTemplate(domain) {
				var name = 'form-' + domain + '.html';
				return $templateCache.get(name) || '';
			};

			var getRowTemplate = function getRowTemplate(formName, config) {
				var domain = platformFormDomainSvc.getDomainConfig(config.domain) || {};
				config = angular.extend(domain, config);

				var hasLabel = _.isBoolean(config.hasLabel) ? config.hasLabel : true;
				config.label = config.label || '';

				var rowTemplate = getTemplate('row');
				var requiredTemplate = getTemplate('required');
				var labelTemplate = hasLabel ? getTemplate('label') : '';
				var inputTemplate = getTemplate(config.template);
				var errorContainerTemplate = getTemplate('errorContainer');

				var name = (config.model || '').replace(/\./g, '');
				var validatorMessages = [], validatorTips = [], message, validateTip, inputValidators = '';
				if (config.required) {
					inputValidators += 'required ';
					message = getTemplate('error');
					message = message.replace(/%errorMessage%/g, '请填写' + config.label)
						.replace(/%formName%/g, formName)
						.replace(/%name%/g, name)
						.replace(/%error%/g, 'required');
					validatorMessages.push(message);
				}

				if (config.maxLength) {
					inputValidators += 'ng-maxlength="' + config.maxLength + '" ';
					inputTemplate = inputTemplate.replace(/%maxLengthCount%/g, config.maxLength);
					message = getTemplate('error');
					message = message.replace(/%errorMessage%/g, config.label + '长度为0~' + config.maxLength + '字符')
						.replace(/%formName%/g, formName)
						.replace(/%name%/g, name)
						.replace(/%error%/g, 'maxlength');
					validatorMessages.push(message);

					validateTip = getTemplate('maxLengthValidateTip');
					validateTip = validateTip.replace(/%maxLength%/g, config.maxLength);
					validatorTips.push(validateTip);
				}

				if (config.maxWord) {
					inputValidators += 'data-max-word="' + config.maxWord + '" ';
					message = getTemplate('error');
					message = message.replace(/%errorMessage%/g, config.label + '使用逗号、空格和分隔符，并不能超过' + config.maxWord + '个关键字')
						.replace(/%formName%/g, formName)
						.replace(/%name%/g, name)
						.replace(/%error%/g, 'maxword');
					validatorMessages.push(message);
				}

				labelTemplate = labelTemplate.replace(/%required%/g, config.required ? requiredTemplate : '')
					.replace(/%label%/g, config.label);

				rowTemplate = rowTemplate.replace(/%label%/g, labelTemplate);

				var size = config.size || 5;
				var gridSize = 'col-md-%s% col-lg-%s% col-sm-%s% col-xs-%s%';

				errorContainerTemplate = validatorMessages.length ? errorContainerTemplate.replace(/%content%/g, validatorMessages.join('\r\n')) : '';
				errorContainerTemplate = errorContainerTemplate.
					replace(/%formName%/g, formName)
					.replace(/%name%/g, name);

				inputTemplate = inputTemplate.replace(/%size%/, gridSize.replace(/%s%/g, size));
				inputTemplate = inputTemplate.replace(/%type%/g, config.type || 'text');
				inputTemplate = inputTemplate.replace(/%model%/g, 'data.' + config.model || '');
				inputTemplate = inputTemplate.replace(/%name%/g, name || '');
				inputTemplate = inputTemplate.replace(/%validators%/g, inputValidators);
				inputTemplate = inputTemplate.replace(/%errors%/g, errorContainerTemplate);
				inputTemplate = inputTemplate.replace(/%validateTip%/g, config.hasValidateTip && validatorTips.length ? validatorTips.join(' ') : '');
				//text area
				inputTemplate = inputTemplate.replace(/%rows%/g, config.textRows || '');
				//directive
				inputTemplate = inputTemplate.replace(/%directive%/g, config.directive || '');
				inputTemplate = inputTemplate.replace(/%options%/g, config.directive ? 'options' : '');

				//form row
				rowTemplate = rowTemplate.replace(/%content%/g, inputTemplate);
				return rowTemplate;
			};

			service.buildFormTemplate = function buildFormTemplate(configuration) {
				if (!configuration) {
					return '';
				}
				configuration.hasLabel = _.isBoolean(configuration.hasLabel) ? configuration.hasLabel : true;
				configuration.hasValidateTip = _.isBoolean(configuration.hasValidateTip) ? configuration.hasValidateTip : true;
				var form = configuration.name, inputTemplates = [];
				_.forEach(configuration.rows, function (config) {
					config.hasLabel = _.isBoolean(config.hasLabel) ? config.hasLabel : configuration.hasLabel;
					config.hasValidateTip = _.isBoolean(config.hasValidateTip) ? config.hasValidateTip : configuration.hasValidateTip;
					inputTemplates.push(getRowTemplate(form, config));
				});
				return inputTemplates.join('\r\n');
			};

			service.buildTemplate = function buildTemplate(formOptions, editorOptions) {
				rowBuilderSvc.init(formOptions, editorOptions);
				return rowBuilderSvc.build();
			};

			service.buildForm = function buildForm(formOptions) {
				if (!formOptions) {
					return '';
				}
				formOptions.hasLabel = _.isBoolean(formOptions.hasLabel) ? formOptions.hasLabel : true;
				formOptions.hasValidateTip = _.isBoolean(formOptions.hasValidateTip) ? formOptions.hasValidateTip : true;

				var inputTemplates = [];
				_.forEach(formOptions.rows, function (row) {
					var domain = platformFormDomainSvc.getDomainConfig(row.domain) || {};
					row = angular.extend(domain, row);
					row.label = row.label || '';
					row.name = row.name || (row.model || '').replace(/\./g, '');
					row.hasLabel = _.isBoolean(row.hasLabel) ? row.hasLabel : formOptions.hasLabel;
					row.hasValidateTip = _.isBoolean(row.hasValidateTip) ? row.hasValidateTip : formOptions.hasValidateTip;
					if (row.maxLength) {
						row.validateTip = row.validateTip || 'maxLength';
					}
					inputTemplates.push(service.buildTemplate(formOptions, row));
				});
				return inputTemplates.join('\r\n');
			};


			return service;
		}]);
}(angular));