'use strict'

import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import Buefy from 'buefy'
import './assets/scss/app.scss'
import VueTouchKeyboard from 'vue-touch-keyboard'
import 'vue-touch-keyboard/dist/vue-touch-keyboard.css'
const _ = require('lodash')
Object.defineProperty(Vue.prototype, '$_', { value: _ })

Vue.use(VueTouchKeyboard)
Vue.use(Buefy)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App),
  data() {
    return {
      idleTime: 0,
      idleInterval: null,
      settings: { timeout: 30 },
      isSlideshow: false,
    }
  },
  mounted() {
    this.idleInterval = setInterval(this.doTimer, 1000)
    window.addEventListener('mousemove', () => {
      this.idleTime = 0
    })
    window.addEventListener('click', () => {
      this.idleTime = 0
    })
    window.addEventListener('touchstart', () => {
      this.idleTime = 0
    })
  },
  methods: {
    doTimer: function() {
      var countTime
      if (this.settings.timeout > 0) {
        this.idleTime++
        if (this.idleTime > this.settings.timeout) {
          countTime = this.settings.timeout - this.idleTime
          if (countTime <= 0) {
            if (!this.isSlideshow) router.push({ name: 'Slideshow' })
            this.idleTime = 0
          }
        }
      } else this.idleTime = 0
    },
  },
}).$mount('#app')
