"use strict";

/**
 *1. 函数参数的默认值
 *2. rest 参数
 *3.严格模式
 *4.name 属性
 *5.箭头函数
 *6.绑定 this
 *7.尾调用优化
 *8.函数参数的尾逗号
 *9.catch 语句的参数
 * 
 */

//5.箭头函数=====================================================
/**
 * 先体会下箭头函数的好处
 */
// 正常函数写法
[1, 2, 3].map(function (x) {
	return x * x;
});

// 箭头函数写法
[1, 2, 3].map(function (x) {
	return x * x;
});

function insert(value) {
	return {
		into: function into(array) {
			return {
				after: function after(afterValue) {
					array.splice(array.indexOf(afterValue) + 1, 0, value);
					return array;
				}
			};
		}
	};
}

insert(2).into([1, 3]).after(1); //[1, 2, 3]
var insert2 = function insert2(value) {
	return {
		into: function into(array) {
			return {
				after: function after(afterValue) {
					array.splice(array.indexOf(afterValue) + 1, 0, value);
					return array;
				}
			};
		}
	};
};

insert2(2).into([1, 3]).after(1); //[1, 2, 3]

//6尾调用=======================================================