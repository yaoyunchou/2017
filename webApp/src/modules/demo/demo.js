const element = require('./demo.html');
import {NswTable} from '@/components/renders'
export default {
	template: element,
	components:{NswTable},
	data() {
		return {
			radio2: 3,
			aaa: 1,
			dataList: [{
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
			}],
			table: [{
				type:'selection',
				width: '55'
			},{
				prop: 'date',
				label: '日期',
				width: '150'
			},
			{
				prop: 'name',
				label: '姓名',
				width: '550'
			}
			,
			{
				type: 'button',
				children: [{
					label:'查看',
					handler:'edit'
				}
				,{
					label:'编辑',
					ctrlFn(context,params){ return ()=>{context.$emit('nsw_edit',{params})}}
				}
				],
				label: '操作',
				width: '100'
				
			}
			]
		}
	},
	methods: {
		edit(data){
			console.log(data);	
		},
		randomIndex: function() {
			return Math.floor(Math.random() * this.items.length)
		},
		add: function() {
			this.items.splice(this.randomIndex(), 0, this.nextNum++)
		},
		remove: function() {
			this.items.splice(this.randomIndex(), 1)
		},
	}
}
