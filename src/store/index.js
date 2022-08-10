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
      { id: 0, moeda: 'EUR', sinal: '€'},
      { id: 1, moeda: 'USD', sinal: '$'},
    ],
    valor: 0,
    gorjeta: 10,
    pessoas: 2,
  },

  getters: {
    getMoeda: state => state.moeda,
    getSinalMoeda: state => state.moedas.find(m => m.id === state.moeda).sinal,
    getValor: state => state.valor,
    getGorjeta: state => state.gorjeta,
    getPessoas: state => state.pessoas,
    getCalcGorjeta: state => state.valor * (state.gorjeta / 100),
    getCalcTotal: (state, getters) => state.valor + getters.getCalcGorjeta,
    getCalcPorPessoa: (state, getters) => getters.getCalcTotal / state.pessoas,
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
  },

  plugins: [vuexLocal.plugin],
})
