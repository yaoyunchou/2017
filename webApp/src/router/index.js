import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
//import Demo from '@/modules/demo/demo.js'
const Demo = resolve => require(['@/modules/demo/demo.js'], resolve)
//import Form from '@/modules/form/form.js'
const Form = resolve => require(['@/modules/form/form.js'], resolve)
const DemoRender = resolve => require(['@/modules/demo.1/demo.js'], resolve)
const DemoTest = resolve => require(['@/modules/demo.3/demo.js'], resolve)
const DemoForm = resolve => require(['@/modules/demo.4/demo.js'], resolve)
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
		},
		{
			path: '/demo-render',
			name: 'DemoRender',
			component: DemoRender
		},
		,
		{
			path: '/demo-test',
			name: 'DemoTest',
			component: DemoTest
		},
		{
			path: '/demo-form',
			name: 'DemoForm',
			component: DemoForm
		}
	]
})
