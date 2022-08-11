import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import apolloProvider from './plugins/apollo'
import vuetify from './plugins/vuetify'
import 'animate.css'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  apolloProvider,
  vuetify,
  render: h => h(App)
}).$mount('#app')
