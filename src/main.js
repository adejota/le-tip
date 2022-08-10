import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import http from './plugins/axios'
import vuetify from './plugins/vuetify'
import 'animate.css'

Vue.prototype.$axios = http
Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
