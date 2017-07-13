(function (angular) {
	"use strict";

	angular.module('platform').service('platformFormDomainSvc', [function () {
		var service = {};

		var domains = {
			text: {
				template: 'input',
				type: 'text',
				size:5
			},
			textarea: {
				template: 'textarea',
				rows:3,
				size:5
			},
			htmleditor: {
				template: 'htmleditor',
				isSimple:true,
				size:5
			},
			select:{
				template: 'select',
				key:'id',
				display:'name',
				size:5
			},
			name: {
				template: 'input',
				type: 'text',
				maxLength: 32,
				required: true,
				size:5
			},
			description: {
				template: 'input',
				maxLength: 32,
				type: 'text',
				required: true,
				size:5
			},
			email: {
				template: 'input',
				type: 'email',
				size:5,
				validates:[
					{type: 'email', message: '请填写正确的邮件地址!'}
				]
			},
			url: {
				template: 'input',
				type: 'url',
				size:5,
				validates:[
					{type: 'url', message: '请填写正确的链接地址(http://)!'}
				]
			},
			radio: {
				template: 'radio',
				key:'id',
				display:'name',
				size:5
			},
			checkbox: {
				template: 'checkbox',
				key:'id',
				display:'name',
				size:5
			},
			singleimage: {
				template: 'singleimage',
				key:'id',
				display:'name',
				size:5
			},
			adlib: {
				template: 'adlib',
				key:'id',
				display:'name',
				size:5
			}
		};

		service.getDomainConfig = function getDomainConfig(domain) {
			return domains[domain];
		};
		return service;
	}]);
}(angular));