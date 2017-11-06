//检查数独的方案

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
        
        this._isSuccess = this.matrixMakes.every(row =>row.every(mark=>mark));
        return this._isSuccess;

    }

    checkRows(){
        for(let i=0;i<9;i++){
            this._matrixMakes[i] =  checkArray(this._matrix[i])
        }
    }
}