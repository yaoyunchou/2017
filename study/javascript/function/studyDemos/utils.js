/**
 * Created by yaoyc on 2017/2/14.
 */
(function(){
	"use strict";
	function extend(o,p){
		var prop;
		for(prop in p){//jshint ignore: line
				o[prop] = p[prop];
		}
		return o;
	}
	module.exports = [extend];
})();