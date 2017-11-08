const Toolkit = require('../core/toolkit');
const Sudoku = require('../core/sudoku');
class Grid{
    constructor(container){
        this._$container = container;
        $(document).on('click','.rebuild',this.build.bind(this));
    }
    build(){
       
        const spanSize = $('body').width()*0.1+'px';
        const spanFontSize = $('body').width()*0.1*0.5+'px';

        const sudoku = new Sudoku();
        sudoku.make();
        console.log(sudoku.solutionMatrix);
        const $cells = sudoku.solutionMatrix.map(rowValues => rowValues.map(cellValue=>{
                if(cellValue){
                    return $('<span>').css({width:spanSize,height:spanSize,lineHeight:spanSize,fontSize:spanFontSize}).addClass('fixed').text(cellValue);
                }else{
                    return $('<span>').css({width:spanSize,height:spanSize,lineHeight:spanSize,fontSize:spanFontSize}).addClass('empty').text(cellValue);
                }
               
        }));
        console.log($cells);
        const $divArray = $cells.map($spanArray =>{
            return $("<div>").append($spanArray);
        })
        this._$container.empty();
        this._$container.append($divArray);
    }
    bindPopup(popupNumber){
        this._$container.on('click','span',e=>{
            const $cell = $(e.target);
            if($cell.hasClass('fixed')){
                return;
            }
            popupNumber.popup($cell);
        })
    }
   
    
}


// const a = Array.from({length:9},(v,k)=>k+1);
// console.log(a);
// console.log(toolkit.shuffle(a));
// var b = toolkit.shuffle(a).sort();
// console.log(b);
// console.log(b.join(''));


//new Grid($('#container')).build();

module.exports = Grid;