(function (angular) {
	"use strict";

	angular.module('platform').directive('platformPagenation', [function () {
		return {
			restrict: 'A',
			scope: {
				searchOptions: '=',
				nswRefresh: "&"
			},
			templateUrl: globals.basAppRoute + 'components/templates/platform-pagenation-dir.html',
			link: function (scope) {
				scope.pagesList = [];
				scope.hasVal = true;
				scope.searchOptions.pageNum = scope.searchOptions.pageNum || 1;

				var dataListWatch = scope.$watch('searchOptions.totalRows', function (newValue) {
					if (!!newValue) {
						scope.hasVal = true;
					} else {
						scope.hasVal = false;
					}
				});
				var currentPagetWatch = scope.$watch('searchOptions.totalPages', function (newValue) {
					scope.pagesList = [];
					for (var i = 1; i <= newValue; i++) {
						scope.pagesList.push(i);
					}
				});

				scope.goNext = function goNext() {
					if (scope.searchOptions.pageNum < scope.searchOptions.totalPages) {
						scope.searchOptions.pageNum++;
						scope.nswRefresh({options: scope.searchOptions});
					}
				};
				scope.getPrevious = function getPrevious() {
					if (scope.searchOptions.pageNum > 1) {
						scope.searchOptions.pageNum--;
						scope.nswRefresh({options: scope.searchOptions});
					}
				};
				scope.goPage = function goPage() {
					scope.nswRefresh({options: scope.searchOptions});
				};
				scope.$on('$destroy', function () {
					currentPagetWatch();
					dataListWatch();
				});
			}
		};
	}]);
}(angular));