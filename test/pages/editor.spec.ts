import Vue from 'vue'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import Editor from '@/pages/editor.vue'

Vue.use(Vuetify)

const localVue = createLocalVue()
localVue.use(Vuex)

const store = new Vuex.Store({
  state: {
    code: ''
  },
  getters: {
    code: (state) => state.code
  },
  actions: {
    updateCode: jest.fn()
  }
})

describe('editor.vue', () => {
  let vuetify: any

  const mountFunction = (options = {}) => {
    return shallowMount(Editor, {
      localVue,
      store,
      vuetify,
      mocks: {
        $nuxt: {
          $on: jest.fn(),
          $off: jest.fn()
        }
      },
      ...options
    })
  }

  beforeEach(() => {
    vuetify = new Vuetify()
  })

  it('renders correctly', () => {
    const wrapper = mountFunction()
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('exists', () => {
    const wrapper = mountFunction()
    expect(wrapper.exists()).toBe(true)
  })
})
