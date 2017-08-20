// import TableCtrl from '@/components/TableCtrl'

import element from './demo.html'
// import '@/components/test.1.js'
// import '@/components/test.2.js'
export default {
	template:element,
	data() {
		return {
			tableData3: [{
				date: '2016-05-03',
				name: '王小虎',
				address: '上海市普陀区金沙江路 1518 弄'
			}, {
				date: '2016-05-02',
				name: '王小虎',
				address: '上海市普陀区金沙江路 1518 弄'
			}, {
				date: '2016-05-04',
				name: '王小虎',
				address: '上海市普陀区金沙江路 1518 弄'
			}, {
				date: '2016-05-01',
				name: '王小虎',
				address: '上海市普陀区金沙江路 1518 弄'
			}, {
				date: '2016-05-08',
				name: '王小虎',
				address: '上海市普陀区金沙江路 1518 弄'
			}, {
				date: '2016-05-06',
				name: '王小虎',
				address: '上海市普陀区金沙江路 1518 弄'
			}, {
				date: '2016-05-07',
				name: '王小虎',
				address: '上海市普陀区金沙江路 1518 弄'
			}]
		}
	},

	// methods: {
	// 	toggleSelection(rows) {
	// 		if (rows) {
	// 			rows.forEach(row => {
	// 				this.$refs.multipleTable.toggleRowSelection(row);
	// 			});
	// 		} else {
	// 			this.$refs.multipleTable.clearSelection();
	// 		}
	// 	},
	// 	handleSelectionChange(val) {
	// 		this.multipleSelection = val;
	// 	}
	// }
}
