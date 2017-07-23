/**
 * service的修饰器可以自动初始化方法
 * 不会用，看别人的代码所以来点心得  后面也会有类似的就不加这个备注了
 * 心得：
 * 下面的return是真正的内容，很巧妙的是这里吧serCtrl,name传进来了！！！这是我怎么都想不到的
 * @param  {} SerCtrl
 * @param  {} name
 */
export default function Service(SerCtrl,name){
    return function (target){
        if(typeof target === 'function'){
            target.prototype.Service = SerCtrl;
            target.prototype.service = new SerCtrl(name);
        }
    }
}