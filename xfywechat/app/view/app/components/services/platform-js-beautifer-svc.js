(function (angular) {
	"use strict";

	angular.module('platform').factory('platformJsBeautiferSvc', [function () {
		var service = {};
		var _options = {};
		service.setOptions = function setOptions(options) {
			angular.extend(_options, options);
		};


		var the = {
			use_codemirror: (!window.location.href.match(/without-codemirror/)),
			beautify_in_progress: false,
			editor: null // codemirror editor
		};

		function unpacker_filter(source) {
			var trailing_comments = '',
				comment = '',
				unpacked = '',
				found = false;

			// cut trailing comments
			do {
				found = false;
				if (/^\s*\/\*/.test(source)) {
					found = true;
					comment = source.substr(0, source.indexOf('*/') + 2);
					source = source.substr(comment.length).replace(/^\s+/, '');
					trailing_comments += comment + "\n";
				} else if (/^\s*\/\//.test(source)) {
					found = true;
					comment = source.match(/^\s*\/\/.*/)[0];
					source = source.substr(comment.length).replace(/^\s+/, '');
					trailing_comments += comment + "\n";
				}
			} while (found);

			var unpackers = [P_A_C_K_E_R, Urlencoded, /*JavascriptObfuscator,*/ MyObfuscate];
			for (var i = 0; i < unpackers.length; i++) {
				if (unpackers[i].detect(source)) {
					unpacked = unpackers[i].unpack(source);
					if (unpacked !== source) {
						source = unpacker_filter(unpacked);
					}
				}
			}

			return trailing_comments + source;
		}


		var beautify = function beautify(source) {
			if (the.beautify_in_progress) {
				return;
			}

			the.beautify_in_progress = true;

			var output,
				opts = {};

			if (looks_like_html(source)) {
				output = html_beautify(source, opts);
			} else {
				if ($('#detect-packers').prop('checked')) {
					source = unpacker_filter(source);
				}
				output = js_beautify(source, opts);
			}
			output = output.replace(/\s*\}\s*\]\s*\]/g,'}]]').replace(/\[\s*\[\s*\$\s*\{\s*/g,'[[${');
			the.beautify_in_progress = false;
			return output;
		};

		function looks_like_html(source) {
			// <foo> - looks like html
			// <!--\nalert('foo!');\n--> - doesn't look like html

			var trimmed = source.replace(/^[ \t\n\r]+/, '');
			var comment_mark = '<' + '!-' + '-';
			return (trimmed && (trimmed.substring(0, 1) === '<' && trimmed.substring(0, 4) !== comment_mark));
		}

		service.beautify = function (content, options) {
			angular.extend(_options, options);
			return beautify(content);
		};

		return service;
	}]);

}(angular));