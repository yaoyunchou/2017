(function (angular) {
	"use strict";

	angular.module('platform').directive('nswAuthIf', ['platformNswAuthSvc', function (authSvc) {
		return {
			link: function(scope, element, attrs){
				var key = attrs.nswAuthIf;

				var subScope = scope.$new(false);
				subScope.hasCode = function hasCode(code){
					return authSvc.getAuth(code);
				};

				var setDisable = function setDisable(){
					element.addClass('not-authed-hide');
				};

				var setEnable = function setEnable(){
					element.removeClass('not-authed-hide');
				};

				if(!authSvc.getAuth(key)){
					setDisable();
				}

				var authWatcher = scope.$watch(function () {
					var isExp = /^\${1}/;
					if(isExp.test(key)) {
						return subScope.$eval( key.replace(isExp,''));
					}else {
						return authSvc.getAuth(key);
					}
				}, function (authed) {
					if(!authed){
						setDisable();
					}else{
						setEnable();
					}
				});

				scope.$on('$destroy', function () {
					authWatcher();
				});
			}
		};
	}]);
}(angular));