import { createLocalVue, mount } from '@vue/test-utils'
import Vuetify from 'vuetify'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import store from '@/store'
import VueMask from 'v-mask'
import HomeView from '@/views/HomeView'
import HeaderLogo from '@/components/HeaderLogo'
import InputPanel from '@/components/InputPanel'
import ResultPanel from '@/components/ResultPanel'
import AppFooter from '@/components/AppFooter'

const localVue = createLocalVue()
localVue.use(VueRouter)
localVue.use(Vuex)
localVue.use(VueMask)

describe('HomeView', () => {
  let router
  let vuetify

  beforeEach(() => {
    router = new VueRouter()
    vuetify = new Vuetify()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  const mountHomeView = () => {
    return mount(HomeView, {
      localVue,
      router,
      store,
      vuetify,
      mocks: {
        $vuetify: { breakpoint: {} },
      }
    })
  }

  it('should mount the component', () => {
    const wrapper = mountHomeView()
    expect(wrapper.vm).toBeDefined()
  })

  it('should mount the HeaderLogo component', async () => {
    const wrapper = mountHomeView()
    expect(wrapper.findComponent(HeaderLogo)).toBeDefined()
  })

  it('should mount the InputPanel component', async () => {
    const wrapper = mountHomeView()
    expect(wrapper.findComponent(InputPanel)).toBeDefined()
  })

  it('should mount the ResultPanel component', async () => {
    const wrapper = mountHomeView()
    expect(wrapper.findComponent(ResultPanel)).toBeDefined()
  })

  it('should mount the AppFooter component', async () => {
    const wrapper = mountHomeView()
    expect(wrapper.findComponent(AppFooter)).toBeDefined()
  })

  it('should do the "gorjeta" calculation correctly', async () => {
    const conta = 73.23
    const gorjeta = 13
    const pessoas = 10
    const gorgetaCalculada = 9.52
    
    store.commit('setValor', conta)
    store.commit('setGorjeta', gorjeta)
    store.commit('setPessoas', pessoas)
    
    const wrapper = mountHomeView()
    const calcGorjeta  = wrapper.findComponent(ResultPanel).vm.calcGorjeta
    expect(calcGorjeta).toBe(gorgetaCalculada)
  })

  it('should do the "total" calculation correctly', async () => {
    const conta = 73.23
    const gorjeta = 13
    const pessoas = 10
    const total = 82.75
    
    store.commit('setValor', conta)
    store.commit('setGorjeta', gorjeta)
    store.commit('setPessoas', pessoas)
    
    const wrapper = mountHomeView()
    const calcTotal  = wrapper.findComponent(ResultPanel).vm.calcTotal
    expect(calcTotal).toBe(total)
  })

  it('should do the "porPessoa" calculation correctly', async () => {
    const conta = 73.23
    const gorjeta = 13
    const pessoas = 10
    const porPessoa = 8.28
    
    store.commit('setValor', conta)
    store.commit('setGorjeta', gorjeta)
    store.commit('setPessoas', pessoas)

    const wrapper = mountHomeView()
    const calcPorPessoa  = wrapper.findComponent(ResultPanel).vm.calcPorPessoa
    expect(calcPorPessoa).toBe(porPessoa)
  })

  it('should do the "emReais" calculation correctly', async () => {
    const conta = 13
    const gorjeta = 15
    const pessoas = 2
    const eurQuote = 5.248422
    const emReais = 39.26
    
    store.commit('setValor', conta)
    store.commit('setGorjeta', gorjeta)
    store.commit('setPessoas', pessoas)
    store.commit('setQuote', { moeda: 'EUR', quote: eurQuote })

    const wrapper = mountHomeView()
    const container = wrapper.find('[data-testid="calc-em-reais-container"]')

    expect(container.text()).toContain(`R$ ${emReais}`)
  })

  it('should display the ResultPanel when arrow right button is clicked on InputPanel', async () => {
    const wrapper = mountHomeView()
    const button = wrapper.find('[data-testid="change-page-btn"]')

    await button.trigger('click')
    
    expect(wrapper.findComponent(ResultPanel).isVisible()).toBe(true)
  })

  it('should display the InputPanel when arrow left button is clicked on ResultPanel', async () => {
    const wrapper = mountHomeView()
    const button = wrapper.find('[data-testid="change-page-btn"]')

    await button.trigger('click')
    await button.trigger('click')
    
    expect(wrapper.findComponent(InputPanel).isVisible()).toBe(true)
  })

  it('should change the currency signal', async () => {
    const moeda = 1
    const sinal = '$'

    store.commit('setMoeda', moeda)

    const wrapper = mountHomeView()
    const currentMoedaSinal = wrapper.findComponent(ResultPanel).find('[data-testid="current-moeda-sinal"]')
    expect(currentMoedaSinal.text()).toBe(sinal)
  })
})
