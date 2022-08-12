<template>
  <v-container class="px-6 py-4">
    <v-row>
      <v-col cols="12">
        <div class="d-flex align-center justify-center">
          <span
            @click="setMoeda(0)"
            class="text-h6 cursor-pointer"
          >
            EUR
          </span>

          <v-switch
            inset
            :input-value="getMoeda"
            @change="getMoeda === 0 ? setMoeda(1) : setMoeda(0)"
            :ripple="false"
            class="pa-0 ma-0 ml-5 mr-1"
            hide-details
          ></v-switch>

          <span
            @click="setMoeda(1)"
            class="text-h6 cursor-pointer"
          >
            USD
          </span>
        </div>

        <div class="d-flex align-center justify-center mt-8">
          <span class="mr-4">Valor</span>
          <span class="text-h6 mr-2 primary--text">{{ getCurrentMoeda.sinal }}</span>

          <v-text-field
            v-model="valor"
            class="text-h6 pa-0 ma-0"
            hide-details
            placeholder="0.00"
            v-mask="currencyMask"
            @input="setValor(valor)"
          />
        </div>

        <div>
          <div class="d-flex align-center mt-8">
            <span class="mr-4">Gorjeta</span>
            <span class="text-h6">{{ `${getGorjeta}%`}}</span>
          </div>

          <div class="d-flex align-center mt-2">
            <span>10</span>
            <v-slider
              :value="getGorjeta"
              @input="setGorjeta($event)"
              min="10"
              max="20"
              class="pa-0 ma-0"
              hide-details
            ></v-slider>
            <span>20</span>
          </div>
        </div>

        <div>
          <div class="d-flex align-center mt-8">
            <span class="mr-4">Pessoas</span>
            <span class="text-h6">{{ getPessoas }}</span>
          </div>

          <div class="d-flex align-center mt-2">
            <span>2</span>
            <v-slider
              :value="getPessoas"
              @input="setPessoas($event)"
              min="2"
              max="16"
              class="pa-0 ma-0"
              hide-details
            ></v-slider>
            <span>16</span>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'InputPanel',

  data() {
    return {
      valor: ''
    }
  },

  computed: {
    ...mapGetters(['getMoeda', 'getCurrentMoeda', 'getValor', 'getGorjeta', 'getPessoas']),

    currencyMask() {
      let length = this.valor.length
      return length > 4 ? `${'#'.repeat(length - 3)}.##` : '#.##'
    }
  },

  methods: {
    ...mapMutations(['setMoeda', 'setValor', 'setGorjeta', 'setPessoas'])
  }
}
</script>
