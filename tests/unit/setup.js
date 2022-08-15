import Vue from 'vue'
import Vuetify from 'vuetify'
import VueMask from 'v-mask'

Vue.use(VueMask)
Vue.use(Vuetify)

var app = document.createElement('div')
app.setAttribute('data-app', true)
document.body.appendChild(app)
