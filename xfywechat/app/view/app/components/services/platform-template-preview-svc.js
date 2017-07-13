/*global angular*/
(function (angular) {
	"use strict";
	var module = angular.module('platform');
	module.factory('platformTemplatePreviewSvc', ['desktopMainSvc', function () {
		var service = {};

		service.devices = {
			pc: 4,
			phone: 5,
			reposive: 9
		};

		service.preview = function preview(pageid, state, isPubTpl, device) {
			if (!device) {
				window.open(globals.basAppRoot + 'js/template/index.html#/template-setting?' +
					'state=' + state + '&isPubTpl=' + isPubTpl + '&pageid=' + pageid);
			} else {
				window.open(globals.basAppRoot + 'js/template/index.html#/template-setting?' +
					'state=' + state + '&isPubTpl=' + isPubTpl + '&pageid=' + pageid + '&device=' + device);
			}
		};

		service.previewDetail = function previewDetail(template, pageid){
			window.open(globals.basAppRoot + 'js/template/index.html#/template-setting?' +
				 '&pageid=' + pageid + '&template=' + template+'&state=preview');
		};
		return service;
	}]);
}(angular));