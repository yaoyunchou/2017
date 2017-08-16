"use strict";

/**
 * Created by yaoyc on 2017/2/17.
 */
(function () {
	"use strict";

	var $q = {
		defer: function defer() {
			var deferred,
			    pending = [];

			deferred = {
				resolve: function resolve(obj) {},
				promise: {
					then: function then(callback) {
						pending.push(callback);
					}
				}
			};
			return deferred;
		}
	};
	function getDataFromServer() {
		var data = [];
		var d = $q.defer();
		setTimeout(function () {
			data = [1, 2, 3, 4];
			d.resolve(data);
		}, 3000);
		return d.promise;
	}

	getDataFromServer().then(function (data) {
		console.log(data);
	});
})();