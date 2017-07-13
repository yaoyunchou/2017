(function (angular) {
	"use strict";

	angular.module('member').directive('memberTags', ['memberCtgDataSvc','platformModalSvc','memberDataSvc',function (memberCtgDataSvc,platformModalSvc,memberDataSvc) {
		return {
			restrict: 'A',
			scope: {
				afterSelect: '&',
				createCatalog:'&',
				ctgData:'='
			},
			templateUrl: globals.basAppRoute + 'member/directives/member-tags-dir.html',
			require: 'ngModel',
			link: function (scope, element, attr, ctrl) {
			//	basListCtrlSvc.createInstance(scope, memberTagDataSvc);
				scope.tagIdList = [];
				scope.err = '';
				scope.display = attr.nswDisplay;
				scope.UI = {};
				scope.UI.show = false;
				scope.value = attr.nswValue;
				scope.memberId = attr.member;
				element.parent().find('.caret,.show-tag-box').click(function(){

					if(!$(this).hasClass('disabled-btn')){
						$('.getTags .btn-cancel').click();
						if(attr.placement === 'bottom'){
							scope.UI.show = true;
						}else{
							element.addClass('member-position-bottom');
							scope.UI.show = true;
						}
					}

					scope.$apply();
				});

				//memberCtgDataSvc.registerListLoaded(function(data){
				//	scope.tagList =_.filter(data, function(o) { return o.name!=='未分组'; });
				//});
				scope.tagList = scope.ctgData;
				ctrl.$render = function render() {
					scope.tagIdList = angular.copy(ctrl.$viewValue);
					angular.forEach(scope.tagIdList,function(data){
						if(data instanceof Object){
							data.isChecked = true;
						}
					});
				};
				scope.isSelected = function isSelected(item){
					if(!_.find(scope.tagIdList,function(o) { return o.tagId ===item.tagId; })){
						scope.tagIdList.push(item);
					}else{
						scope.tagIdList = _.filter(scope.tagIdList, function(o) { return o.tagId!==item.tagId; });
					}
					if(scope.tagIdList.length>3){
						scope.err = '最多只能选择3个标签';
					}else{
						scope.err = '';
					}
				};
				scope.validationTagIdList = function validationTagIdList(){
					return scope.tagIdList.length&&0<scope.tagIdList.length&&scope.tagIdList.length<=3;
				};
				scope.saveTags = function saveTags(){
					memberDataSvc.userTag(scope.tagIdList,scope.memberId).then(function(){
						scope.UI.show = false;
						ctrl.$setViewValue(scope.tagIdList);
						scope.tagIdList = [];
					},function(data){
						platformModalSvc.showWarmingTip(data);
					});

				};
				scope.close = function close(){
					scope.UI.show = false;
				};
				scope.isSelecteds = function isSelecteds(openid){
					return  !! _.find(scope.tagIdList,function(o) { return o.tagId ===openid; });

				};

				var wacher = scope.$watch('ctgData',function (newValue) {
					if(newValue){
						scope.tagList = scope.ctgData;
					}
				});
				scope.$on('$destroy',function(){

					wacher();
					memberCtgDataSvc.unregisterListLoaded();
				});
			}
		};
	}]);

}(angular));