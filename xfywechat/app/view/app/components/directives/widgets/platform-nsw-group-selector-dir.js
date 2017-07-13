(function (angular) {
	"use strict";

	angular.module('platform').directive('nswGroupSelector', [function () {
		return {
			restrict: 'A',
			scope: {
				onSelectAll: '&',
				onReverseSelect: '&',
				listGetter: '=',
				selectedItemsGetter: '='
			},
			templateUrl: globals.basAppRoute + 'components/templates/platform-nsw-group-selector.html',
			link: function (scope, element, attrs) {
				scope.selectAll = function selectAll(isSelected) {
					var selectedItems = scope.selectedItemsGetter.call(this);
					var dataList = scope.listGetter.call(this);
					scope.allSelected = isSelected;
					selectedItems.length = 0;

					if (isSelected) {
						_.forEach(dataList, function (item) {
							selectedItems.push(item);
						});
					}
					scope.onSelectAll({selectedItems: scope.selectedItems});
				};

				scope.reverseSelect = function reverseSelect() {
					var selectedItems = scope.selectedItemsGetter.call(this);
					var dataList = scope.listGetter.call(this);

					_.forEach(dataList, function (item) {
						if (_.find(selectedItems, item)) {
							_.remove(selectedItems, item);
						} else {
							selectedItems.push(item);
						}
					});
					scope.onReverseSelect({selectedItems: scope.selectedItems});
				};

				var selectedWatcher = scope.$watchCollection(scope.selectedItemsGetter, function () {
					var selectedItems = scope.selectedItemsGetter.call(this);
					var dataList = scope.listGetter.call(this);
					scope.allSelected = dataList.length === selectedItems.length;
				});

				var listWatcher = scope.$watchCollection(scope.listGetter, function () {
					var selectedItems = scope.selectedItemsGetter.call(this);
					var dataList = scope.listGetter.call(this);
					scope.allSelected = dataList.length && dataList.length === selectedItems.length;
				});

				scope.$on('$destroy', function () {
					selectedWatcher();
					listWatcher();
				});
			}
		};
	}]);
}(angular));