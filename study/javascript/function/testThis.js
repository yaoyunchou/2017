
function yao(){
    this.a = 1,
    this.b =2
    this.foo = function(){
        return this.a+this.b;
    }
    return  this;
}

console.log(yao());