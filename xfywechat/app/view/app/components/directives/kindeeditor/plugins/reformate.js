/*globals KindEditor*/
(function (angular) {
	"use strict";

	angular.module('platform').factory('reformatPluginSvc', [function () {
		var service = {};
		service.init = function init() {
			//格式划
			KindEditor.plugin('reformat', function (K) {
				var self = this, name = 'reformat',
					blockMap = K.toMap('blockquote,center,div,h1,h2,h3,h4,h5,h6,p');

				self.lang({
					'reformat': '自动排版'
				});

				function getFirstChild(knode) {
					var child = knode.first();
					while (child && child.first()) {
						child = child.first();
					}
					return child;
				}

				self.clickToolbar(name, function () {
					var dialog = K.dialog({
						width: 240,
						title: '温馨提示',
						body: '<div style="margin:10px;"><strong>对齐文本功能将取消之前你设置好的所有文本样式</strong></div>',
						closeBtn: {
							name: '关闭',
							click: function () {
								dialog.remove();
							}
						},
						yesBtn: {
							name: '确定',
							click: function () {
								self.focus();
								var doc = self.edit.doc,
									child = K(doc.body).first(), next,
									nodeList = [], subList = [];

								function RBR(child) {
									if ((child.name === "div" && child.hasAttr("style") && child.hasAttr("class")) || child.name === "#text" || child.name === "body") {
										var html = child.html();
										if (html === "") {
											if (child.name === "body") {
												return false;
											}
											return RBR(K(doc.body));
										}
										html = "<p style='text-indent:2em;'>" + html.replace(/(<br[^>]*\/>)/ig, "</p><p style='text-indent:2em;'>") + "</p>";
										html = html.replace(/<p style='text-indent:2em;'><\/p>/g,'');
										child.html(html);
										return true;
									}
								}

								if (child && RBR(child) !== true) {
									while (child) {
										next = child.next();
										var firstChild = getFirstChild(child);
										if (child.html() === "<br />") {
											next = child.next();
											child.remove();
										} else {
											if (!firstChild || firstChild.name !== 'img') {
												if (blockMap[child.name]) {
													child.html(child.html().replace(/^(\s|&nbsp;|　)+/ig, ''));
													//alert(child.html());
													child.css('text-indent', '2em');
												} else if(subList) {
													subList.push(child);
												}
												if (!next || (blockMap[next.name] || blockMap[child.name] && !blockMap[next.name])) {
													if (subList.length > 0) {
														nodeList.push(subList);
													}
													subList = [];
												}
											} else if (firstChild) {
												if (firstChild.name === "img") {
													var istrue = true;
													K(child).scan(function (node) {
														if (node.nodeName !== "IMG" && node.nodeName !== "#text") {
															istrue = false;
															return false;
														}
													});
													if (istrue) {
														child.css("text-indent", 0);
														/*child.css("text-align", "center");*/
													}
												}
											}
											child = next;
										}
									}
									K.each(nodeList, function (i, subList) {
										var wrapper = null;
										wrapper = K('<p style="' + (subList[0].name === 'img' ? 'text-align:center' : 'text-indent:2em') + ';"></p>', doc);
										subList[0].before(wrapper);
										K.each(subList, function (i, knode) {
											wrapper.append(knode);
										});
									});
								}
								self.addBookmark();
								dialog.remove();
							}
						},
						noBtn: {
							name: '取消',
							click: function () {
								dialog.remove();
							}
						}
					});
				});
			});
		};

		return service;
	}]);
}(angular));
