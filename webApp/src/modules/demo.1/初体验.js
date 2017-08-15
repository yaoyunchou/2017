export default {
	data: () => {
		return {
			level: 1
		}
	},

	render: function(createElement) {
		return createElement(
			'h' + this.level, // tag name 标签名称
			{
				attrs: {
					id: 'foo'
				}
			}, [
				'先写一些文字',
				createElement('a', {
					attrs: {
						href: "http://www.baidu.com",
					}
				}, '我是链接'),
				createElement(MyComponent, {
					props: {
						someProp: 'foobar'
					}
				})
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
