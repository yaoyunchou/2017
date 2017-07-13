/*globals ClipboardEvent*/
(function (angular) {
	"use strict";
	angular.module('platform').directive('nswClipboard', ['platformModalSvc', function (platformModalSvc) {
		return {
			restrict: 'A',
			link: function (scope, element, attrs) {
				element.on('click', function () {
					if(attrs.disable==='disabled'){
						return;
					}
					var copyFrom = $('<textarea/>');
					copyFrom.text(attrs.nswClipboard);
					$('body').append(copyFrom);
					copyFrom.select();
					var result = true;
					try {
						result = document.execCommand('copy');
					}catch (e){
						result = false;
					}
					copyFrom.remove();

					if(result){
						platformModalSvc.showSuccessTip("拷贝到剪切板成功!");
					}else{
						platformModalSvc.showModal({
							size:'sm',
							templateUrl:globals.basAppRoute + 'components/templates/platform-clipboard-error-dialog.html',
							options:{
								content:attrs.nswClipboard
							}
						});
					}

					if (attrs.onCopy) {
						scope.$eval(attrs.onCopy, {$event: {data: attrs.nswClipboard}});
					}
				});
			}
		};
	}]);

}(angular));