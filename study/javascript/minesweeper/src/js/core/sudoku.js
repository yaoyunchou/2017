//生成数独游戏
const matrix = require("./generator");

//1.生成解决方案：Generator 


//2随机去除部分的数据，按比例

module.exports  = class Sudoku{
    constructor(){
        this.solutionMatrix = matrix;
    }
    make(level = 5){
        //生成迷盘
        this.solutionMatrix = this.solutionMatrix.map(row => row.map(function(cell){
            return Math.random()*9<level?0:cell;
        }));
    }
}

// const sudoku = new Sudoku();
// sudoku.make();

// console.log(sudoku.solutionMatrix);