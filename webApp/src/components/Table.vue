
<script>
import TableCtrl from '@/components/TableCtrl'
var tableConfig = {
	table: {
		name: 'el-table',
		data: 'tableData'
	},
	tableColumn: [{
		name: 'el-table-column',
		props: {
			prop: 'date',
			label: '日期',
			width: '150'
		},
	}, {
		name: 'el-table-column',
		props: {
			prop: 'name',
			label: '姓名',
			width: '550'
		},
	}
		, {
		name: 'el-table-column',
		slot: 'TableCtrl',
		props: {
			label: '操作',
			width: '100'
		},
	}
	]
}
export default {
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
	render: function (createElement) {
		let self = this;
		return createElement(tableConfig.table.name, {
			props: {
				data: this[tableConfig.table.data]
			}
		},
			tableConfig.tableColumn.map(function (data) {
				if (data.slot) {
					console.log(data.slot)
					return createElement(data.name, {
						props: data.props,
					}, [
						createElement('div', [
							self.$scopedSlots.default({
								text: self.msg
							})
						])
					])
				} else {
					return createElement(data.name, {
						props: data.props,
						attrs: data.attrs
					})
				}

			})
		)
	},
	methods: {
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
					onChange: function (result) {
						console.log(result)
					},
					onConfirm: function (result) {
						console.log(result)
					},
					id: 'singleLinePicker'
				});
			console.log(id);
			console.log(axios.defaults.headers);
		}
	}
}

</script>
