/*global angular*/
(function (angular) {
	"use strict";
	angular.module('platform').controller('platformModalTipCtrl', ['$scope', '$timeout', function ($scope, $timeout) {
		//close the dialog on three seconds later after display.
		var isOverflow = ($('[ng-controller="desktopMainCtrl"]')[0] || $(window)[0]).clientHeight > $(window).height();

		$scope.modalOptions.closeModal = function closeModal(){
			$scope.closeModal();
		};

		$scope.getTipIcon = function getTipIcon() {
			switch ($scope.modalOptions.type) {
				case 'success':
					return 'icon-success';
				case 'warming':
					return 'icon-warming';
				default:
					return 'icon-loading';
			}
		};

		$('.tip-box').closest('.modal-content')
			.css('border', 0)
			.css('box-shadow', '0 0 0')
			.css('background-color', '#C4C5CA')
			.closest('.modal-dialog')
			.css('box-shadow', '0 0 0')
			.css('opacity', 0.6);

		if($scope.modalOptions.type !== 'loading') {
			if(isOverflow) {
				$('html').css('overflow-y', 'auto');
			}

			$('.tip-box').closest('.modal-backdrop').css('display', 'none');

			$('.tip-box').closest('.nsw.modal-dialog').css('margin', 0);

			$('.tip-box').closest('.nsw.modal').css('width', $('.modal-content').width)
					.css('height', '59px')
					.css('overflow', 'hidden')
					.css('margin-top', '150px')
					.css('width', '300px')
					.css('margin-left', '40%');

			$timeout(function () {
				$scope.closeModal(true);
			}, 2000);
		}
	}]);
}(angular));