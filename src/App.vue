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

export default {
  name: 'App',

  components: { AppFooter },

  created() {
    this.setTheme()
  },

  methods: {
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

