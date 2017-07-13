(function (angular) {
	"use strict";
	angular.module('platform').factory('platformUploaderSvc', ['$http', '$q', 'platformModalSvc',
		function ($http, $q, platformModalSvc) {
			var service = {}, defOptions = {
				unique_names: true,
				runtimes: 'html5,flash,html4',
				max_file_size: '2mb',
				chunk_size: '4mb',
				multi_selection: !(mOxie.Env.OS.toLowerCase() === "ios"),
				uptoken_url: globals.basAppRoot + 'file/getUpToken',
				domain: globals.basImageDomain,
				get_new_uptoken: false,
				auto_start: true,
				log_level: 3,
				init: {}
			}, svcHash, keyHash = 1, registeredOptions = [], _resourceType = 'images';

			var initUUID = function initUUID() {
				$http.get(globals.basAppRoot + 'file/getFileName').then(function (res) {
					if (res.data.isSuccess) {
						svcHash = res.data.data;
					} else {
						platformModalSvc.showWarmingMessage('生成图片库命名规则失败！', '错误');
					}
				});
			};

			var generateKey = function generateKey() {
				return svcHash + '_' + keyHash++;
			};

			plupload.guid = function guid() {
				return 'resource/' + _resourceType + '/' + generateKey();
			};

			service.setResourceType = function setResourceType(resourceType) {
				_resourceType = resourceType || 'images';
			};

			window.plupload.addFileFilter('max_count', function maxCountFilter(options, file, cb) {
				var maxCount = options.maxCount;
				var listedCount = options.listedCount();
				if (maxCount && maxCount <= listedCount) {
					platformModalSvc.showWarmingMessage(options.errorTip, '提示');
					//cb(false);
					return;
				}
				cb(true);
			});

			plupload.addFileFilter('nsw_prevent_duplicates', function (value, file, cb) {
				if (value) {
					var ii = this.files.length;
					while (ii--) {
						// Compare by name and size (size might be 0 or undefined, but still equivalent for both)
						if (file.name === this.files[ii].name && file.size === this.files[ii].size) {
							var tip = plupload.translate('Duplicate file error.') + '\r\n       \'' + file.name + '\'';
							platformModalSvc.showWarmingMessage(tip, '提示').then(function () {
								cb(false);
							}, function () {
								cb(false);
							});
							return;
						}
					}
				}
				cb(true);
			});

			var Constructor = function Constructor(options) {
				var uploaderService = this, uploader, eventHandlers = {}, uploaderOptions = {}, _replaceFile;
				options = options || {};
				angular.extend(uploaderOptions, defOptions, options);
				uploaderService.nswHash = uploaderOptions.nswHash = generateKey();
				registeredOptions.push(uploaderService);

				uploaderService.checkUploader = function checkUploader(hash) {
					return uploaderOptions.nswHash === hash;
				};

				uploaderService.getOptions = function getOptions() {
					return uploaderOptions;
				};

				uploaderService.runUploader = function runUploader(button) {
					uploaderOptions.browse_button = button || uploaderOptions.browse_button;
					uploader = Qiniu.uploader(uploaderOptions);
					_.forEach(eventHandlers, function (handlers, name) {
						_.forEach(handlers, function (handler) {
							if (handler) {
								uploader.bind(name, handler);
							}
						});
					});
					return uploader;
				};

				uploaderService.unbind = function unbind(event, handler) {
					if (uploader) {
						uploader.unbind(event, handler);
					} else {
						var eventHandler = eventHandlers[event];
						_.forEach(eventHandlers[event], function (_handler, index) {
							if (handler === _handler) {
								eventHandler[index] = null;
								return false;
							}
						})
					}
					return uploaderService;
				};

				uploaderService.bind = function bind(event, handler) {
					eventHandlers[event] = eventHandlers[event] || [];
					eventHandlers[event].push(handler);
					if (uploader) {
						uploader.bind(event, handler);
					}
					return uploaderService;
				};

				uploaderService.start = function start() {
					uploader.start();
				};

				uploaderService.removeItem = function removeItem(file) {
					uploader.removeFile(file);
				};

				uploaderService.remove = function remove() {
					uploader.unbindAll();
					eventHandlers = null;
					uploader.destroy();
				};
				return uploaderService;
			};

			service.getUploaderSvc = function getUploaderSvc(hash) {
				return _.find(registeredOptions, {nswHash: hash});
			};

			service.createUploader = function createUploader(options) {
				//return new Constructor(options);
			};

			service.resolveBase64 = function resolveBase64(file) {
				var defer = $q.defer();
				//这里我们判断下类型如果不是图片就返回 去掉就可以上传任意文件
				if (!/image\/\w+/.test(file.type)) {
					platformModalSvc.showWarmingTip("请确保文件为图像类型");
					return false;
				}
				var reader = new FileReader();
				reader.onload = function () {
					//get_data(this.result);
					defer.resolve(this.result);
				};
				reader.readAsDataURL(file.getSource().getSource());

				return defer.promise;

			};

			service.resolveBaseFile = function resolveBaseFile(file) {
				var defer = $q.defer();
				defer.resolve(file.getSource());
				return defer.promise;
			};

			//initUUID();
			return service;
		}]);
}(angular));