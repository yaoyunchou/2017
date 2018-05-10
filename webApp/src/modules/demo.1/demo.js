import TableCtrl from '@/components/TableCtrl'
import '@/components/test.js'
export default {

	data: () => {
		return {
			level: 1,
			
		}
	},
	render: function(createElement) {
		return createElement(
			'h' + this.level, // tag name 标签名称，
			{
				attrs: {
					id: 'foo'
				}
			}, [
				'先写一些文字',
				createElement('div', {
					scopedSlots: {
						default: props => createElement('span', props.text)
					},
					// 如果组件是其他组件的子组件，需为 slot 指定名称
					slot: 'table-ctrl'
				}),
				createElement('div', ['我是链接',

					createElement('a', {
						attrs: {
							href: "http://www.baidu.com",
						}
					}, 'aaa')
				])
			]
		)
	},
	methods: {
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