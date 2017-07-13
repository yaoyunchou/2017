/*global angular*/
(function (angular) {
	"use strict";
	angular.module("materials").controller("materialsDetailAddCtrl", ['$scope', '$state','materialsDataSvc',
		function ($scope, $state,materialsDataSvc) {
			$scope.valiPreveiw = true;
			var watcher = $scope.$watch('formmaterials.$valid',function(newValue){
				if(newValue){
					$scope.valiPreveiw = materialsDataSvc.validatePreviewData($scope.currentItem);
				}else{
					$scope.valiPreveiw = false;
				}

			});
			$scope.$on('$destroy', function () {
				watcher();
				if ($state.current.name !== 'wechat.materials.apply') {
					$scope.setArrowIndex(0);
				}
			});

			$scope.setForm(function(){
				return $scope.formmaterials;
			});

			if(!$scope.checkAuthed('phoneProj')){
				$scope.goState('wechat.materials.add');
			}

		}]);
}(angular));