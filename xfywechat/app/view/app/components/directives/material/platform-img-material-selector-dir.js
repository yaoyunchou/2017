(function (angular) {
	"use strict";
	angular.module('platform').directive('platformImgMaterialSelector', ['$http', 'nswGlobals', function ($http, nswGlobals) {
		return {
			restrict: 'A',
			require: 'ngModel',
			scope: {
				remove: '&',
				afterSelect: '&'
			},
			templateUrl: globals.basAppRoute + 'components/templates/materials/platform-img-material-selector-dir.html',
			link: function (scope, element, attr, ctrl) {
				scope.imageUrl = globals.imageUrl.replace(/@appId/, nswGlobals.getValue('appId'));
				scope.afterImageSelected = function afterImageSelected(image) {
					scope.materialId = image.fileId;
					ctrl.$setViewValue(scope.materialId);
					scope.afterSelect({material:image});
				};

				scope.doRemove = function doRemove(){
					scope.material = {};
					scope.materialId = '';
					ctrl.$setViewValue(scope.materialId);
					scope.remove();
				};

				scope.imageUploaded = function imageUploaded(file){
					scope.afterImageSelected(file);
				};


				ctrl.$render = function render() {
					scope.materialId = ctrl.$viewValue;
				};
			}
		};
	}]);

}(angular));