<template>
  <v-app>
    <v-main>
      <router-view/>
    </v-main>

    <app-footer />
  </v-app>
</template>

<script>
import AppFooter from '@/components/AppFooter'
import { mapMutations } from 'vuex'
import gql from 'graphql-tag'

export default {
  name: 'App',

  components: { AppFooter },

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
#app {
  font-family: 'Nunito Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-tap-highlight-color: rgba(0,0,0,0);
}

.cursor-pointer {
  cursor: pointer;
}
</style>

