import element from './form.html';
import http from '@/services/http';
import axios from 'axios'

export default {
	template: element,
	methods: {
		handleClick(id) {
			console.log(id);
			console.log(axios.defaults.headers);
		}
	},
	data() {
		return {
			tableData: [{
				date: '2016-05-03',
				name: '王小虎',
				province: '上海',
				city: '普陀区',
				address: '上海市普陀区金沙江路 1518 弄',
				zip: 200333
			}, {
				date: '2016-05-02',
				name: '王小虎',
				province: '上海',
				city: '普陀区',
				address: '上海市普陀区金沙江路 1518 弄',
				zip: 200333
			}, {
				date: '2016-05-04',
				name: '王小虎',
				province: '上海',
				city: '普陀区',
				address: '上海市普陀区金沙江路 1518 弄',
				zip: 200333
			}, {
				date: '2016-05-01',
				name: '王小虎',
				province: '上海',
				city: '普陀区',
				address: '上海市普陀区金沙江路 1518 弄',
				zip: 200333
			}]
		}
	},
	created: function() {
		http.get('api/infomation/list').then((res) => {
			axios.defaults.headers.projectId = "4535645";
			console.log(res);
			this.tableData = res.data.data;
		})
	}
}
