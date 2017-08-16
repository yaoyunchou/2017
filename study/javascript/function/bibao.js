/**
 * Created by yaoyc on 2017/2/9.
 */
(function(){
	"use strict";
	
	/**
	 * 定义一个返回参数的函数
	 * @param v {string}
	 * @returns {Function}
	 */
	function constfunc(v){
		return function(){
			return v;
		};
	}
	var func = [];
	for(var i =0;i<10; i++){
		func[i] = constfunc(i);
	}
	console.log(func[5]());
	/**
	 * 扩展对比上面的代码，在同一作用域的时候多个闭包会有什么不同
	 * @returns {Array}
	 */
	function constfuncX(){
		var func1 = [];
		for(var i=0;i<10;i++){
			func1[i] = function (){return i;};
		}
		return func1;
	}
	var fs = constfuncX();
	console.info(fs[5]());
})();