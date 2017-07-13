(function (angular) {
	"use strict";

	angular.module('platform').directive('nswComboBox', ['$compile',function () {
		return {
			restrict: 'A',
			require: 'ngModel',
			scope: {
				nswChildren: '@',
				nswData: '=',
				nswDisplay: '@',
				nswKey: '@'
			},
			priority:1000,
			templateUrl: globals.basAppRoute+'components/templates/platform-nsw-combo-box-dir.html',
			link: function (scope, element, attrs, ctrl) {

				var spaces = '　　　　　　　　　　　　　　　　　　';

				var mapTree = function mapTree(tree, result, leval) {
					tree = _.isArray(tree) ? tree : [tree||{}];
					leval = leval || 0;
					result = result || [];
					_.forEach(tree, function (node) {
						/*if(scope.model && _.get(node,scope.nswKey) === scope.model.key && leval>=1) {
							return false; //continue
						}*/
						var copy = {};
						copy.key = node[scope.nswKey];
						copy.display =  node[scope.nswDisplay];
						copy.spaces = new Array(leval);
						copy._source = node;
						result.push(copy);
						if (node[scope.nswChildren]) {
							copy.display  = spaces.slice(0,leval) +'└　' + copy.display;
							mapTree(node[scope.nswChildren], result, leval + 1);
						}else{
							copy.display  =spaces.slice(0,leval) + '├' + copy.display;
						}
					});

					return result;
				};

				scope.onChange = function onChange() {
					var selected = scope.collection[$('select',element)[0].selectedIndex];
					//var selected = _.find(scope.collection, {key: item});
					if(selected) {
						ctrl.$setViewValue(selected._source);
						element.parent().controller('form').$setDirty();
					}
					if(attrs.ngChange){
						scope.$parent.$eval(attrs.ngChange);
					}
					scope.collection = mapTree(scope.nswData);
					ctrl.$dirty = true;
				};


				ctrl.$render = function $render(){
					scope.model = ctrl.$viewValue;
					var mapper = {};
					if(scope.model && scope.model[scope.nswKey]){
						mapper.key = scope.model[scope.nswKey];
						scope.model = _.find(scope.collection,mapper);
						scope.collection = mapTree(scope.nswData);
					}else{
						scope.model = null;
					}
				};

				scope.isSelected = function isSelected(item){
					if(scope.model && item) {
						return scope.model.key === item.key;
					}

					return false;
				};

				scope.collection = mapTree(scope.nswData);
				ctrl.$render();
				scope.$watch('nswData',function(val){
					scope.collection = mapTree(val);
					ctrl.$render();
				});

				scope.$evalAsync(function(){
					element.find('select').on('change', scope.onChange);
				});
			}
		};
	}]);

}(angular));