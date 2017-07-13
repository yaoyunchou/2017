(function (angular) {
	"use strict";

	angular.module('platform').factory('validationTipBuilderSvc',
		['baseTemplateBuilder',
			function (baseTemplateBuilder) {
				var baseBuilder = new baseTemplateBuilder();
				var service = {};
				service.init = function init(formOptions, editorOptions) {
					baseBuilder.init(formOptions, editorOptions);
					if(editorOptions.hasValidateTip && editorOptions.validateTip){
						baseBuilder.getTemplate(editorOptions.validateTip+'-tip');
					}else{
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