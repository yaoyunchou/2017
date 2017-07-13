(function(angular){
	"use strict";
	angular.module("autoReply").controller("messageListCtrl",['$scope','messageSvc','basListCtrlSvc','messageChatSvc',function($scope,messageSvc,basListCtrlSvc,messageChatSvc){
		basListCtrlSvc.createInstance($scope, messageSvc,{
			detailState:'wechat.chat'
		});
		$scope.searchData();
		$scope.searchOptions.dayNum = 0;
		$scope.isShow = function isShow(item){
			if(_.has(item,'reply.content')){
						item.reply.content = '';
			}
			item.isShow = !item.isShow;
		};

		$scope.timeFrame = [{
			_id: 0,
			name: '全部'
		},{
			_id: 1,
			name: '今天'
		}, {
			_id: 2,
			name: '昨天'
		}, {
			_id: 3,
			name: '前天'
		}, {
			_id: 4,
			name: '最近五天'
		}];

		$scope.send = function send(item,form){
			form.$valid= false;
			var data = item.reply;
			data.openId = item.fromUserName;
			messageSvc.send(data,item.msgId);
		};
		$scope.search = function search(){
			$scope.searchOptions.pageNum = 1;
			$scope.searchData();
		};
		$scope.msgCreate = function msgCteate(item){
			messageSvc.setOpenId(item.fromUserName);
			messageChatSvc.loadSearchData();
			$scope.create();
		};
        messageSvc.registerListLoaded(function(){
	        if(!$scope.searchOptions.hasOwnProperty('dayNum')){
		        $scope.searchOptions.dayNum = 0;
	        }

        });

		$scope.$on('$destroy',function(){
			messageSvc.unregisterListLoaded();
		});
	}]);


}(angular));
