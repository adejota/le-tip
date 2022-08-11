import Vue from 'vue'
import VueApollo from 'vue-apollo'
import ApolloClient from 'apollo-boost'

const apolloClient = new ApolloClient({
  uri: 'https://swop.cx/graphql?api-key=4dd04f3112b700404ce92423b85bd8963b085813bc24deaea39e3bd0dac0d711'
})

Vue.use(VueApollo)

export default new VueApollo({
    defaultClient: apolloClient,
})