import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
})

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    moeda: 0,
    moedas: [
      { id: 0, moeda: 'EUR', sinal: '€', quote: 0 },
      { id: 1, moeda: 'USD', sinal: '$', quote: 0 },
    ],
    valor: 0,
    gorjeta: 10,
    pessoas: 2,
    eurQuote: 0,
    usdQuote: 0,
  },

  getters: {
    getMoeda: state => state.moeda,
    getCurrentMoeda: state => state.moedas.find(m => m.id === state.moeda),
    getValor: state => state.valor,
    getGorjeta: state => state.gorjeta,
    getPessoas: state => state.pessoas,
  },

  mutations: {
    setMoeda(state, payload) {
      state.moeda = payload
    },

    setValor(state, payload) {
      let value = !payload ? 0 : parseFloat(payload)
      if (value < 0) value *= -1
      state.valor = value 
    },

    setGorjeta(state, payload) {
      state.gorjeta = payload
    },

    setPessoas(state, payload) {
      state.pessoas = payload
    },

    setQuote(state, payload) {
      let index = state.moedas.findIndex(m => m.moeda === payload.moeda)
      state.moedas[index].quote = payload.quote
    },
  },

  plugins: [vuexLocal.plugin],
})
