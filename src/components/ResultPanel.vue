<template>
  <v-container style="border: 2px solid black;">
    <v-row class="text-center">
      <v-col cols="12">
        <div>
          <p class="ma-0">Conta</p>
          <span>{{ `${getCurrentMoeda.sinal} ${getValor.toFixed(2)}` }}</span>
        </div>

        <div>
          <p class="ma-0">Gorjeta</p>
          <span>{{ `${getCurrentMoeda.sinal} ${calcGorjeta.toFixed(2)}` }}</span>
        </div>

        <div>
          <p class="ma-0">Total</p>
          <span>{{ `${getCurrentMoeda.sinal} ${calcTotal.toFixed(2)}` }}</span>
        </div>

        <div>
          <p class="ma-0">por Pessoa</p>
          <span>{{ `${getCurrentMoeda.sinal} ${calcPorPessoa.toFixed(2)}` }}</span>
        </div>

        <div>
          <p class="ma-0">em R$</p>
          <span>{{ `R$ ${calcEmReais.toFixed(2)}` }}</span>
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
      return this.getValor * (this.getGorjeta / 100)
    },

    calcTotal() {
      return this.getValor + this.calcGorjeta
    },

    calcPorPessoa() {
      return this.calcTotal / this.getPessoas
    },

    calcEmReais() {
      return this.calcPorPessoa * this.getCurrentMoeda.quote
    }
  },
}
</script>
