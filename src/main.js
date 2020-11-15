'use strict'

import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import Buefy from 'buefy'
import './assets/scss/app.scss'
import VueTouchKeyboard from 'vue-touch-keyboard'
import 'vue-touch-keyboard/dist/vue-touch-keyboard.css' // load default style

const _ = require('lodash')
Object.defineProperty(Vue.prototype, '$_', { value: _ })

Vue.use(VueTouchKeyboard)
Vue.use(Buefy)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
