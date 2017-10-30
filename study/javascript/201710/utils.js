/**
 * 这里之所以还来一次，完全是想自己理解后实现一次
 * 
 */

 
/**
 * inherit
 * vt. 继承；遗传而得
 *vi. 成为继承人
 * inherit() 返回一个继承自原型对象p的属性的新对象
 * 这里用es5中的Object.create()函数(如果存在的话)
 * 如果不存在Object.create(),则退化为原始的方法实现类似的效果
 * @export
 * @param {object} proto 
 * @returns 
 */
export function inherit (proto){
     if(Object.create){
         return  Object.create(proto);
     }else{
         function F(){};
         F.prototype = proto;
         return new F;
     }
 }

