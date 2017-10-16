import element from './form.html';
import http from '@/services/http';
import axios from 'axios'
import weui from '@/services/weui/weui.js';
import Vue from 'vue';
console.log(weui);


export default {
	template: element,
	methods: {
		eidt:function(id){
			this.$router.push({ name: 'RssDetail', params: { id: id }})
		},
		handleClick(id) {
			weui.picker([{
					label: '飞机票',
					value: 0,
					disabled: true // 不可用
				},
				{
					label: '火车票',
					value: 1
				},
				{
					label: '汽车票',
					value: 3
				},
				{
					label: '公车票',
					value: 4,
				}
			], {
				className: 'custom-classname',
				defaultValue: [3],
				onChange: function(result) {
					console.log(result)
				},
				onConfirm: function(result) {
					console.log(result)
				},
				id: 'singleLinePicker'
			});
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
