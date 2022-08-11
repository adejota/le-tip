<template>
  <v-container style="border: 2px solid black;">
    <v-row class="text-center">
      <v-col cols="12">
        
        <div class="d-flex align-center">
          <span
            @click="setMoeda(0)"
            class="mr-2 cursor-pointer"
          >
            EUR
          </span>

          <v-switch
            :input-value="getMoeda"
            @change="getMoeda === 0 ? setMoeda(1) : setMoeda(0)"
            :ripple="false"
            class="pa-0 ma-0"
            hide-details
          ></v-switch>

          <span
            @click="setMoeda(1)"
            class="ml-2 cursor-pointer"
          >
            USD
          </span>
        </div>

        <div class="d-flex align-center">
          <span class="mr-2">Valor</span>
          <span class="mr-2">{{ getCurrentMoeda.sinal }}</span>

          <v-text-field
            type="number"
            :value="getValor"
            @input="setValor($event)"
          />
        </div>

        <div>
          <div class="d-flex align-center">
            <span>Gorjeta</span>
            <span>{{ `${getGorjeta}%`}}</span>
          </div>

          <div class="d-flex align-center">
            <span>10</span>
            <v-slider
              :value="getGorjeta"
              @input="setGorjeta($event)"
              min="10"
              max="20"
              hide-details
            ></v-slider>
            <span>20</span>
          </div>
        </div>

        <div>
          <div class="d-flex align-center">
            <span>Pessoas</span>
            <span>{{ getPessoas }}</span>
          </div>

          <div class="d-flex align-center">
            <span>2</span>
            <v-slider
              :value="getPessoas"
              @input="setPessoas($event)"
              min="2"
              max="16"
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

  computed: {
    ...mapGetters(['getMoeda', 'getCurrentMoeda', 'getValor', 'getGorjeta', 'getPessoas'])
  },

  methods: {
    ...mapMutations(['setMoeda', 'setValor', 'setGorjeta', 'setPessoas'])
  }
}
</script>
