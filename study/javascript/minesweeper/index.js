


/**
 * 
 * 生成行
 * @param {number} [v=0] 
 * @returns 
 */
function makeRow(v=0){
    let array = new Array(9);
    array.fill(v);
    return array;
}

/**
 * 类数组利用Array的方法进行map映射，
 * from的第二个参数是一个map
 * 
 * @param {number} [v=0] 
 * @returns 
 */
function makeMatrix(v=0){
    return Array.from({length:9},()=>makeRow(v));

}
/**
 * 自己如何实现，看下发挥
 * fill() 方法用于将一个固定值替换数组的元素。
 * 所以在这里makeRow只运行一次，fill把makeRow返回的值当成一个固定值了。
 * 但是这里是保存的指向地址，所以当makeRow第二个值变的时候整体就变了！
 * 所以我们
 * a要么让makeRow运行多次。
 * b,要么每次在填入二维数组的时候拷贝一份makeRow的数据，生成新的数组实例
 * @param {number} [v=0] 
 */
function makeMatrix2(v=0){
   let arr2 =   Array.from({length:9},function(){
      return makeRow();
  })
  //arr2.fill(makeRow(v));
  return arr2;
}

const a = makeMatrix2();
a[0][1] = 6;
console.info(a);