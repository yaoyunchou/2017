(function (angular) {
	"use strict";
	angular.module('platform').directive('platformImgUpload', ['platformModalSvc', 'platformImgUploaderSvc', 'nswGlobals', 'platformImageLibSvc',
		function (platformModalSvc, platformImgUploaderSvc, nswGlobals, platformImageLibSvc) {
			return {
				restrict: 'A',
				require: 'ngModel',
				transclude: true,
				scope: {
					imgUrl: '=',
					changeFile: '&',
					fileUploaded: '&',
					module: '@'
				},
				template: '<div><div class="container" style="display: none"></div><div class="el" ng-transclude></div></div>',
				link: function (scope, element, attrs, ctrl) {
					var loadingModal = null, uploaderSvc, options;

					var createUploader = function createUploader() {
						uploaderSvc = platformImgUploaderSvc.createUploader();
						options = uploaderSvc.getOptions();
						element.attr('id', options.nswHash);
						//uploaderSvc.createUploader();
						uploaderSvc.bind('StateChanged', function () {
							if (this.state === plupload.STARTED) {
								loadingModal = platformModalSvc.showLoadingTip('正在上传图片!');
							}
						}).bind('UploadComplete', function (sender, files) {
							var fileDtos = _.map(files, function (file) {
								var dto = {
									appId: nswGlobals.getValue('appId'),
									originName: file.fileName,
									fileName: file.target_name,
									fileId: file.target_name
								};
								uploaderSvc.removeItem(file);
								return dto;
							});

							platformImageLibSvc.saveFile(scope.module || 'file', fileDtos).then(function () {
								if (loadingModal) {
									loadingModal.close();
								}
								scope.changeFile({file: fileDtos[0], files: fileDtos});
							}, function () {
								if (loadingModal) {
									loadingModal.close();
								}
							});

						});
						uploaderSvc.runUploader(options.nswHash);
					};


					scope.$evalAsync(function () {
						createUploader();
					});

					/*element.on('click', function () {
					 container.find('label').trigger('click');
					 });
					 */
					ctrl.$render = function render() {
						scope.file = ctrl.$viewValue;
					};

					scope.$on('$destroy', function () {
						uploaderSvc.remove();
					});
				}
			};
		}]);
}(angular));