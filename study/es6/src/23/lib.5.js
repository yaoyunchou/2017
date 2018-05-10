/**
 * 每个引用这个模块的代码获得的C实例都是相同的
 * 
 * 2.这里也是但例的一种写法
 */

 function C(){
     this.sum = 0;
     this.add = function(){
        this.sum ++;
     }  
     this.show = function(){
        console.log(this.sum);
     }
 }

 export let c = new C();
