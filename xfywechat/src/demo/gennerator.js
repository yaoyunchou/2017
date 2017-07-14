
/**
 * Created by yao on 2017/6/16.
 */

function doSomeThings(next){
    console.log('我在做事情!!!');
}
function *helloWorldGennerator() {
    //var next = this.next;
   // console.log(next);
    yield 'helle';
    yield doSomeThings(this);
    yield 'world';
    yield 'ending';
    return 'yao';
}


var a = helloWorldGennerator();
console.log(a.next());


