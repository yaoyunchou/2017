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
        "no-console":1,
        "no-unused-vars":1
    }
};