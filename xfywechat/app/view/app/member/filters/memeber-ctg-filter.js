(function (angular) {
	"use strict";

	angular.module('member').filter('memberCtg', ['memberCtgDataSvc', function (memberCtgDataSvc) {

		var memeberCtgList = [];
		var listLoaded = function listLoaded(list) {
			memeberCtgList = list;
		};

		memberCtgDataSvc.registerListLoaded(listLoaded);

		if (!memeberCtgList || !memeberCtgList.length) {
			memberCtgDataSvc.loadData();
		}

		return function (input) {
			var _input = _.parseInt(input);
			if (-100 === _input) {
				return '全部用户';
			}
			var ctg = _.find(memeberCtgList || [], {tagId: _input});
			if (ctg && ctg.name) {
				return ctg.name;
			}

			return '';
		};

	}]);

}(angular));