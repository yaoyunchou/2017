(function (angular) {
	"use strict";
	angular.module('platform').filter('nswEmotions', ['$sce','platformWechatEmotionSvc', function ($sce,platformWechatEmotionSvc) {
		return function (desc) {
			desc = desc || '';
			desc = '<p>'+ platformWechatEmotionSvc.codeToImg(desc)+'</p>';
			return desc;
		};
	}]);
}(angular));