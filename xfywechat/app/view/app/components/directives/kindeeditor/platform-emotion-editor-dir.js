/*globals KindEditor, _, _toMap, _each, kindeditor_image*/
(function (angular) {
	"use strict";

	angular.module('platform').directive('platformEmotionEditor', ['$compile', 'platformKindEditorDataSvc', 'platformWechatEmotionSvc',
		function ($compile, editorService, platformWechatEmotionSvc) {
			return {
				restrict: 'A',
				scope: {
					turnDesign: '='
				},
				require: 'ngModel',
				templateUrl: globals.basAppRoute + 'components/directives/kindeeditor/templates/emotion-editor.html',
				link: function linker(scope, element, attr, ctrl) {
					var editor = {}, text = element.find('textarea'), currentVal;

					scope.options = scope.$parent.$eval(attr.options) || {};
					scope.options.maximumWords = scope.options.maximumWords || parseInt(attr.kMaximumWords);
					scope.name = 'keditor-' + editorService.getUUID();
					scope.emotions = platformWechatEmotionSvc.getEmotions();

					scope.resolveImage = function resolveImage(key) {
						return platformWechatEmotionSvc.getImagePath(key);
					};

					scope.addLink = function addLink() {
						editor.clickToolbar('link');
					};

					var selector = 'textarea[name="' + scope.name + '"]';
					text.attr('name', scope.name);
					var options = angular.copy(scope.options);

					options.items = ['wxemotions'];
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
						newlineTag: 'br',
						allowPreviewEmoticons: false,
						allowImageUpload: false,
						cssPath: globals.basAppRoute + 'components/content/css/kindeditor/kind-editor-emotion-reset.css',
						colorTable: editorService.colorTable,
						htmlTags: editorService.htmlTags,
						layout: editorService.layout,
						basePath: globals.basAppRoot + 'plugins/kindeditor/',
						emoticonsPath: globals.basAppRoot + 'plugins/kindeditor/plugins/emoticons/images/',
						isEmotion: true
					}, options);

					options.afterCreate = function afterCreate() {
						editor = this;
						editor.toolbar.div.css('display', 'none');
						editor.statusbar.css('display', 'none');
						updateDisplay();

						if (!$(editor.statusbar[0]).find('.emoticons').length) {
							editor.statusbar.append('<span class="ke-inline-block emoticons"></span>');
							editor.statusbar.append('<span class="ke-inline-block counter"></span>');

							$('.emoticons').on('click', function () {
								editor.clickToolbar('emoticons');
							});
						}
					};

					options.filterEmotionNodes = function filterEmotionNodes(html) {
						var blockElements = 'li|table|tr|blockquote|center|div|h1|h2|h3|h4|h5|h6|p';
						var blockElementsReg = new RegExp('<(' + blockElements + '){1}[\s+[^/]{0,}\/>|\/>]|<\/(' + blockElements + '){1}\s*>', 'ig');
						var excludedElementsReg = /<(?!a|\/a|img|\/img|br).*?>/ig;
						var excludedAttributesReg = /alt=\"[^\"]+\"|style=\"[^\"]+\"|target=\"[^\"]+\"|data-ke-src=\"[^\"]+\"|class=\"[^\"]+\"/ig;
						var excludedImagesReg = /<img[^>]*src="([^"]+)"[^>]*>/ig;
						return html.replace(blockElementsReg, '<br/>')
							.replace(excludedElementsReg, '')
							.replace(excludedAttributesReg, '')
							.replace(/\n/, '<br/>')
							.replace(excludedImagesReg, function (src, $1) {
								return /kindeditor\/plugins\/emoticons\/images\//i.test($1) ? src : ' <br/>---不支持图片发送--- <br/>';
							});
						;
					};

					options.afterChange = function () {
						if (scope.options.maximumWords && editor.count) {
							var html = editor.html();
							html = html.replace(/<img[^>]+[^>]*>/ig, '0');
							var totalCount = window.deletHtmlTag(html || '').replace(/\s{2}/g, '').replace(/&nbsp;/g, 'x').length;
							scope.maxLengthError = scope.options.maximumWords < totalCount;
							ctrl.$setValidity('nswmaxlength', !scope.maxLengthError);
							scope.wordCount = totalCount + '/' + scope.options.maximumWords;
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

					var appendEmotion = function appendEmotion() {
						var emotion = _.find(scope.emotions, {img: $(this).data('code')});
						editor.insertHtml('<img src="' + platformWechatEmotionSvc.getImagePath(emotion.img) + '" border="0" alt="' + emotion.desc + '" data-mo="' + emotion.code + '" />').focus();
					};

					var createEmotionPopup = function createEmotionPopup() {
						$('.icon-emotions', element).popover({
							html: true,
							placement: 'right',
							content: $('.emotions', element)
						}).on('shown.bs.popover', function () {
							/*$('.popover', element).css('left', 0);
							 $('.arrow', element).css('left', '19px');*/
						});

						$('.icon-emotions', element).on('click', function (e) {
							element.find(".popover").popover('show');
							$('.emotion-item').on('click', appendEmotion);
							e.stopPropagation();
						});

						$('body').on('click', function () {
							element.find(".popover").popover('hide');
							$('.emotion-item').off('click', appendEmotion);
						});
					};

					scope.$evalAsync(function () {
						KindEditor.create(selector, options);
						element.find('.word-count').width(options.width);
						element.find('.ke-container').width(options.width);
						updateDisplay();
						$('.ke-edit-textarea', element).on('keyup', function () {
							updateData();
						});
						createEmotionPopup();
					});

					var updateDisplay = function updateDisplay() {
						if (!editor || !editor.isCreated) {
							return;
						}
						editor.container.css('width', '100%');
						currentVal = ctrl.$viewValue;
						editor.html(platformWechatEmotionSvc.codeToImg(ctrl.$viewValue || ''));
					};

					var updateData = function updateData() {
						if (!editor || !editor.html) {
							return;
						}

						var html = editor.html() || '';
						var viewValue = platformWechatEmotionSvc.imgToCode(html || '');
						if (viewValue !== (ctrl.$viewValue || '')) {
							ctrl.$setViewValue(viewValue);
						}
					};


					ctrl.$render = function $render() {
						updateDisplay();
					};
				}
			};
		}]);
}(angular));