(function (angular) {
	"use strict";

	angular.module('platform').directive('nswDropdown', [function () {
		return {
			restrict: 'A',
			scope: {
				items: '=',
				afterSelect: '&',
				dir: '@',
				filter: '=',
				reject: '='
			},
			templateUrl: globals.basAppRoute + 'components/directives/dropdown/platform-nsw-dropdown-dir.html',
			require: 'ngModel',
			link: function (scope, element, attr, ctrl) {
				var isFiltered = false;
				scope.display = attr.nswDisplay;
				scope.value = attr.nswValue;

				var setSelected = function setSelected(item) {
					item = item || {};
					scope.selected = item;
					if (item.id === -9999) {
						scope.displayText = item.name;
					} else {
						scope.displayText = _.get(item, scope.display);
					}
				};

				scope.select = function select(item) {
					item = item || {};
					if (item.id === -9999) {
						return;
					}
					var value = _.get(item, scope.value);
					if (angular.isDefined(value)) {
						ctrl.$setViewValue(value);
						setSelected(item);
					}
					scope.afterSelect({value: value, selected: item});
				};

				var execOutterFitler = function execOutterFitler(items) {
					items = items || scope.items;
					if (scope.filter) {
						items = _.filter(items, scope.filter);
					}

					if (scope.reject) {
						items = _.reject(items, scope.reject);
					}
					return items;
				};

				scope.execFilter = function execFilter(items) {
					items = items || scope.items;
					items = execOutterFitler(items);
					scope.displayItems = _.filter(items, function (item) {
						var text = _.get(item, scope.display);
						return !scope.displayText || text.indexOf(scope.displayText) >= 0;
					});
					isFiltered = true;
				};

				scope.displaySelect = function displaySelect(showSelect, showAll) {
					if (scope.dir === 'up') {
						element.find('.dropmenu').css('position', 'inherit');
					}

					if (angular.isUndefined(showSelect)) {
						showSelect = !element.find('.dropmenu').hasClass('open');
					}
					var isOpen = element.find('.dropmenu').hasClass('open');
					showSelect = !!showSelect;
					isOpen = !!isOpen;
					if (showSelect !== isOpen) {
						element.find('.nsw-dropdown-menu').dropdown('toggle');
					}

					if (showAll) {
						scope.displayItems = execOutterFitler(scope.items);
					}
				};

				ctrl.$render = function render() {
					var value = ctrl.$viewValue;
					var filter = {};
					_.set(filter, scope.value, value);
					var item = _.find(scope.items, filter);
					setSelected(item);
				};

				element.on('click', function (e) {
					e.stopPropagation();
				});

				element.on('keyup', function () {
					scope.displaySelect(true);
					scope.execFilter();
					scope.$apply();
				});

				$('body').on('click', function () {
					setTimeout(function () {
						scope.$apply();
					}, 500);
				});

				scope.$watchCollection('items', function (items, initItems) {
					if (initItems && initItems.length && isFiltered) {
						scope.execFilter(items);
					} else {
						items = execOutterFitler(items);
						scope.displayItems = items;
					}

					scope.displayItems = scope.displayItems || [];

					if (!scope.displayItems.length) {
						scope.displayItems.push({name: '【无】', id: -9999});
					}

					var filter = {};
					filter[scope.value] = ctrl.$viewValue;
					setSelected(_.find(items, filter));
				});

				scope.$watch(function () {
					return element.find('.dropmenu').hasClass('open');
				}, function (isOpen) {
					if (!isOpen) {
						setSelected(scope.selected);
					}
				});
			}
		};
	}]);

}(angular));