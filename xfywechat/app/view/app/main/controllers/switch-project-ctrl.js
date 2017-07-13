(function (angular) {
	"use strict";

	angular.module('app').controller('switchProjectCtrl', ['$scope', 'switchProjectSvc',
		function ($scope, switchProjectSvc) {
			$scope.hideMenu();
			$scope.$parent.enableSwitchProject = false;
			$scope.breadNavs = [{state: 'wechat.switchProject', name: '我的服务'}];


			var init = function init() {
				$scope.hideMenu();
				switchProjectSvc.getProjects().then(function (items) {
					$scope.projects = items || [];
				});
			};

			$scope.getIconClass = function getIconClass(item) {
				switch (item.projectType) {
					case 4:
						return 'pc';
					case 5:
						return 'phone';
					case 9:
						return 'responsive';
					case 7:
						return 'wechat';
				}
			};

			$scope.selectProject = function selectProject(project) {
				window.self.location.href = project.url;
			};

			$scope.$on('$destroy', function () {
				$scope.showMenu();
			});

			init();
		}]);
}(angular));