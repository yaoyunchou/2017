/*globals KindEditor, _, _toMap, _each, kindeditor_image*/
(function (angular) {
	"use strict";

	angular.module('platform').directive('platformKindeditor', ['platformKindEditorDataSvc', function (editorService) {
		return {
			restrict: 'A',
			scope: {
				turnDesign: '='
			},
			require: 'ngModel',
			template: '<div class="kind-editor"> ' +
			'               <textarea style="visibility:hidden;"></textarea>' +
			'               <div class="word-count" >' +
			'                   <span class="err" data-ng-show="maxLengthError" style="text-align: left">录入字数不能超过<span data-ng-bind="options.maximumWords"></span>个字符</span> ' +
			'                   <span data-ng-bind="wordCount" style="min-width: 200px;float: right; text-align: right"></span>' +
			'               </div>' +
			'           </div>',
			link: function linker(scope, element, attr, ctrl) {
				var editor = {}, text = element.find('textarea'), currentVal;
				var _INPUT_KEY_MAP = KindEditor.toMap('8,9,13,32,46,48..57,59,61,65..90,106,109..111,188,190..192,219..222');
				var _CURSORMOVE_KEY_MAP = KindEditor.toMap('33..40');
				var _CHANGE_KEY_MAP = {};
				var _ua = navigator.userAgent.toLowerCase(),
					_GECKO = _ua.indexOf('gecko') > -1 && _ua.indexOf('khtml') === -1;

				KindEditor.each(_INPUT_KEY_MAP, function (key, val) {
					_CHANGE_KEY_MAP[key] = val;
				});
				KindEditor.each(_CURSORMOVE_KEY_MAP, function (key, val) {
					_CHANGE_KEY_MAP[key] = val;
				});

				scope.options = scope.$parent.$eval(attr.options) || {simpleMode: attr.isSimple !== 'false'};
				scope.options.maximumWords = scope.options.maximumWords || parseInt(attr.kMaximumWords);
				scope.name = 'keditor-' + editorService.getUUID();
				var selector = 'textarea[name="' + scope.name + '"]';
				text.attr('name', scope.name);
				var options = angular.copy(scope.options);

				options.items = editorService.wcItems;
				options.width = attr.width || '100%';
				options.height = attr.height || '100%';

				if (attr.width) {
					element.width(attr.width);
					options.width = attr.width;
				}
				if (attr.height) {
					element.height(attr.height);
					options.height = attr.height;
				}

				options = _.extend({}, {
					resizeType: 1,
					allowPreviewEmoticons: false,
					allowImageUpload: false,
					cssPath: globals.basAppRoute + 'components/content/css/kindeditor/kind-editor-reset.css',
					colorTable: editorService.colorTable,
					htmlTags: editorService.htmlTags,
					layout: editorService.layout,
					basePath: globals.basAppRoot + 'plugins/kindeditor/',
					emoticonsPath:globals.basAppRoot + 'plugins/kindeditor/plugins/emoticons/images/',
					SimpleMode: false
				}, options);

				options.afterCreate = function afterCreate() {
					editor = this;
					updateDisplay();

					if (!$(editor.statusbar[0]).find('.emoticons').length) {
						editor.statusbar.append('<span class="ke-inline-block emoticons"></span>');
						editor.statusbar.append('<span class="ke-inline-block counter"></span>');

						$('.emoticons').on('click', function () {
							editor.clickToolbar('emoticons');
						});
					}
				};


				options.afterChange = function () {
					if (scope.options.maximumWords && editor.count) {
						var totalCount = window.deletHtmlTag(editor.html() || '').replace(/\s{2}/g, '').replace(/&nbsp;/g, 'x').length;
						scope.maxLengthError = scope.options.maximumWords < totalCount;
						ctrl.$setValidity('nswmaxlength', !scope.maxLengthError);
						scope.wordCount = '(' + totalCount + '/' + scope.options.maximumWords + ')';
						if (editor.statusbar && editor.statusbar[0]) {
							$(editor.statusbar[0]).find('.counter').html(scope.wordCount);
						}
					} else {
						scope.wordCount = '';
					}

					updateData();

					if (!scope.$root.$$phase) {
						scope.$apply();
					}
					return this;
				};

				scope.$evalAsync(function () {
					KindEditor.create(selector, options);
					element.find('.word-count').width(options.width);
					element.find('.ke-container').width(options.width);
					updateDisplay();
					$('.ke-edit-textarea', element).on('keyup', function () {
						updateData();
					});
				});

				var updateDisplay = function updateDisplay() {
					if (!editor || !editor.isCreated) {
						return;
					}
					editor.container.css('width', '100%');
					currentVal = ctrl.$viewValue;
					editor.html(ctrl.$viewValue || '');


				};

				var updateData = function updateData() {
					if (!editor || !editor.html) {
						return;
					}

					var html = editor.html() || '';
					var viewValue = ctrl.$viewValue || '';
					if (html !== viewValue) {
						ctrl.$setViewValue(html);
					}
				};


				ctrl.$render = function $render() {
					updateDisplay();
				};
			}
		};
	}]);
}(angular));