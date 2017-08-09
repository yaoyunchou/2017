const element = require('./demo.html');

export default {
	template: element,
	data() {
		return {
			aaa: true,
			// 和`v-bind:class`一样的 API
			'class': {
				foo: true,
				bar: false
			},
			// 和`v-bind:style`一样的 API
			style: {
				color: 'red',
				fontSize: '14px'
			},
			// 正常的 HTML 特性
			attrs: {
				id: 'foo'
			},
			// 组件 props
			props: {
				myProp: 'bar'
			},
			// DOM 属性
			domProps: {
				innerHTML: 'baz'
			},
			// 事件监听器基于 `on`
			// 所以不再支持如 `v-on:keyup.enter` 修饰器
			// 需要手动匹配 keyCode。
			on: {
				click: this.clickHandler
			},
			// 仅对于组件，用于监听原生事件，而不是组件内部使用 `vm.$emit` 触发的事件。
			nativeOn: {
				click: this.nativeClickHandler
			},
			// 自定义指令. 注意事项：不能对绑定的旧值设值
			// Vue 会为您持续追踪
			directives: [{
				name: 'my-custom-directive',
				value: '2',
				expression: '1 + 1',
				arg: 'foo',
				modifiers: {
					bar: true
				}
			}],
			// Scoped slots in the form of
			// { name: props => VNode | Array<VNode> }
			scopedSlots: {
				default: props => createElement('span', props.text)
			},
			// 如果组件是其他组件的子组件，需为 slot 指定名称
			slot: 'name-of-slot',
			// 其他特殊顶层属性
			key: 'myKey',
			ref: 'myRef'
		}
	},
	render(createElement) {
		return createElement(
			'el-radio', // tag name 标签名称
			{
				attrs: {
					label: 'SSS'
				},
				props: {
					'v-model': 'aaa'
				}
			},
			this.$slots.default // 子组件中的阵列
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
