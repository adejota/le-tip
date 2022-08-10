<template>
  <v-container>
    <v-row>
      <v-col>
        <header-logo />
      </v-col>
    </v-row>

    <v-row>
      <v-col v-if="!isMobile || page === 1"
        cols="12" sm="12" md="12" lg="6" xl="6"
        class="animate__animated animate__slideInLeft animate__faster"
      >
        <input-panel />
      </v-col>

      <v-col v-if="!isMobile || (isMobile && page === 2)"
        sm="12" md="12" lg="6" xl="6"
        class="animate__animated animate__slideInRight animate__faster"
      >
        <result-panel />
      </v-col>
    </v-row>

    <v-btn v-if="isMobile"
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
import HeaderLogo from '../components/HeaderLogo'
import InputPanel from '../components/InputPanel'
import ResultPanel from '../components/ResultPanel'

export default {
  name: 'HomeView',

  components: {
    HeaderLogo, InputPanel, ResultPanel
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

  async created() {
    try {
      const res = await this.$axios.get('https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL')
      if (res) {
        console.log(res.data)
      }
    } catch (error) {
      console.log(error)
    }
  }
}
</script>
