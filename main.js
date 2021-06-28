import Vue from 'vue'
import App from './App'

import uView from 'uview-ui'
Vue.use(uView)

import api from '@/api/index.js'
Vue.config.productionTip = false
Vue.prototype.$api = api

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
