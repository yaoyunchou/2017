const Toolkit = require('../core/toolkit');
const Generator = require('../core/generator');


class Grid {
	constructor(container) {
		this._$container = container;
		this._onlyUI = false;
		this._$container.on('touchstart','button',e=>{
			this._start = new Date();
		});
		this._$container.on('touchend','button',this.run.bind(this));
		this._$container.on('click', 'button',this.run.bind(this));
		// $(document).on('click', '.rebuild', this.build.bind(this));
		// $(document).on('click', '.checker', this.checker.bind(this));
		// $(document).on('click', '.clear', () => {this._$container.find('span').removeClass('err mark1 mark2')});
		// $(document).on('click', '.reset', () => {this._$container.find('span').not('.fixed').text('0').removeClass('err mark1 mark2').addClass('empty')});        
	}
	build(rows = 9, cols = 9) {
		const spanSize = $('body').width() * 0.1 + 'px';
		const spanFontSize = $('body').width() * 0.1 * 0.5 + 'px';
		const generator = new Generator(rows, cols);
		generator.makeMatrix();
		this._bombs = generator.bombs;
		console.log(this._bombs);
		this._solutionMatrix = generator.matrix;
		this._$cells = this._solutionMatrix.map((rowValues, rowIndex) => rowValues.map((cellValue, columnIndex) => {
			return $('<button data-row-index="' + rowIndex + '" data-column-index="' + columnIndex + '">').css({
				width: spanSize,
				height: spanSize,
				lineHeight: spanSize,
				fontSize: spanFontSize
			}).addClass('btn btn-primary iconfont');
		}));

		const $divArray = this._$cells.map($spanArray => {
			return $("<div>").append($spanArray);
		})
		this._$container.empty();
		this._$container.append($divArray);
		this._onlyUI = false;
	}
	berning(rowIndex, columnIndex, matrix) {
		if (Toolkit.box.berning.apply(this, arguments)) {
			this._bombs.forEach(element => {
				this._$cells[element.x][element.y].html('¤')
			});
			return false;
		} else {
			return true;
		}
	}
	run(e){
		const $cell = $(e.target);
		this._end = new Date();
		if(e.button===2||this._end-this._start>500){
			if($cell.html().length){
				$cell.html('');
			}else{
				$cell.html('&#xe8b4;');
			}
		}else{
			if($cell.html().length){
				return;
			}
			console.log($cell.data('rowIndex') + '===' + $cell.data('columnIndex'));
			if (this.berning($cell.data('rowIndex'), $cell.data('columnIndex'), this._solutionMatrix)) {
				Toolkit.box.run($cell.data('rowIndex'), $cell.data('columnIndex'), this._solutionMatrix, this._$cells);
			}else{
				alert('您失败了！');
			};
		}
	}
}
// const test = new Grid();

// const a = Array.from({length:9},(v,k)=>k+1);
// console.log(a);
// console.log(toolkit.shuffle(a));
// var b = toolkit.shuffle(a).sort();
// console.log(b);
// console.log(b.join(''));


//new Grid($('#container')).build();

module.exports = Grid;
