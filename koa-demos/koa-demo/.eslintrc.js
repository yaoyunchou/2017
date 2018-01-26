module.exports = {
    "globals": {
        process:true,
        __dirname: true
    },
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "parser": "babel-eslint",
    "parserOptions": {
        "sourceType": "module"
    },
    "rules": {
        "indent": [2,4],
        "linebreak-style": [ "error", "windows"],
        "quotes": [ "error",  "single" ],
        "semi": [
            "error",
            "always"
        ],
        "no-console":1,//用到了console的地方提示警告
        "no-unused-vars":1,//定义了没有用的变量为警告
        "arrow-parens": 0,//箭头函数用小括号括起来
    }
};