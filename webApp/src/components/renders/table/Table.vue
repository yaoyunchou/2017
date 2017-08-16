
<script>
import TableCtrl from '@/components/TableCtrl'
import {configExtend,renderTable} from './table.render'
/**
 * 默认的table结构
 * 1.要与传入的数据结构做对应，传入的数据是一个见的数据结构，这里要做对应的映射
 */

export default {
	methods: {
		/**
		 * 对传入的数据进行封装
		 * 
		 */
		edit(params){
			return()=>{
				this.$emit('nsw_edit',params)
			}
		},
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
		}
	},
	render(h) {
		const that = this;
		// 对配置文件进行处理
        configExtend(this.config);
		return renderTable(h,that)
	},
	props:['tableData','config']
}

</script>
