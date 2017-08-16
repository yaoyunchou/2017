
<script>
import TableCtrl from '@/components/TableCtrl'
import renderCell from '../../cells'
/**
 * 默认的table结构
 * 1.要与传入的数据结构做对应，传入的数据是一个见的数据结构，这里要做对应的映射
 */
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
		domain:'group',
		children:[{
			
		}],
		props: {
			label: '操作',
			width: '100'
		},
	}
	]
}

export default {
	methods: {
		/**
		 * 
		 */
		test(params) {
			return () => {
				console.log(params)
			}
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
		},
		renderInputRow(h, context){										
			return (<el-button type="text" on-click={this.test(context.row)}  size="small">查看</el-button>);
		}
	},
	render(h) {
		const that = this;
		
		// 对配置文件进行处理
		return h(tableConfig.table.name, {
			props: {
				data: this[tableConfig.table.data]
			}
		},
			tableConfig.tableColumn.map((data)=> {
				 renderCell(h, that, data)
				if (data.domain) {
					return h(data.name, {
						props: data.props,
					}, [
							self => {
								return (
									<div>
										{that.renderInputRow(h, self)}
										<el-button type="text" size="small">编辑</el-button>
									</div>
								)
							}
						])
				} else {
					return h(data.name, {
						props: data.props,
						attrs: data.attrs
					})
				}

			})
		)
	},
	props:['tableData','tableConfig']
}

</script>
