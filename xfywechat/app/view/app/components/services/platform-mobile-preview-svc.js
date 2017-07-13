/*global angular*/
(function (angular) {
	"use strict";
	var module = angular.module('platform');
	module.factory('mobilePreviewSvc', [function () {
		var service = {};
		service.mobilePreview = function mobilePreview(pageid,state,isPubTpl) {
			state = state ||'view';
			isPubTpl = _.isUndefined(isPubTpl)?true:isPubTpl;
			window.open(globals.basAppRoot+'js/template/index.html#/template-setting?' +
				'pageid='+pageid+
				'&state='+state+
				'&isPubTpl='+isPubTpl);
		};
		return service;
	}]);
}(angular));