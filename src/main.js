import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import apolloProvider from './plugins/apollo'
import vuetify from './plugins/vuetify'
import VueMask from 'v-mask'
import 'animate.css'

Vue.use(VueMask)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  apolloProvider,
  vuetify,
  render: h => h(App)
}).$mount('#app')
