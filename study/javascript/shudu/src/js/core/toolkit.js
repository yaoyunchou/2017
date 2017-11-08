const matrixToolkit = {
	/**
	 * 
	 * 生成行
	 * @param {number} [v=0] 
	 * @returns 
	 */
	makeRow(v = 0) {
		let array = new Array(9);
		array.fill(v);
		return array;
	},

	/**
	 * 类数组利用Array的方法进行map映射，
	 * from的第二个参数是一个map
	 * 
	 * @param {number} [v=0] 
	 * @returns 
	 */
	makeMatrix(v = 0) {
		return Array.from({
			length: 9
		}, () => this.makeRow(v));

	},
	/**
	 * 自己如何实现，看下发挥
	 * fill() 方法用于将一个固定值替换数组的元素。
	 * 所以在这里makeRow只运行一次，fill把makeRow返回的值当成一个固定值了。
	 * 但是这里是保存的指向地址，所以当makeRow第二个值变的时候整体就变了！
	 * 所以我们
	 * a要么让makeRow运行多次。
	 * b,要么每次在填入二维数组的时候拷贝一份makeRow的数据，生成新的数组实例
	 * @param {number} [v=0] 
	 */
	makeMatrix2(v = 0) {
		let arr2 = Array.from({
			length: 9
		}, function() {
			return this.makeRow();
		})
		//arr2.fill(makeRow(v));
		return arr2;
	},
	/**
	 * Fisher-Yates 洗牌算法
	 * 
	 * @param {any} arr 
	 */
	shuffle(arr) {
		const endIndex = arr.length - 2;
		for (let i = 0; i <= endIndex; i++) {
			let j = i + parseInt(Math.random() * (arr.length - i));
			[arr[i], arr[j]] = [arr[j], arr[i]];
		}
		return arr;
	},
	checkFillable(matrix,n,rowIndex,colIndex){
		const row = matrix[rowIndex];
		const column = this.makeRow().map((value,key)=>matrix[key][colIndex]);
		const box = boxToolkit.getBoxCells(boxToolkit.convertBoxIndex(rowIndex,colIndex),matrix);
		// for(let i=0;i<9;i++){

		// }
		let checkFlog = true;
		for(let i=0;i<9;i++){
			if(row[i] === n||column[i]===n||box[i]===n){
				checkFlog = false;
			}
		}
		return checkFlog;
	}

};
/**
	 * 宫坐标系
	 */
const boxToolkit = {
	getBoxCells(boxIndex,matrix){
		const startRowIndex = parseInt(boxIndex/3)*3;
		const startColIndex = (boxIndex%3)*3;
		const result = [];
		for(let i=0;i<9;i++){
			result.push(matrix[startRowIndex+parseInt(i/3)][startColIndex+i%3])
		}
		return result;
	},
	convertBoxIndex(rowIndex,colIndex){
		return parseInt(rowIndex/3)*3+parseInt(colIndex/3);
	},
	convertFromboxIndex(boxIndex,cellIndex){
		let rowIndex = boxIndex%3*3+cellIndex%3;
		let colIndex = Math.floor(boxIndex/3)*3+Math.floor(cellIndex/3)
		return {
			rowIndex,
			colIndex
		}
	}
}; 

module.exports = class Toolkit{
	/**
	 * 矩阵相关工具
	 */
	static get matrix(){
		return matrixToolkit;
	}
	/**
	 * 宫坐标工具
	 */
    static  get box(){
		return boxToolkit;
	}
};


//测试
// console.log(boxToolkit.convertBoxIndex(5,3));
// var su = matrixToolkit.makeMatrix().map(rows=>rows.map((vlaue,key)=>key+1));
// var col =  matrixToolkit.makeRow().map((value,key)=>su[key][3]);
// console.log(col);
// console.log(su);
// console.log(4 in su);

// console.log(boxToolkit.getBoxCells(4,su));
//console.log(boxToolkit.convertFromboxIndex(5,4));