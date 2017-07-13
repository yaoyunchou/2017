(function (angular) {
	"use strict";
	angular.module('platform').factory('platformWordCountSvc', [function () {
		var service = {};
		service.count = function count(value) {
			var totalCount = 0;
			value = value || '';
			for (var i = 0; i < value.length; i++) {
				var c = value.charCodeAt(i);
				if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
					totalCount++;
				}
				else {
					totalCount += 2;
				}
			}
			return totalCount;
		};

		service.slice = function slice(value, start, count) {
			var newValue = '', totalCount = 0;
			value = value || '';
			for (var i = 0; i < value.length; i++) {
				var c = value.charCodeAt(i);
				if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
					totalCount++;
				}
				else {
					totalCount += 2;
				}
				if (totalCount >= start && totalCount <= start + count) {
					newValue += value[i];
				}

			}

			return newValue;
		};
        service.getSize = function getSize(str){
			/*var size ;
			size = str.match(/<a[^>]+?href=["']?([^"']+)["']?[^>]*>|<\/a>/g).join('').length;*/
			return str.replace(/<\/?a[^>]*>/ig,'').length;
			/*return size;*/
		};

		return service;
	}]);

}(angular));