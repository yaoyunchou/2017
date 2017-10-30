
const { inherit } = require('./inherit.js');

(function(){
    function Person (name,age) {
        this.name = name;
        this.age = age;
    }

    Person.prototype.hi = function(){
        console.log('hi my name is '+this.name);
    }
    Person.prototype.LONGS = 2;
    Person.prototype.ARMS = 2;

    function Students(name,age,klass){
        //这里的意义是Person初始化strudents的this对象，把person的this做的事情在students的this上面再做一次
        Person.apply(this,arguments);
        /**
         * 相当于：
         * this.name = name;
         * this.age = age
         */
        this.klass = klass;
    }
    /**
     * 这里是指定prototype,这里是吧hi， logs ，arms 放到students的原型里面，
     * 当students的实例调用hi时候，先自己找下有没有hi方法，然后去他的原型里面找有没有hi方法；
     * 2.当students把原型对象指向Person的时候他的constructor在原型里面，所以变成了Person,
     * 这时候我们需要把他弄一致。
     */
    Students.prototype = inherit(Person.prototype);
    Students.prototype.constructor = Students;


    var yao = new Students('yao',20,'one');
    //当students的实例调用hi时候，先自己找下有没有hi方法，然后去他的原型里面找有没有hi方法；
    yao.hi();//hi my name is yao
    yao.hi = function(){
        console.log('my name is yaoyunchou');
    }
    yao.hi();//my name is yaoyunchou



    console.log(Students.prototype.constructor === Students);
    console.log(yao instanceof Students);
    console.log(yao.ARMS);






    /**---------------------------------------------------------------------------------------------------------------------*/


})()