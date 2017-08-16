/**
 * Created by yao on 2017/2/15.
 */
(function (){
	"use strict";
	/**
	 * 把p中的可以枚举的属性复制到o中,并且返回o
	 *如果o中含有相同的属性,则直接覆盖
	 * 这个函数并不处理getter 和 setter以及复制属性
	 * 8-3中会出现更健壮的extend()的实现
	 * @param {object} o
	 * @param {object} p
	 */
	function extend(o,p){
		for(var prop in p ){
			o[prop] = p[prop];
		}
		return o;
	}

	/**
	 *把p中的可以枚举的属性复制到o中,并且返回
	 * 如果o中含有相同的属性就跳过本次循环进行下次循环
	 *这个函数并不处理getter 和setter 以及复制属性
	 * @param  {object} o
	 * @param  {object} p
	 */
	function mege(o,p){
		for(var prop in p){
			if(o.hasOwnProperty(prop)){
				continue;
			}else{
				o[prop] = p[prop];
			}
		}
		return o;
	}

	/**
	 * restrict
	 * 英 [rɪ'strɪkt]  美 [rɪ'strɪkt]
	 * vt. 限制；约束；限定
	 * 如果o中的属性在p中没有同名属性,则从o中删除这个属性
	 * 返回o
	 * @param {object}o
	 * @param {object}p
	 * @returns {*}
	 */
	function restrict(o,p){
		for(var prop in o){
			if(!p.hasOwnProperty(prop)){
				delete o[prop];
			}
		}
		return o;
	}

	/**
	 * subtract
	 * vt. 减去；扣掉
	 * 如果o中含有p中的属性就将该属性删除
	 * 返回o
	 * @param o
	 * @param p
	 */
	function subtract(o,p){
		for (var prop in p){
			delete o[prop];
		}
		return o;
	}

	/**
	 *union
	 * n. 联盟，协会；工会；联合
	 * 返回一个新对象,这个对象同时拥有o和p的属性
	 * 如果o和p用重名属性则用p的属性
	 * @param o
	 * @param p
	 * @returns {*}
	 */
	function union(o,p){
		return extend(extend({},o),p);
	}

	/**
	 *intersection
	 * n. 交叉；十字路口；交集；交叉点
	 * 返回一个新对象,这个对象拥有同时在p和o中出现的属性
	 * 很像o和p的交接,但是p中的属性会被忽略
	 * @param o
	 * @param p
	 * @returns {*}
	 */
	function intersection (o,p){
		return extend({},restrict(o,p));
	}

	/**
	 * 返回一个数组,这个数组包含o中所有可以枚举的属性
	 * @param o
	 * @returns {Array}
	 */
	function keys(o){
		var result = [];
		for(var prop in o){
			result.push(prop);
		}
		return result;
	}
	module.exports = { extend,mege,restrict,subtract,union,intersection,keys};
})();
