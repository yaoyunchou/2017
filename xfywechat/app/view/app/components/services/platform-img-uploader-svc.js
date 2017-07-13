(function (angular) {
	"use strict";
	angular.module('platform').factory('platformImgUploaderSvc', ['$rootScope', 'platformUploaderSvc',  'platformModalSvc', 'platformMessenger',
		function ($rootScope, platformUploaderSvc,  platformModalSvc, PlatformMessenger) {
			var service = {}, _guid,
				_defaultOptions = {
					filters: {
						max_file_size: '2mb',
						nsw_prevent_duplicates: true,
						mime_types: [
							{
								title: "图片文件",
								extensions: "jpg,gif,jpeg,bmp,png"
							}
						]
					},

					uploadCompleted: new PlatformMessenger()
				};

			var resolveBase64 = function resolveBase64(file, image) {
				platformUploaderSvc.resolveBase64(file).then(function (data) {
					image.url = data;
				});
			};

			var delExtension = function delExtension(name){
				return (name || '').replace(/(^[^.]+).\s{2,4}/,'$1');
			};


			var onError = function onError(sender, error) {
				console.error(error.message);
				switch (error.code) {
					case -600:
						platformModalSvc.showWarmingMessage('图片大小不能超过2MB！', '提示');
						break;
					default:
						platformModalSvc.showWarmingMessage(error.message, '提示');
				}
			};

			var onUploadComplete = function onUploadComplete(options) {//当所有文件上传结束时触发
				return function (sender, files) {
					_.forEach(files, function (file) {
						file.fileName = delExtension(file.name);
						return file;
					});

					var successedItems = _.filter(files, {status: plupload.DONE});
					var result = _.map(successedItems, function (file) {
						var item = {
							uploadId: file.id,
							name: delExtension(file.name),
							url: 'http://' + globals.basImageDomain + '/' + file.target_name
						};
					});
					options.uploadCompleted.fire(result);
					$rootScope.$apply();
				}
			};

			service.createUploader = function createUploader(options) {
				var _options = {};
				_.extend(_options, _defaultOptions, options);
				var uploaderSvc = platformUploaderSvc.createUploader(_options);
				uploaderSvc
					.bind('Error', onError)
					.bind('UploadComplete', onUploadComplete(_options));
				return uploaderSvc;
			};

			return service;
		}]);
}(angular));