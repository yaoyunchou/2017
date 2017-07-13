(function (angular) {
	"use strict";
	angular.module('platform').directive('nswDraggable', [function () {
		return {
			restrict:'A',
			scope:{
				drag:'&',
				drop:'&',
				options:'&'
			},
			link:function(scope, element){

				scope.onDrag = function onDrag(source){
					scope.select({source:source});
				};

				scope.onDrop = function onDrag(source, target){
					scope.select({source:source, target:target});
				};

				scope.$evalAsync(function(){
					element.draggable(scope.options);
				});


			}
		};
	}]);

}(angular));