// lib.4.mjs

/**
 * Node 要求 ES6 模块采用.mjs后缀文件名。也就是说，
 * 只要脚本文件里面使用import或者export命令，那么就必须采用.mjs后缀名。
 * require命令不能加载.mjs文件，会报错，只有import命令才可以加载.mjs文件。
 * 反过来，.mjs文件里面也不能使用require命令，必须使用import。
 */
export let foo = 'yao';

setTimeout(()=>foo = 'yun', 500);
