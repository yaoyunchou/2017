class Person{
	constructor(name){
		this.name = name;
	}
	speak(){
		console.log(`my name is ${this.name}`)
	}
}

class Student extends Person{
	constructor(name,info){
		super(name);
	}
	klass(){
		console.log(`class ${info}`)
	}
}

let student = new Student('xiao ming','class 5')

student.speak();