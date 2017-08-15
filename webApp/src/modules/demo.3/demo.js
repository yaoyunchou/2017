import TableCtrl from '@/components/TableCtrl'

import element from './demo.html'
import  '@/components/test.1.js'
import '@/components/test.2.js'
export default {
	template:element,
	data: () => {
		return {
			text:'dd',
			msg:'你好！',
			value2:2
		}
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
