/*global angular*/
(function(angular){
    "use strict";
	angular.module('platform').directive('nswPopover',function(){
		return{
			restrict:'A',
			link:function(scope,element){
				element.parent().hover(function(){
					element.popover('show');
				},function(){
					element.popover('hide');
				});
			}
		};
	});
}(angular));