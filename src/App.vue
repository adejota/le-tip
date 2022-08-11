<template>
  <v-app>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import { mapMutations } from 'vuex'
import gql from 'graphql-tag'

export default {
  name: 'App',

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

  created() {
    this.setTheme()
  },

  methods: {
    ...mapMutations(['setQuote']),

    setTheme() {
			const colours = require('@/plugins/theme.js')
			this.$vuetify.theme.themes.light = colours.default
		},
  }
}
</script>

<style>
.cursor-pointer {
  cursor: pointer;
}
</style>

