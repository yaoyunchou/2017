(function (){
	"use strict";
	/**
	 * 定义一个初始化的方法
	 * @param p
	 * @returns {f}
	 */
	function inhert(p){
		if(p === null){
			throw TypeError();
		}
		if(Object.create){
			Object.create(p);
		}
		var t = typeof  p;
		if(t!=='object'&&t!=='function'){
			throw TypeError();
		}
		function f() {
			
		}
		f.prototype = p;
		return new f();
	}
	module.exports = {inhert};
})();