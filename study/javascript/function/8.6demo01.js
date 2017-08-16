/**
 * Created by yaoyc on 2017/2/10.
 */
(function(){
	"use strict";
	var scope = 'globals scope';
	function checkScope(){
		var scope = 'local scope';
		function f(){console.log(scope);};
		return f;
	}
	checkScope()();
})();