/**
 * es6 简单类型也是用的引用
 */
module.exports = {
    a:()=>{
        console.log('!!!')
    },
    b:100
}


//等同于
export default {
    a:()=>{
        console.log('!!!')
    },
    b:100

}
