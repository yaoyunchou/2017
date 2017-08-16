/**
 * Created by yao on 2017/2/15.
 */
(function (){
	"use strict";
	/**
	 * inherit
	 * vt. 继承；遗传而得
	 *vi. 成为继承人
	 * inherit() 返回一个继承自原型对象p的属性的新对象
	 * 这里用es5中的Object.create()函数(如果存在的话)
	 * 如果不存在Object.create(),则退化为原始的方法实现类似的效果
	 * @param {Object} p
	 */
	function inherit(p){
		if(p === null){
			console.error('p can not be null');
			return;
		}
		if(Object.create){
			return Object.create(p);
		}
		var t = typeof p;
		if(t!== 'object'&&t!== 'function'){
			console.error('this is not function');
			return;
		}
		function f(){}
		f.prototype = p;
		return new f();
	}
	module.exports = {inherit};
})();
