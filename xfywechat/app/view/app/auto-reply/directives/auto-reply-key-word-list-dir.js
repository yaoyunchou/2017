/*globals UE*/
(function (angular) {
	"use strict";

	angular.module('platform').directive('autoReplyKeyWordList', ['platformModalSvc', function (platformModalSvc) {
		return {
			restrict: 'A',
			require: 'ngModel',
			templateUrl: globals.basAppRoute + 'auto-reply/templates/auto-reply-key-word-list.html',
			link: function (scope, element, attr, ctrl) {

				scope.deleteKeyWord = function deleteKeyWord(index) {
					scope.keyWordList.splice(index, 1);
					scope.setValue();
				};
				scope.addKeyWord = function addKeyWord() {
					scope.keyWordList = scope.keyWordList || [];

					if (scope.keyWordList.length < 10) {
						scope.keyWordList.push({name: ''});
					} else {
						platformModalSvc.showWarmingTip("关键词不能超过10个!");
					}
				};
				scope.setValue = function setValue() {
					var keyWord = _.map(_.filter(scope.keyWordList, function (o) {
						return !!o.name;
					}), 'name');
					if (keyWord.length > 0) {
						ctrl.$setViewValue(keyWord);
					}
					scope.updateRequiredValidator();
				};

				ctrl.$render = function $render() {
					scope.keyWordList = ctrl.$viewValue;
					scope.keyWordList = _.map(scope.keyWordList, function (keyword) {
						return {'name': keyword};
					});
					var checkLength = _.map(_.filter(scope.keyWordList, function (o) {
						return !!o.name;
					}), 'name');
				};

				scope.updateRequiredValidator = function updateRequiredValidator() {
					var words = _.filter((scope.keyWordList || []), function (word) {
						return word && word.name && word.name.replace(/\s*/g, '').length;
					});
					ctrl.$setValidity('required', words.length);
				};
				var requiredWatcher = scope.$watchCollection('keyWordList', scope.updateRequiredValidator);
				scope.$on('$destroy', function () {
					requiredWatcher();
				});
			}
		};
	}]);
}(angular));