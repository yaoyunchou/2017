// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './style/weui/weui.less'
import 'element-ui/lib/theme-default/index.css'


import ElementUI from 'element-ui'

//resolve => require(['element-ui/lib/theme-default/index.css'], resolve)
Vue.config.productionTip = false
Vue.use(ElementUI);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
