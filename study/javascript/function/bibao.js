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

// 20171028
/**
 * 针对上的学习历史记录发现前面的学习是不全面的，以后要针对什么是闭包，有什么好处，怎么用。这三个方面来进行学习。
 * 
 * 
 * 
 * 
 */

 /**
  * 自调用函数
  */
 (function(){
	//测试

	console.log(chou(10,20));
	
	/**
	 * TODO
	 * 这里的测试点是想弄明白a.匿名式函数表达式会被前置，
	 * 和var在一个闭包里面定义个变量一样会前置，
	 * 但是命名式函数表达式不会被前置，所以上面的console.log(chou(10,20));可以正常运行！
	 * console.log(yao(10,20));
	 * TypeError: yao is not a function
	 */
	
	//这个是命名函数表达式，其特点是会在调用栈里面被找到
	var yao = function yun(a,b){
		return a+b;
		
	};
    //这个是声明式函数表达式，函数声明，
	function chou(a,b){
		return a*b;
	}

	//命名式函数表达式只能在函数定义后被调用
	console.log(yao(10,20));
	/**
	 * 这里主要是测试看看node对于命名函数出现这样的情况的时候到底是怎么处理的
	 * console.log(yao === yun);
	 * ReferenceError: yun is not defined
	 */
	

	
	
 })()