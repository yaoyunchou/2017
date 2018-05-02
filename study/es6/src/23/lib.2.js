var counter2 = 4;

function incCounter2 (){
    counter2 ++;
}

module.exports = {
    get counter2(){
        return counter2;
    },
    incCounter2:incCounter2
};