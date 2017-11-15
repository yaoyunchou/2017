//生成数独解决方案
const Toolkit = require("./toolkit");


class Generator{

    generator(){
        while (!this.innerGenerator()) {
            console.log("tru agin");
        }
    }
    innerGenerator(){
        this.matrix = Toolkit.matrix.makeMatrix();
        //获取一个随机列表
        this.orders = Toolkit.matrix.makeMatrix()
                    .map(row=>row.map((vlue,key)=>key))
                    .map(row=>Toolkit.matrix.shuffle(row));
        // while (condition) {
            
        // }
        for(let n =1; n<=9;n++){
           if(!this.fillNumber(n)){
               return false;
           }
        }
        return true;
    }
    fillNumber(n){
        return this.fillRow(n,0);
    }
    fillRow(n,rowIndex){
        if(rowIndex>8){
            return true;
        }
        const row = this.matrix[rowIndex];
        const order = this.orders[rowIndex];
        for(let i=0;i<9;i++){
            const colIndex = order[i];
            //如果这个位置已经有值则跳过
            if(row[colIndex]){
                continue;
            }
            //检查这个位置是否可以填n  ,我们在工具中加一个检查方法
            if(!Toolkit.matrix.checkFillable(this.matrix,n,rowIndex,colIndex)){
                continue;
            }
            row[colIndex] = n;
            //当前行填写n成功  递归调用fillRow  l来进行下一行的填写；、
            if(!this.fillRow(n,rowIndex+1)){
                row[colIndex] = 0;
                continue
            }
            return true;
        }
        return false;
    }
}
const generator = new Generator();
generator.generator();
module.exports = generator.matrix;
