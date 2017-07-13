(function (angular) {
	"use strict";
	angular.module('platform').directive('nswSortable', [function () {
		return {
			restrict: 'A',
			scope: {
				nswSortableEnable: '=',
				updated: '&',
				//options:'=',
				items: '=',
				child: '@'
			},
			link: function (scope, element, attrs) {
				var _sortable;
				scope.onUpdated = function onDrag(event, ui) {

					var dataList = [];
					_.forEach(element.children(), function (child) {
						var childScope = $(child).scope();
						if (childScope) {
							var childData = childScope.$eval(scope.child);
							if (_.find(scope.items, childData)) {
								dataList.push(childData);
								_.remove(scope.items, childData);
							}
						}
					});

					_.forEach(dataList, function (data) {
						scope.items[scope.items.length] = data;
					});

					scope.updated({source: scope.items});
					scope.$digest();
				};

				scope.onDrop = function onDrag(source, target) {
					scope.select({source: source, target: target});
				};

				scope.$evalAsync(function () {
					scope.options = scope.options || {};
					scope.options.items = '>*';
					if (attrs.exclude) {
						scope.options.items += ':not(' + attrs.exclude + ')';
					}
					//scope.options.containment = element;
					scope.options.update = scope.onUpdated;
					scope.options.disabled = !scope.nswSortableEnable;
					_sortable = element.sortable(scope.options);
				});

				scope.$watch('nswSortableEnable',function(val){
					scope.options = scope.options ||{};
					if(_sortable) {
						_sortable.sortable({
							disabled: !val
						});
					}
				});
			}
		};
	}]);

}(angular));