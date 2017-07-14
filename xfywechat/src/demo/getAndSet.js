/**
 * Created by yao on 2017/6/21.
 */



var person = {
    name:'yaoyunchou',
};
Object.defineProperties(person,{
    age:{
        get:function(){},
        set:function(newValue){
            if(newValue>5){
                this.name = newValue;
            }
        }
    }
})
//person.age = 2;
person.age = 10;
console.log(person);
