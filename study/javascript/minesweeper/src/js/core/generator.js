//生成数独解决方案
const Toolkit = require("./toolkit");


class Generator {
	constructor(rows=9, cols=9) {
		this._rows = rows;
		this._cols = cols;
	}
	//构建数组
	makeMatrix() {
        const matrix = Toolkit.matrix.makeMatrix().map((rows, index) => rows.map(col => true));
        let bombs = this.bombs();
        bombs.forEach(function(v,k){
            matrix[v.x][v.y] = false;
        })
        this.matrix =  matrix;
	}
	bombs() {
		let bombs = [];
		switch (this._cols) {
			case 16:
				for (let i = 0; i < 40;) {
					let coordinate = Toolkit.matrix.coordinate(16, 16);
					if (Toolkit.matrix.isEqual(bombs, coordinate)) {
						continue;
					} else {
						bombs.push(coordinate);
					}
					i++;
				}
				break;
			case 30:
				for (let i = 0; i < 99;) {
					let coordinate = Toolkit.matrix.coordinate(16, 30);
					if (Toolkit.matrix.isEqual(bombs, coordinate)) {
						continue;
					} else {
						bombs.push(coordinate);
					}
					i++;
				}
				break;

			default:
				for (let i = 0; i < 10;) {
					let coordinate = Toolkit.matrix.coordinate(9, 9);
					if (Toolkit.matrix.isEqual(bombs, coordinate)) {
						continue;
					} else {
						bombs.push(coordinate);
					}
					i++;
				}
				break;
		}
		return bombs;
	}
}
// const generator = new Generator();
// generator.generator();
module.exports =  Generator;
