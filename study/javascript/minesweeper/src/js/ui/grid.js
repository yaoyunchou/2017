const Toolkit = require('../core/toolkit');
const Sudoku = require('../core/sudoku');
const Checker = require('../core/checker');

class Grid {
	constructor(container) {
		this._$container = container;
		this._onlyUI = false;
		$(document).on('click', '.rebuild', this.build.bind(this));
        $(document).on('click', '.checker', this.checker.bind(this));
		$(document).on('click', '.clear', () => {this._$container.find('span').removeClass('err mark1 mark2')});
        $(document).on('click', '.reset', () => {this._$container.find('span').not('.fixed').text('0').removeClass('err mark1 mark2').addClass('empty')});        
	}
	build() {
		const spanSize = $('body').width() * 0.1 + 'px';
		const spanFontSize = $('body').width() * 0.1 * 0.5 + 'px';
		if(!this._onlyUI){
			const sudoku = new Sudoku();
			sudoku.make();
			this._solutionMatrix = sudoku.solutionMatrix;
		}
		
		const $cells = this._solutionMatrix.map(rowValues => rowValues.map(cellValue => {
			if (cellValue) {
				return $('<span>').css({
					width: spanSize,
					height: spanSize,
					lineHeight: spanSize,
					fontSize: spanFontSize
				}).addClass('fixed').text(cellValue);
			} else {
				return $('<span>').css({
					width: spanSize,
					height: spanSize,
					lineHeight: spanSize,
					fontSize: spanFontSize
				}).addClass('empty').text(cellValue);
			}

		}));
		console.log($cells);
		const $divArray = $cells.map($spanArray => {
			return $("<div>").append($spanArray);
		})
		this._$container.empty();
		this._$container.append($divArray);
		this._onlyUI = false;
	}
	bindPopup(popupNumber) {
		this._$container.on('click', 'span', e => {
			const $cell = $(e.target);
			if ($cell.hasClass('fixed')) {
				return;
			}
			popupNumber.popup($cell);
		})
	}
	checker() {
		let domArr = [];
        const $rows = this._$container.find('div');
        this._$container.find('div').find('span').removeClass('err');
		$rows.map((index, div) => {
			console.log($(div).find('span').map((index, cell) => parseInt($(cell).text())).toArray());
			domArr.push($(div).find('span').map((index, cell) => parseInt($(cell).text())).toArray())

		});
		const checker = new Checker(domArr);
		checker.check();
		if (checker._isSuccess) {
			alert('恭喜过关！')
		} else {
            console.log(checker._matrixMakes);
			for (let row = 0; row < 9; row++) {
				for (let col = 0; col < 9; col++) {
                    if(!checker._matrixMakes[row][col]){
                        $rows.eq(row).find('span').eq(col).not('.fixed').addClass('err');
                    }
                    
				}
			}
		}

	}
	getOrientation(){
		var that = this
		$(window).bind('resize',function(){
			that._onlyUI = true;
			that.build();
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
