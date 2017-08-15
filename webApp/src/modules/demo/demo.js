const element = require('./demo.html');
import NswTable from '@/components/Table'
export default {
	template: element,
	components:{NswTable},
	data() {
		return {
			radio2: 3,
			aaa: 1
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
