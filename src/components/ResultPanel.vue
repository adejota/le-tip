<template>
  <v-container class="px-6 pt-4 pb-6">
    <v-row class="text-center">
      <v-col cols="12">
        <div>
          <p class="ma-0 mb-2">Conta</p>
          <span data-testid="current-moeda-sinal" class="text-h6 mr-2 primary--text">{{ getCurrentMoeda.sinal }}</span>
          <span class="text-h6">{{ getValor.toFixed(2) }}</span>
        </div>

        <div class="mt-8">
          <p class="ma-0 mb-2">Gorjeta</p>
          <span class="text-h6 mr-2 primary--text">{{ getCurrentMoeda.sinal }}</span>
          <span class="text-h6">{{ calcGorjeta.toFixed(2) }}</span>
        </div>

        <div class="mt-8">
          <p class="ma-0 mb-2">Total</p>
          <span class="text-h6 mr-2 primary--text">{{ getCurrentMoeda.sinal }}</span>
          <span class="text-h6">{{ calcTotal.toFixed(2) }}</span>
        </div>

        <div class="mt-8">
          <p class="ma-0 mb-2">por Pessoa</p>
          <span class="text-h6 mr-2 primary--text">{{ getCurrentMoeda.sinal }}</span>
          <span class="text-h6">{{ calcPorPessoa.toFixed(2) }}</span>
        </div>

        <div data-testid="calc-em-reais-container" class="mt-8">
          <p class="ma-0 mb-2">em R$</p>
          <span class="text-h6 mr-2 primary--text">R$</span>
          <span class="text-h6">{{ isNaN(calcEmReais) ? calcEmReais : calcEmReais.toFixed(2) }}</span>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ResultPanel',

  computed: {
    ...mapGetters(['getCurrentMoeda', 'getValor', 'getGorjeta', 'getPessoas']),

    calcGorjeta() {
      return this.roundNumber(this.getValor * (this.getGorjeta / 100))
    },

    calcTotal() {
      return this.roundNumber(this.getValor + this.calcGorjeta)
    },

    calcPorPessoa() {
      return this.roundNumber(this.calcTotal / this.getPessoas)
    },

    calcEmReais() {
      if (!this.getCurrentMoeda || !this.getCurrentMoeda.quote) {
        return '. . .'
      }

      return this.roundNumber(this.calcPorPessoa * this.getCurrentMoeda.quote)
    }
  },

  methods: {
    roundNumber(num) {
      return Math.round((num + Number.EPSILON) * 100) / 100
    }
  }
}
</script>
