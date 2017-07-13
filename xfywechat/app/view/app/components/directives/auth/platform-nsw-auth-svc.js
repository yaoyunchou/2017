(function (angular) {
	"use strict";

	angular.module('platform').factory('platformNswAuthSvc', ['$http','$q', 'platformModalSvc', '$localStorage',
		function ($http,$q, platformModalSvc, $localStorage) {
			var service = {};

			service.getAuth = function getAuth(key) {
				var nswAuths = $localStorage.nswAuths ||[];
				return !!_.find(nswAuths, {authority: key});
			};

			service.loadAuthData = function loadAuthData() {
				var uri = globals.basAppRoot + '/user/getAuthoritiesCode';
				var defer = $q.defer();
				$http.get(uri).then(function (res) {
					if (res.data.isSuccess) {
						$localStorage.nswAuths = _.map(res.data.data, function(code){
							return {authority:code};
						});
						defer.resolve($localStorage.nswAuths);
					} else {
						platformModalSvc.showWarmingMessage('权限数据获取失败', '提示');
						defer.reject('权限数据获取失败');
					}
				}, function (error) {
					console.error(error);
					platformModalSvc.showWarmingMessage('权限数据获取失败', '提示');
					defer.reject('权限数据获取失败');
				});

				return defer.promise;
			};

			return service;

		}]);
}(angular));