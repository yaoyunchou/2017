const matrixToolkit = {
	/**
	 * 
	 * 生成行
	 * @param {number} [v=0] 
	 * @returns 
	 */
	makeRow(v = 0,lenght=9) {
		let array = new Array(lenght);
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
	makeMatrix(v = 0,rows=9,cols=9) {
		return Array.from({
			length: rows
		}, () => this.makeRow(v,cols));

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
	coordinate(x,y) {
		x = Math.floor(Math.random()*x);
		y = Math.floor(Math.random()*y);
		return {x,y};
	},
	isEqual(arr,obj){
		let result = false;
		for(let i=0;i<arr.lenght;i++){
			result = arr[i].x === obj.x&&arr[i].y === obj.y
		}
		return result;
	}

};
/**
	 * 宫坐标系
	 */
const boxToolkit = {
	getBoxNum(rowIndex,columnIndex,matrix){
		var resultArr =[];
		for(let i= 0;i<3;i++){
			for(let j=0;j<3;j++){
				if(rowIndex+i-1>=0&&rowIndex+i-1<matrix.length&&columnIndex+j-1>=0&&columnIndex+j-1<matrix[0].length&&matrix[rowIndex+i-1][columnIndex+j-1].text()==='false'){
					resultArr.push(matrix[rowIndex+i-1][columnIndex+j-1]);
				}

			}
		}
		matrix[rowIndex][columnIndex].text(resultArr.length||0).css('textIndex','0em');
		return resultArr.length||0;
	},
	run(rowIndex,columnIndex,matrix){
		if(!this.getBoxNum.apply(this,arguments)){
			for(let i= 0;i<3;i++){
				for(let j=0;j<3;j++){
					if(rowIndex+i-1>=0&&rowIndex+i-1<matrix.length>=0&&columnIndex+j-1&&columnIndex+j-1<matrix[0].length&&!(i===1&&j===1)){
						this.run(rowIndex+i-1,columnIndex+j-1,matrix);
					}
				}
			}
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

// console.log(matrixToolkit.makeMatrix(0,16,9))
