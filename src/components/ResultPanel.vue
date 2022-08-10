<template>
  <v-container style="border: 2px solid black;">
    <v-row class="text-center">
      <v-col cols="12">
        <div>
          <p class="ma-0">Conta</p>
          <span>{{ `${getSinalMoeda} ${getValor.toFixed(2)}` }}</span>
        </div>

        <div>
          <p class="ma-0">Gorjeta</p>
          <span>{{ `${getSinalMoeda} ${getCalcGorjeta.toFixed(2)}` }}</span>
        </div>

        <div>
          <p class="ma-0">Total</p>
          <span>{{ `${getSinalMoeda} ${getCalcTotal.toFixed(2)}` }}</span>
        </div>

        <div>
          <p class="ma-0">por Pessoa</p>
          <span>{{ `${getSinalMoeda} ${getCalcPorPessoa.toFixed(2)}` }}</span>
        </div>

        <div>
          <p class="ma-0">em R$</p>
          <span>{{ `R$ ${getCalcGorjeta.toFixed(2)}` }}</span>
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
    ...mapGetters(['getSinalMoeda', 'getValor', 'getCalcGorjeta', 'getCalcTotal', 'getCalcPorPessoa'])
  },
}
</script>
