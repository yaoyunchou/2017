(function (angular) {
	"use strict";

	angular.module('platform').directive('nswAuthEnable', ['platformNswAuthSvc', function (authSvc) {
		return {
			link: function (scope, element, attrs) {
				var key = attrs.nswAuthEnable;
				var subScope = scope.$new(false);
				subScope.hasCode = function hasCode(code){
					return authSvc.getAuth(code);
				};

				var setDisable = function setDisable() {
					element.attr('disabled', 'disabled');
					element.css('readonly', 'true');
					element.addClass('not-authed');
					if (element[0].tagName.toLowerCase() === 'a' && attrs.href) {
						element.attr('data-nsw-href', attrs.href);
						element.attr('href', 'javascript:void(0)');
					}
				};

				var setEnable = function setEnablle() {
					element.removeClass('not-authed');
					element.attr('data-nsw-href', element.attr('data-nsw-href'));
				};

				if (!authSvc.getAuth(key)) {
					setDisable();
				} else {
					setEnable();
				}

				var authWatcher = scope.$watch(function () {
					var isExp = /^\${1}/;
					if (isExp.test(key)) {
						return subScope.$eval(key.replace(isExp, ''));
					} else {
						return authSvc.getAuth(key);
					}
				}, function (authed) {
					if (!authed) {
						setDisable();
					} else {
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