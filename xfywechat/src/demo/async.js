/**
 * Created by yao on 2017/6/17.
 */
function timeout(ms){
    return new Promise((resolve,reject) =>{
        setTimeout(function(){
            resolve('!!!!');
        },ms);
    });
}


async function asyncPrint(value,ms){
    console.log(value);
   return await timeout(ms);

}

asyncPrint('hello world',50).then(function(data){
    console.log(data);
});



async function f(){
    await  new Promise((resolve,reject)=>{
        throw new Error('出错了');
    });
}
f().then(v=>console.log(v),v=>console.log(v))
.catch(e =>console.log(e));