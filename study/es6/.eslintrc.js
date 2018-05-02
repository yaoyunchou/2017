module.exports = {
	"extends": "eslint:recommended",
	"env": {
		"node": true
	},
	"rules": {
		// 定义对象的set存取器属性时，强制定义get  
		"accessor-pairs": 2,
		// 指定数组的元素之间要以空格隔开(,后面)， never参数：[ 之前和 ] 之后不能带空格，always参数：[ 之前和 ] 之后必须带空格  
		"array-bracket-spacing": [2, "never"],
		// 在块级作用域外访问块内定义的变量是否报错提示  
		"block-scoped-var": 0,
		// if while function 后面的{必须与if在同一行，java风格。  
		"brace-style": [2, "1tbs", {
			"allowSingleLine": true
		}],
		// 双峰驼命名格式  
		"camelcase": 2,
		// 数组和对象键值对最后一个逗号， never参数：不能带末尾的逗号, always参数：必须带末尾的逗号，  
		// always-multiline：多行模式必须带逗号，单行模式不能带逗号  
		"comma-dangle": [2, "never"],
		// 控制逗号前后的空格  
		"comma-spacing": [2, {
			"before": false,
			"after": true
		}],
		// 控制逗号在行尾出现还是在行首出现  
		// http://eslint.org/docs/rules/comma-style  
		"comma-style": [2, "last"],
		// 圈复杂度  
		"complexity": [2, 9],
		// 以方括号取对象属性时，[ 后面和 ] 前面是否需要空格, 可选参数 never, always  
		"computed-property-spacing": [2, "never"],
		// 强制方法必须返回值，TypeScript强类型，不配置  
		"consistent-return": 0,
		// 用于指统一在回调函数中指向this的变量名，箭头函数中的this已经可以指向外层调用者，应该没卵用了  
		// e.g [0,"that"] 指定只能 var that = this. that不能指向其他任何值，this也不能赋值给that以外的其他值  
		"consistent-this": 0,
		// 强制在子类构造函数中用super()调用父类构造函数，TypeScrip的编译器也会提示  
		"constructor-super": 0,
		// if else while for do后面的代码块是否需要{ }包围，参数：  
		//    multi  只有块中有多行语句时才需要{ }包围  
		//    multi-line  只有块中有多行语句时才需要{ }包围, 但是块中的执行语句只有一行时，  
		//                   块中的语句只能跟和if语句在同一行。if (foo) foo++; else doSomething();  
		//    multi-or-nest 只有块中有多行语句时才需要{ }包围, 如果块中的执行语句只有一行，执行语句可以零另起一行也可以跟在if语句后面  
		//    [2, "multi", "consistent"] 保持前后语句的{ }一致  
		//    default: [2, "all"] 全都需要{ }包围  
		"curly": [2, "all"],
		// switch语句强制default分支，也可添加 // no default 注释取消此次警告  
		"default-case": 2,
		// 强制object.key 中 . 的位置，参数:  
		//      property，'.'号应与属性在同一行  
		//      object, '.' 号应与对象名在同一行  
		"dot-location": [2, "property"],
		// 强制使用.号取属性  
		//    参数： allowKeywords：true 使用保留字做属性名时，只能使用.方式取属性  
		//                          false 使用保留字做属性名时, 只能使用[]方式取属性 e.g [2, {"allowKeywords": false}]  
		//           allowPattern:  当属性名匹配提供的正则表达式时，允许使用[]方式取值,否则只能用.号取值 e.g [2, {"allowPattern": "^[a-z]+(_[a-z]+)+$"}]  
		"dot-notation": [2, {
			"allowKeywords": true
		}],
		// 文件末尾强制换行  
		"eol-last": 2,
		// 使用 === 替代 ==  
		"eqeqeq": [2, "allow-null"],
		// 方法表达式是否需要命名  
		"func-names": 0,
		// 方法定义风格，参数：  
		"no-console": "off",
		"prefer": {
			"arg": "param",
			"argument": "param",
			"class": "constructor",
			"return": "returns",
			"virtual": "abstract"
		}
	},
	"ecmaFeatures": {
		// lambda表达式  
		"arrowFunctions": true,
		// 解构赋值  
		"destructuring": true,
		// class  
		"classes": true,
		// http://es6.ruanyifeng.com/#docs/function#函数参数的默认值  
		"defaultParams": true,
		// 块级作用域，允许使用let const  
		"blockBindings": true,
		// 允许使用模块，模块内默认严格模式  
		"modules": true,
		// 允许字面量定义对象时，用表达式做属性名  
		// http://es6.ruanyifeng.com/#docs/object#属性名表达式  
		"objectLiteralComputedProperties": true,
		// 允许对象字面量方法名简写  
		/*var o = { 
			method() { 
			  return "Hello!"; 
			} 
		 }; 
	 
		 等同于 
	 
		 var o = { 
		   method: function() { 
			 return "Hello!"; 
		   } 
		 }; 
		*/
		"objectLiteralShorthandMethods": true,
		/* 
		  对象字面量属性名简写 
		  var foo = 'bar'; 
		  var baz = {foo}; 
		  baz // {foo: "bar"} 
	 
		  // 等同于 
		  var baz = {foo: foo}; 
		*/
		"objectLiteralShorthandProperties": true,
		// http://es6.ruanyifeng.com/#docs/function#rest参数  
		"restParams": true,
		// http://es6.ruanyifeng.com/#docs/function#扩展运算符  
		"spread": true,
		// http://es6.ruanyifeng.com/#docs/iterator#for---of循环  
		"forOf": true,
		// http://es6.ruanyifeng.com/#docs/generator  
		"generators": true,
		// http://es6.ruanyifeng.com/#docs/string#模板字符串  
		"templateStrings": true,
		"superInFunctions": true,
		// http://es6.ruanyifeng.com/#docs/object#对象的扩展运算符  
		"experimentalObjectRestSpread": true
	},
	"parserOptions": {
		"ecmaVersion": 6,
		"sourceType": "module",
		"ecmaFeatures": {
			"jsx": true
		}
	}
}
