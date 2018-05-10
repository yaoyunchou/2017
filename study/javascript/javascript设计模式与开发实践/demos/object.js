function Person(name,age,gender){
    this.name = name;
    this.age = age;
    this.gender = gender;
}

Person.prototype.speak = function(){
    console.log(`my name is ${this.name}`);
}

function Student(name,age,gender){

    //继承属性
    Person.apply(this, arguments);
}
//继承方法
Student.prototype = new Person();
Student.prototype.consturctor = Student;


var student = new Student('yao',18,'f');

student.speak();

console.log(student instanceof Student);
console.log(student instanceof Person);
console.log(student instanceof Object);
//console.log(status instanceof Student);

var teacher = Object.create(student,{
    name:{
       value: 'fish'
    },
    // age:50,
    // gender:'f'
});
teacher.speak()