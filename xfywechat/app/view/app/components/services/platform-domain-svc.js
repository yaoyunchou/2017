(function (angular) {
	"use strict";

	angular.module('platform').service('platformDomainSvc'[function(){
		var domainTypes = {
			fastEdit:{},
			text:{},
			url:{
				regexp:'(http[s]{0,1}|ftp)://[a-zA-Z0-9\\.\\-]+\\.([a-zA-Z]{2,4})(:\\d+)?(/[a-zA-Z0-9\\.\\-~!@#$%^&*+?:_/=<>]*)?'
			},
			email:{},
			qq:{},
			mobile:{},
			skype:{},
			title:{},
			shortTitle:{},
			status:{},
			check:{},
			radio:{},
			money:{},
			number:{},
			date:{},
			datetime:{},
			year:{}
		};

		return function Constructor(){
			this.domainTypes = domainTypes;
		};
	}]);
}(angular));