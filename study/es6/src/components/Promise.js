/**
 * Created by yaoyc on 2017/2/17.
 */
(function () {
	"use strict";
	
	var $q = {
		defer: function () {
			var deferred,
				pending = [];
			
			deferred = {
				resolve: function (obj) {
				},
				promise: {
					then: function (callback) {
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