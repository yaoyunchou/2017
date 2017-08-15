import Vue from 'vue'
Vue.component('test2', {
	render: function(createElement) {
		// `<div><slot :text="msg"></slot></div>`
		//return createElement('div', this.$slots.default)
		return createElement('div', [
			this.$scopedSlots.default({
				text: this.msg
			})
		])
		// return createElement('div', [
		// 	createElement('div', {

		// 		// pass `scopedSlots` in the data object
		// 		// in the form of { name: props => VNode | Array<VNode> }
		// 		scopedSlots: {
		// 			default: function(props) {
		//         console.log(props);
		// 				return createElement('span', props.text)
		// 			}
		// 		}
		// 	})
		// ])
	},
	props: ['msg']
})
