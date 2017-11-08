//检查数独的方案
const Toolkit = require("./toolkit");
const matrix = require("./generator");

function checkArray(array){
    const length = array.length;
    const marks = new Array(length);
    marks.fill(true);
    for(let i=0;i<9;i++){
        if(!marks[i]){
            continue;
        }
        const v = array[i];
        //是否有效 0无效， 1-9有效
        if(!v){
            marks[i] = false;
        }
        //是否重复
        for(let j =i+1;j<9;j++){
            if(array[i] ===array[j]){
                marks[i] = false;
                marks[j] = false;
            } 
        }
    }
    return marks;
}
/**
 * 输入 matrix 用户完成9*9的数独数据
 * 处理：对matrix 行列 宫进行检查  并填入makes
 * 输出：检查是否成功 makes
 */
class Checker{
    constructor(matrix){
        this._matrix = matrix;
        this._matrixMakes = Toolkit.matrix.makeMatrix(true);
    }
    get matrixMakes(){
        return this._matrixMakes;
    }
    get isSuccess(){
        return this._isSuccess;
    }
    check(){
        this.checkRows();
        this.checkCols();
        this.checkBoxes();
        
        this._isSuccess = this._matrixMakes.every(row =>row.every(mark=>mark));
        return this._isSuccess;
    }

    checkRows(){
        for(let i=0;i<9;i++){
            this._matrixMakes[i] =  checkArray(this._matrix[i]).map(v =>v);
        }
    }
    checkCols(){
        for(let i =0;i++;i<9){
            let colArr = [];
            for(let j=0;j<9;j++){
                colArr.push(this._matrix[j][i])
            }
            checkArray(colArr).forEach(function(value,key) {
                this._matrixMakes[key][i] =  value;
            }, this);;
        }
    }
    checkBoxes(){
        for(let boxIndex =0;boxIndex<9;boxIndex++){
            let boxArr  = Toolkit.box.getBoxCells(boxIndex,this._matrix); 
            checkArray(boxArr).forEach(function(value,key) {
                let {rowIndex,colIndex} = Toolkit.box.convertFromboxIndex(boxIndex,key);
                if(!value){
                    this._matrixMakes[rowIndex][colIndex] = false;
                }

            }, this);
            
        }
    }
}

// var checker = new Checker(matrix);
// checker.check();

// console.log(checker._matrixMakes);
// matrix[0][5] = matrix[5][4] =4;
// matrix[0][0] = 0;
// var checker2 = new Checker(matrix);
// checker2.check();
// console.log(checker2._matrix);
// console.log(checker2._matrixMakes);
