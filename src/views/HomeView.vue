<template>
  <v-container>
    <v-row>
      <v-col>
        <header-logo />
      </v-col>
    </v-row>

    <v-row>
      <v-col v-show="!isMobile || page === 1"
        cols="12" sm="12" md="12" lg="6" xl="6"
        class="animate__animated animate__slideInLeft animate__faster"
      >
        <input-panel />
      </v-col>

      <v-col v-show="!isMobile || (isMobile && page === 2)"
        sm="12" md="12" lg="6" xl="6"
        class="animate__animated animate__slideInRight animate__faster"
      >
        <result-panel />
      </v-col>
    </v-row>

    <v-btn data-testid="change-page-btn"
      v-if="isMobile"
      @click="page === 1 ? page = 2 : page = 1"
      large
      icon
      class="primary ma-6"
      style="position: absolute; bottom: 0; right: 0;"
    >
      <v-icon large color="white">
        {{ page === 1 ? 'mdi-chevron-right' : 'mdi-chevron-left' }}
      </v-icon>
    </v-btn>
  </v-container>
</template>

<script>
import { mapMutations } from 'vuex'
import HeaderLogo from '../components/HeaderLogo'
import InputPanel from '../components/InputPanel'
import ResultPanel from '../components/ResultPanel'
import gql from 'graphql-tag'

export default {
  name: 'HomeView',

  components: {
    HeaderLogo, InputPanel, ResultPanel
  },

  apollo: {
    latest: gql`query {
      latest(baseCurrency: "EUR", quoteCurrencies: ["BRL", "USD"]) {
        quoteCurrency
        quote
      }
    }`,
  },

  watch: {
    latest(value) {
      if (value) {
        const eurQuote = value.find(i => i.quoteCurrency === 'BRL').quote
        const usdQuote = eurQuote / value.find(i => i.quoteCurrency === 'USD').quote
        this.setQuote({ moeda: 'EUR', quote: eurQuote })
        this.setQuote({ moeda: 'USD', quote: usdQuote })
      }
    }
  },

  computed: {
    isMobile() {
      return this.$vuetify.breakpoint.mobile
    },
  },

  data() {
    return {
      page: 1,
    }
  },

  methods: {
    ...mapMutations(['setQuote']),
  }
}
</script>
