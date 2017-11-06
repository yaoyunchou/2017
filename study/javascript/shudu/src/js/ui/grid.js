const Toolkit = require('../core/toolkit');
const matrix = require('../core/generator');
class Grid{
    constructor(container){
        this._$container = container;
    }
    build(){
       
        const spanSize = $('body').width()*0.1+'px';
        const spanFontSize = $('body').width()*0.1*0.5+'px';
        console.log(matrix);
        const $cells = matrix.map(rowValues => rowValues.map(cellValue=>{
                return $('<span>').css({width:spanSize,height:spanSize,lineHeight:spanSize,fontSize:spanFontSize}).text(cellValue);
        }));
        console.log($cells);
        const $divArray = $cells.map($spanArray =>{
            return $("<div>").append($spanArray);
        })

        this._$container.append($divArray);
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