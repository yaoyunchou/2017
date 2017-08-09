import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
//import Demo from '@/modules/demo/demo.js'
const Demo = resolve => require(['@/modules/demo/demo.js'], resolve)
//import Form from '@/modules/form/form.js'
const Form = resolve => require(['@/modules/form/form.js'], resolve)
Vue.use(Router)

export default new Router({
	routes: [{
			path: '/',
			name: 'Hello',
			component: Hello
		}, {
			path: '/demo',
			name: 'Demo',
			component: Demo
		},
		{
			path: '/form',
			name: 'Form',
			component: Form
		}
	]
})
