(function (angular) {
	"use strict";
	angular.module('platform').factory('basDataValidationSvc', [/*'platformMessenger',*/
		function (/*PlatformMessenger*/) {
			return function (service, local) {
				local.validators = [];

				/**
				 * 执行验证处理
				 * @param item 验证目标，为空时验证当前的选中数据
				 * @returns {验证结果，因为存在异步验证，所以这里是一个异步的结果}
				 */
				service.checkValidations = function checkValidations(item) {
					var validations = {}, defers = [], validateDefer;
					local.validating = true;

					item = item || local.currentItem;
					_.forEach(item, function (val, prop) {
						_.forEach(local.validators, function (validator) {
							var result = validator.validate.call(service, item, prop, val);
							if (validator.isAsync) {
								defers.push(result.then(function (res) {
									validations[prop].result = res;
									return res;
								}));
							} else {
								validations[prop].result = result;
							}
						});
					});

					if (defers && defers.length) {
						defers.all(function () {
							validateDefer.resolve(validations);
							local.validating = false;
						});
					} else {
						validateDefer.resolve(validations);
						local.validating = false;
					}
					return validateDefer;
				};
			};
		}]);

}(angular));