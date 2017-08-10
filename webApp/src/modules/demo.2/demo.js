const element = require('./demo.html');

export default {
	template: element,
	data() {
		return {
			radio2: 3,
			aaa: 1
		}
	},
	render(createElement) {
		console.log(this);
		return createElement(
			'el-radio-group', // tag name 标签名称
			{
				props: {
					value: this.aaa
				},
				on: {
					input: e => this.aaa =e
					
				},
			}, [
				createElement('el-radio', {
					attrs: {
						label: 1
					}
				}, 'aaa'),
				createElement('el-radio', {
					attrs: {
						label: 2
					}
				}, 'rrr')
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
