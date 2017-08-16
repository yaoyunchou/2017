'use strict';

/**
 * Created by yaoyc on 2017/1/13.
 */
var str = 'x'.repeat(4);
console.log(str);
/*
*includes()：返回布尔值，表示是否找到了参数字符串。
* startsWith()：返回布尔值，表示参数字符串是否在源字符串的头部。
* endsWith()：返回布尔值，表示参数字符串是否在源字符串的尾部。
* */
console.log('yaoyunchou'.includes('a'));

var dfsd;

console.log('string text line 1\nstring text line 2');

var ulString = '\n<ul>\n  <li>first</li>\n  <li>second</li>\n</ul>\n'.trim();
console.log(ulString);

var basket = {
  onSale: 100,
  name: 'yaoyunchou'
};

var backString = 'There are <b>' + basket.name + '</b> items\n   in your basket, <em>' + basket.onSale + '</em>\n  are on sale!\n';
console.log(backString);