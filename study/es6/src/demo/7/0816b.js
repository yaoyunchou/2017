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


//rest参数
/**
 * ES2016 做了一点修改，规定只要函数参数使用了默认值、解构赋值、或者扩展运算符，
 * 那么函数内部就不能显式设定为严格模式，否则会报错。
 * rest 参数之后不能再有其他参数（即只能是最后一个参数），否则会报错
 * 
 * @param {any<number>} values 
 */
function add(...values) {
	let sum = 0;
	for (let vaule of values) {
		sum += values;
	}
	return sum;
}

console.log(add(4, 5, 5));


// arguments变量的写法
function sortNumbersFun() {
	return Array.prototype.slice.call(arguments).sort();
}

// rest参数的写法
const sortNumbers = (...numbers) => numbers.sort();

/**
 * 
 * bound
 *英 [baʊnd]   美 [baʊnd]  
 *vi.
 *跳，弹跳;限制;接壤
 *vt.
 *束缚;给…划界，限制;使弹回，使跳跃
 *n.
 *界限，限制;跃起;（球等的）反跳
 *adj.
 *用带子绑住的;有义务的;装订的，有封面的;[化，物]结合的
 *
 * 
 */
(new Function).name // "anonymous"
function foo() {};
foo.bind({}).name // "bound foo"

(function() {}).bind({}).name // "bound "
