/*globals _*/
(function (angular) {
	"use strict";
	angular.module('platform').directive('nswImg', ['platformImgLibSvc', function (platformImgLibSvc) {
		return {
			restrict: 'A',
			scope: true,
			transclude:true,
			template: '<div class="nsw-img-dir">' +
			'           <i class="fa fa-times nsw-img-icon remove" ng-show="enableRemove" ng-click="_removeImg();"></i>' +
			'           <i class="fa fa-eye nsw-img-icon preview" ng-show="enablePreview" ng-click="_imgPreview(url,$event)"></i>	' +
			'           <i class="edit-icon nsw-img-icon" ng-show="nswImgEnableEdit" ng-click="_editImage()"></i>	' +
			'           <a href="javascript:void(0);">' +
			'                   <img nsw-src="{{_src}}" data-ng-click="_selectImage()" class="img"></a>' +
			'           <input type="text" placeholder="请写图片描述" ng-disabled="hasProgress" class="form-control alt" autocomplete="off" ng-change="_altChanged(_alt)"  ng-model="_alt" ng-show="!altReadonly"  /></li>' +
			'           <span class="form-control alt" ng-show="altReadonly"  ng-bind="_alt" /></li>' +
			'           <span class="c-ready-up" ng-hide="!isUpload||hasProgress">{{img.state}}</span>' +
			'           <div class="progress progress-mini" ng-show="isUpload && hasProgress">' +
			'               <div style="width:{{img.progress}}%;" class="progress-bar progress-bar-success"></div>' +
			'           </div>' +
			'</div>',
			link: function (scope, element, attrs) {
				scope.enableRemove = !!attrs.nswImgRemove;
				scope.enablePreview = attrs.enablePreview === 'true';
				scope.enableAlt = !!attrs.nswImgAlt;
				scope.altReadonly = attrs.altReadonly === 'true';
				scope.nswImgEnableEdit = attrs.nswImgEnableEdit === 'true';
				scope.isUpload = attrs.isUpload === 'true';
				scope.hasProgress = attrs.hasProgress === 'true';
				scope.process = parseInt(attrs.progress);

				scope._alt = scope.$eval(attrs.nswImgAlt);
				scope._src = scope.$eval(attrs.nswImgSrc);

				attrs.$observe('nswImgAlt', function () {
					if(!scope.lockAlt) {
						scope._alt = scope.$eval(attrs.nswImgAlt);
					}
				});

				attrs.$observe('isUpload', function () {
					scope.isUpload = attrs.isUpload === 'true';
				});
				attrs.$observe('hasProgress', function () {
					scope.hasProgress = attrs.hasProgress === 'true';
				});
				attrs.$observe('process', function () {
					scope.process = parseInt(attrs.progress);
				});
				attrs.$observe('nswImgAlt', function () {
					if(!scope.lockAlt) {
						scope._alt = scope.$eval(attrs.nswImgAlt);
					}
				});

				scope._altChanged = function altChanged(alt) {
					scope.lockAlt = true;
					_.set(scope, attrs.nswImgAlt, alt);
					scope._alt = alt;
					if(scope.setModelDirty) {
						scope.setModelDirty();
					}
					scope.lockAlt = false;
				};

				attrs.$observe('nswImgSrc', function () {
					scope._src = scope.$eval(attrs.nswImgSrc);
				});

				scope._srcChanged = function srcChanged(val) {
					_.set(scope, attrs.nswImgSrc, val);
					if(scope.setModelDirty) {
						scope.setModelDirty();
					}
				};

				scope._editImage = function _editImage(){
					var imgConfig = {
						'count': 1,//2 限制图片张数
						'size':300,// 300,//图片大小,单位为k
						'width':800, // 800,//图片宽度
						'height':800, // 600,//图片高度
						'ext': 'gif,jpg,jpeg,bmp,png'//图片扩展名
					};
					platformImgLibSvc.showImgLibModal(imgConfig, {url: scope._src}).then(function(selectedItem){
						scope._src = selectedItem.url;
						if (!_.get(scope, attrs.nswImgAlt) && selectedItem.fileName) {
							scope._alt = selectedItem.fileName;
							scope._altChanged(selectedItem.fileName.split('.')[0]);
						}
						scope._srcChanged(selectedItem.url);
					});
				};

				scope._removeImg = function removeImg() {
					_.set(scope, attrs.nswImgSrc, null);
					if (attrs.nswImgRemove) {
						scope.$eval(attrs.nswImgRemove);
					}
					scope.$emit('itemremove', scope._src);
				};
			}
		};
	}]);

}(angular));