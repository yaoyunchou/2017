/*
 * auther:yaoyc
 * */

/*global angular*/
(function (angular) {
	"use strict";
	var platform = angular.module('platform');
	platform
		.factory('utils', ['$rootScope', '$location', '$http', '$modal', function ($rootScope, $location, $http, $modal) {
			function alertBox(title, msg, ok, size, btnLbl) {
				$modal.open({
					template: '<div class="defa-font"><div class="modal-header"><h3 class="modal-title">{{title}}</h3></div><div class="modal-body"><p ng-bind-html="msg"></p></div><div class="modal-footer"><button class="btn btn-primary" ng-click="ok()"><span class="glyphicon glyphicon-ok"></span> ' + (btnLbl ? btnLbl : '确定') + '</button></div></div>',
					controller: ['$scope', '$modalInstance', function ($scope, $modalInstance) {
						$scope.title = title;
						$scope.msg = msg;
						$scope.ok = function () {
							$modalInstance.close();
						};
					}],
					backdrop: 'static',
					size: size ? size : 'sm'
				})
					.result.then(
					function () {
						if (ok !== undefined) {
							ok();
						}
					}
				);
			}

			function confirmBox(title, msg, ok, cancel, size) {
				$modal.open({
					template: '<div class="defa-font"><div class="modal-header"><h3 class="modal-title">{{title}}</h3></div><div class="modal-body"><p>{{msg}}</p></div><div class="modal-footer"><button class="btn btn-primary" ng-click="ok()"><span class="glyphicon glyphicon-ok"></span> 确定</button><button class="btn btn-default" ng-click="cancel()"><span class="glyphicon glyphicon-remove"></span> 取消</button></div></div>',
					controller: ['$scope', '$modalInstance', function ($scope, $modalInstance) {
						$scope.title = title;
						$scope.msg = msg;
						$scope.ok = function () {
							$modalInstance.close();
						};
						$scope.cancel = function () {
							$modalInstance.dismiss();
						};
					}],
					backdrop: 'static',
					size: size ? size : 'sm'
				})
					.result.then(
					function () {
						ok();
					},
					function () {
						if (cancel !== undefined) {
							cancel();
						}
					}
				);
			}

			function openWin(title, msg, ok, cancel, size, btnLbl) {
				var html = [];
				html[html.length] = '<div class="modal-header">';
				html[html.length] = '    <h3 class="modal-title">' + title + '</h3>';
				html[html.length] = '</div>';
				html[html.length] = '<div class="modal-body">' + msg + '</div>';
				html[html.length] = '<div class="modal-footer">';
				html[html.length] = '    <button class="btn btn-primary" type="button" ng-click="ok()">' + (btnLbl ? btnLbl : '确定') + '</button>';
				html[html.length] = '    <button class="btn btn-default" type="button" ng-click="cancel()">取消</button>';
				html[html.length] = '</div>';
				$modal.open({
					template: html.join(''),
					controller: ['$scope', '$modalInstance', function ($scope, $modalInstance) {
						$scope.title = title;
						$scope.msg = msg;
						$scope.ok = function () {
							var flag = false;
							if (ok === undefined) {
								flag = true;
							} else if (typeof ok === 'function') {
								var state = ok();
								if (state || state === undefined) {
									flag = true;
								}
							}
							if (flag) {
								$modalInstance.close();
							}
						};
						$scope.cancel = function () {
							var flag = false;
							if (cancel === undefined) {
								flag = true;
							} else if (typeof cancel === 'function') {
								var state = cancel();
								if (state || state === undefined) {
									flag = true;
								}
							}
							if (flag) {
								$modalInstance.dismiss();
							}
						};
					}],
					backdrop: 'static',
					size: size ? size : ''
				});
			}

			//图片预览弹窗
			function imgPreview(image) {
				$modal.open({
					template: '<div class="c-dialog-img-preview"><i class="fa fa-times" ng-click="close();"></i><img src="' + image + '"/></div>',
					controller: ['$scope', '$modalInstance', function ($scope, $modalInstance) {
						$scope.close = function () {
							$modalInstance.close();
						};
					}],
					backdrop: 'static',
					size: ''
				});
			}

			return {
				alertBox: alertBox,
				confirmBox: confirmBox,
				openWin: openWin,
				imgPreview: imgPreview,

				helpBox: function (image, size) {
					$modal.open({
						template: '<div class="defa-font"><div class="modal-body help"><img class="w-100" nsw-src="{{asset(image)}}" /></div><div class="modal-footer"><button class="btn btn-default" ng-click="close()"><span class="glyphicon glyphicon-remove"></span> 关闭</button></div></div>',
						controller: ['$scope', '$modalInstance', function ($scope, $modalInstance) {
							$scope.image = image;
							$scope.close = function () {
								$modalInstance.close();
							};
						}],
						backdrop: 'static',
						size: size ? size : 'md'
					});
				}
			};
		}])
		.directive('templateLib', ['$modal', '$parse', 'platformModalSvc', function ($modal, $parse, platformModalSvc) {
			return {
				restrict: 'A',
				link: function (scope, element, attr) {
					element.click(function () {
						platformModalSvc.showModal({
							backdrop: 'static',
							templateUrl: globals.basAppRoute + '/components/templates/platform-template-view.html',
							controller: 'templateLib',
							size: 'lg'
						});
					});
				}
			};
		}])

		.controller('templateLib', ['$scope', '$http', 'utils', function ($scope, $http, utils) {
			$http({
				method: "GET",
				url: '/pccms/editorTpl/editorTplList?pageNum=1&pageSize=1000'
			}).success(function (requset) {
				$scope.templateLib = requset.data.list;
			});
			$scope.imgPreview = function imgPreview(image, event) {
				utils.imgPreview(image);
				event.stopPropagation();
			};
			//选择图片
			$scope.selectImg = function (item) {
				$scope.selected = item;
			};

			$scope.commit = function commit() {
				$scope.closeModal(true, {template: $scope.selected, replace: $scope.checked});

			};

			$scope.checked = true;
		}]);
}(angular));