/**
 * 洗牌算法
 * 
 */

/**
 * Fisher-Yates 洗牌算法
 * 
 * @param {any} arr 
 */
function shuffle(arr){
    const endIndex = arr.length -2;
    for(let i=0;i<=endIndex;i++){
        let j = i+ parseInt(Math.random()*(arr.length-i));
        [arr[i],arr[j]] = [arr[j],arr[i]];
    }
    return arr;
 }



 const a = Array.from({length:9},(v,k)=> k+1);

 console.log(a);
 console.log(shuffle(a));