/**
 * Created by yaoyc on 2017/2/9.
 */
(function(){
	"use strict";
	var o= {
		m:function(){
			var self = this;
			console.log(this ===o);
			console.log(this);
			function f(){
				console.log(self === o);
			}
			f();
		}
	};
	
	var b = new Object({name:'yaoyunchou'});
	b.m =o.m;
	b.age = 26;
	o.m();
	b.m();
})();
