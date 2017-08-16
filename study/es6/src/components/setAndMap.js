/**
 * Created by yaoyc on 2017/2/24.
 */
(function(){
	"use strict";
	{
		// 例一
		var set = new Set([1, 2, 3, 4, 4]);
		console.log(set);
		console.log([...set]);
// [1, 2, 3, 4]

// 例二
		var items = new Set([1, 2, 3, 4, 5, 5, 5, 5]);
		console.log(items.size);
	}
	{
		var items2 = [
			['name', '张三'],
			['title', 'Author']
		];
		var map = new Map();
		items2.forEach(([key, value]) => {map.set(key, value);console.log(map);});
		
	}
	{
		let map = new Map([
			['F', 'no'],
			['T',  'yes'],
		]);
		
		for (let key of map.keys()) {
			console.log(key);
		}
// "F"
// "T"
		
		for (let value of map.values()) {
			console.log(value);
		}
// "no"
// "yes"
		
		for (let item of map.entries()) {
			console.log(item[0], item[1]);
		}
// "F" "no"
// "T" "yes"

// 或者
		for (let [key, value] of map.entries()) {
			console.log(key, value);
		}

// 等同于使用map.entries()
		for (let [key, value] of map) {
			console.log(key, value);
		}
		
		var strMapToObj = function strMapToObj(strMap) {
			let obj = Object.create(null);
			for (let [k,v] of strMap) {
				obj[k] = v;
			}
			return obj;
		};
		var strMapToJson = function strMapToJson(strMap) {
			return JSON.stringify(strMapToObj(strMap));
		};
		
		let myMap = new Map().set('yes', true).set('no', false);
		console.log(strMapToJson(myMap));
// '{"yes":true,"no":false}'
	}
})();