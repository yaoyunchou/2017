(function (angular) {
	"use strict";
	angular.module('platform').factory('platformHttpInterceptor', ['$injector', '$location', function ($injector, $location) {

		var logout = function logout(){
			var platformModalSvc = $injector.get('platformModalSvc');
			platformModalSvc.showErrorMessage('登陆超时', '温馨提示').then(function () {
				window.location = '/pccms/j_spring_cas_security_logout';
			});
		};

		var interceptor = {
				'request': function (config) {
					return config; // or $q.when(config);
				},
				'response': function (response) {
					if (response.data.isSuccess === false && response.data.state === 401) {
						logout();
					}
					if (typeof response.data === 'string') {
						if (response.data.indexOf instanceof Function &&
							response.data.indexOf('<div id="login_wrap" style="height: 775px;">') !== -1) {
							logout();
						}
					}
					return response; // or $q.when(config);
				},
				'requestError': function (rejection) {
					return rejection; // or new promise
				},
				'responseError': function (rejection) {
					if (rejection.status === 401) {
						logout();
					}
					return rejection; // or new promise
				}
			};
		return interceptor;
	}]);
}(angular));