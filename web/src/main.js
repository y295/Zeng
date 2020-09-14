// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import '../node_modules/element-ui/lib/theme-chalk/index.css'
import router from './router'
import App from './App'
import http from './http'
import 'babel-polyfill'
import store from './store'
import common from '@/common/common.js'

Vue.config.productionTip = false

Vue.prototype.$http = http
Vue.prototype.common= common

Vue.use(ElementUI)

/* eslint-disable no-new */
var vue = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

export default vue
