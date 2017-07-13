(function (angular) {
	"use strict";
	angular.module('autoReply').factory('noMatchReplyDataSvc', ['basDataSvc','platformModalSvc','nswGlobals','$q', function (basDataSvc,platformModalSvc,nswGlobals,$q) {
		var options = {
			requireAppId:true,
			uri:'keyWord/reply',
			item: {
				default: {
					content:'',
					type : 2,
					replyType:'txt'
				},
				afterCreated:function(item){
					item.appId = nswGlobals.getValue('appId');
				},
				prepareCreate: function (service, options) {
					service.filterData(options.data);
				},
				prepareUpdate: function (service, options) {
					service.filterData(options.data);
				}
			},
			list: {
				enableSearch:true,
				enablePaging:true,
				listUri: 'keyWord/attentionOrMatching',
				prepareSearchParam:function(options){
					options.type = 2;
				},
				selectionMode: 'single'
				//pageSize: 6
			}
		};
		var service = basDataSvc.createInstance(options);
		service.filterData = function filterData(data) {
			if (data.replyType === 'pic') {
				if (data.hasOwnProperty('content')) {
					delete  data.content;
				}
				if (data.hasOwnProperty('mediaId')) {
					delete  data.mediaId;
				}
			} else if (data.replyType === 'news') {
				if (data.hasOwnProperty('content')) {
					delete  data.content;
				}
				if (data.hasOwnProperty('fileId')) {
					delete  data.fileId;
				}
			} else {
				if (data.hasOwnProperty('mediaId')) {
					delete  data.mediaId;
				}
				if (data.hasOwnProperty('fileId')) {
					delete  data.fileId;
				}
			}
		};
		return service;
	}]);

}(angular));