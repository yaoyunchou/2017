/*globals WebUploader*/
(function (angular) {
	"use strict";
	angular.module('platform').directive('nswFileuploader', ['$http', 'platformModalSvc', 'platformMessenger', function ($http, platformModalSvc, platformMessenger) {
		return {
			restrict: 'A',
			transclude:true,
			scope: {
				config: "=",
				uploader: "="
			},
			template:'<div>' +
			'             <div id="uploader" style="position: relative;left: 44%" ng-hide="uploading" data-ng-transclude/>' +
			'             <div style="position:relative;z-index:12;pointer:cursor;" ng-show="uploading" nsw-progress-bar data-cancel="cancel" data-ng-model="status" data-hint="hint" data-show-hint-in="6" data-show-percentage-in="6">' +
			'               <button class="btn btn-default btn-color btn-cancel progress-publish-btn" type="button" ng-click="cancel()">' +
			'                   <label class="checkcancel"></label>' +
			'                   <span class="btntext black">取&nbsp;消</span>' +
			'               </button>' +
			'             </div>' +
			'              <div ng-if="uploading" class="progress-mask" style="background:#000 filter:alpha(opacity = 0.01) opacity:1;position:fixed;left:0;top:0;width:100%;height:100%;z-index:2;"></div>' +
			'          </div>',
			link: function ($scope, element) {
				//复制扩展属性
				var taskId = new Date().getTime();
				var trancluded = $('#uploader').html();
				var interval ;
				var opts = $scope.config ? $scope.config : {};
				var option = {
					auto: true,//是否自动上传
					server: "/pccms/file/upload?taskId=" + taskId,//文件上传接口
					swf: "/pccms/plugin/ueditor/third-party/webuploader/Uploader.swf",
					//label: $scope.label /*"<span style='padding:6px 18px;position:relative;top:-6px;font-weight:normal;'>首页入驻</span>"*/,//文字标签
					formData: {},
					fileVal: "file",//上传文件域
					extensions: "zip",//文件类型
					mimeTypes: "application/x-zip-compressed",
					multiple: false,//是否多文件上传
					duplicate: true,//是否充许重复文件上传
					beforeFileQueued: null,//当文件添加前回调
					fileQueued: null,//当文件添加到队列时回调
					uploadStart: null,//当文件开始上传时
					uploadProgress: null,//文件上传进度回调
					uploadSuccess: null,//文件上传成功回调
					uploadError: null,//文件上传失败回调
					uploadComplete: null,//当上传完成时回调
					uploadFinished: null,//当所有文件上传结束时触发
					error: null//验证失败时回调
				};



				angular.extend(option, opts);

				var syncUploadStatus = function syncUploadStatus(timer) {
					$http({
						method: 'POST',
						url: '/pccms/progress/file?taskId=' + taskId,
						data: {"taskId": taskId}
					}).success(function (data) {
						if (!data.isSuccess) {
							platformModalSvc.showWarmingMessage("上传并解压监控失败：" + data.message, '温馨提示');
						} else {
							data = JSON.parse(data.message);
							//上传的状态 0:进行中(process) 1:取消(cancel) 2:结束(closed) 3.压缩包上传中（zip） 4.解压压缩包 5.文件入库(上传GridFS) -1:发布异常
							//进度百分比
							var status = (undefined === data.percent) ? 0 : data.percent;
							$scope.hint = (undefined === data.hint) ? "上传并解压中..." : data.hint;
							$scope.status = status;
							switch ( parseInt(data.index)){
								case 0:
								case 3:
									$scope.status = status;
									$scope.uploading = true;
									break;
								case 1:
								case 2:
									$scope.status = '100';
									$scope.unziping = false;
									$scope.uploading = false;
									platformModalSvc.showWarmingMessage($scope.hint, '温馨提示').then(function(){
										$scope.status = '0';
									});
									resetUploader();
									clearInterval(timer);
									break;
								case 4:
								case 5:
									$scope.hint = '上传并解压中...';
									$scope.unziping = true;
									break;
								default :
									$scope.status = '100';
									$scope.uploading = false;
									$scope.hint = '上传并解压监控失败:'+$scope.hint;
									platformModalSvc.showWarmingMessage($scope.hint, '温馨提示').then(function(){
										$scope.status = '0';
									});
									resetUploader();
									clearInterval(timer);
									console.error(data);
							}

							$scope.status = parseInt($scope.status);
							if($scope.status===100){
								$scope.hint = '上传并解压中...';
								$scope.unziping = true;
							}
						}
					}).error(function (error) {
						//延时3m,以区别主动取消（使得这个操作不提示此错误）
						console.error(error);
						setTimeout(function () {
							platformModalSvc.showWarmingMessage('网络故障请重新上传！','温馨提示').then(function(){
								$scope.status = '0';
							});
							$scope.uploading = false;
							resetUploader();
						}, 3000);
					});
				};

				$scope.cancel = function cancel(){
					platformModalSvc.showConfirmMessage('确认取消上传？','温馨提示').then(function(){
						$scope.status = '0';
						clearInterval(interval);
						$scope.unziping = false;
						$scope.uploading = false;
						resetUploader();
					});
				};


				var _uploader;

				var beforeFileQueued = function beforeFileQueued(file) {
					if (file.ext.toLowerCase() === "zip") {
						if (typeof(option.beforeFileQueued) === "function") {
							return option.beforeFileQueued.apply(this, [_uploader, file]);
						}
					} else {
						platformModalSvc.showWarmingMessage('文件的类型不正确，请选择zip格式文件！', '温馨提示');
						return false;
					}
				};
				var fileQueued = function fileQueued(file) {
					if (typeof(option.fileQueued) === "function") {
						option.fileQueued.apply(this, [_uploader, file]);
					}
				};

				var uploadStart = function uploadStart(file) {
					if (typeof(option.uploadStart) === "function") {
						option.uploadStart.apply(this, [_uploader, file]);
					}
					$scope.uploading = true;
					interval = setInterval(function () {
						syncUploadStatus(interval);
					}, 1000);
				};

				var uploadSuccess = function uploadSuccess(file, res) {
					if (typeof(option.uploadSuccess) === "function") {
						option.uploadSuccess.apply(this, [_uploader, file, res]);
					}
				};

				var uploadError = function uploadError(file) {
					if (typeof(option.uploadError) === "function") {
						option.uploadError.apply(this, [_uploader, file]);
					}
				};

				var uploadComplete = function uploadComplete(file) {
					if (typeof(option.uploadComplete) === "function") {
						option.uploadComplete.apply(this, [_uploader, file]);
					}
				};

				var uploadFinished = function uploadFinished(file) {
					if (typeof(option.uploadFinished) === "function") {
						option.uploadFinished.apply(this, [_uploader, file]);
					}
				};

				var uploaderError = function uploaderError(res) {
					if (typeof(option.error) === "function") {
						option.error.apply(this, [_uploader, res]);
					}
				};

				var resetUploader = function resetUploader() {
					if(_uploader) {
						_uploader.stop();
						_uploader.reset();
						$('#uploader', element).children().remove();
						$('#uploader').html(trancluded);
					}
					taskId = new Date().getTime();
					option.server = '/pccms/file/upload?taskId=' + taskId;
					$scope.hint = '';

					_uploader = WebUploader.create({

						// 选完文件后，是否自动上传。
						auto: option.auto,
						// swf文件路径
						swf: option.swf,
						// 文件接收服务端。
						server: option.server,
						// 内部根据当前运行是创建，可能是input元素，也可能是flash.
						pick: {
							id: '#uploader',
							label: option.label,
							multiple: option.multiple
						},
						fileVal: option.fileVal,
						//只允许选择文件类型
						accept: {
							title: "zip",
							extensions: option.extensions,
							mimeTypes: option.mimeTypes
						},
						duplicate: option.duplicate,
						button: element,
						formData: option.formData
					});

					_uploader.on("beforeFileQueued", beforeFileQueued);
					_uploader.on("fileQueued", fileQueued);
					_uploader.on("uploadStart", uploadStart);
					_uploader.on("uploadSuccess", uploadSuccess);
					_uploader.on("uploadError", uploadError);
					_uploader.on("uploadComplete", uploadComplete);
					_uploader.on("uploadFinished", uploadFinished);
					_uploader.on("error", uploaderError);
				};

				resetUploader();

				//返回图片上传实例
				if (typeof $scope.uploader === "function") {
					$scope.uploader(_uploader);
				}

				opts.stopUploader = function stopUploader(){
					if(interval) {
						clearInterval(interval);
					}
					resetUploader();
				};
			}
		};
	}]);

}(angular));