import Vue from 'vue'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import { mount, createLocalVue, RouterLinkStub } from '@vue/test-utils'
import Navbar from '@/components/Navbar.vue'
import { MenuLink } from '@/types/Menu'

Vue.use(Vuetify)

const localVue = createLocalVue()
localVue.use(Vuex)

const store = new Vuex.Store({
  state: {
    menu: [
      {
        title: 'title1',
        path: '/index'
      },
      {
        title: 'title2',
        path: '/path2'
      },
      {
        title: 'title3',
        path: '/path3'
      }
    ] as MenuLink[]
  },
  getters: {
    menu: (state) => state.menu
  }
})

describe('Navbar.vue', () => {
  let vuetify: any

  const mountFunction = (options = {}) => {
    return mount(Navbar, {
      store,
      localVue,
      vuetify,
      stubs: { NuxtLink: RouterLinkStub },
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

  it('should have nav css class', () => {
    const wrapper = mountFunction()
    const parentDiv = wrapper.find('.nav')
    expect(parentDiv.exists()).toBe(true)
  })

  it('should have a title link', () => {
    const wrapper = mountFunction()

    const title = wrapper.find('.header-title-link')
    expect(title.exists()).toBe(true)
  })

  describe('Nav drawer', () => {
    it('should have drawer closed by default', () => {
      const wrapper = mountFunction()
      expect(wrapper.vm.$data.drawer).toBe(false)
    })

    it('should open when .v-app-bar__nav-icon is clicked', async () => {
      const wrapper = mountFunction()
      wrapper.setData({
        drawer: false
      })
      const btn = wrapper.find('.v-app-bar__nav-icon')
      await btn.trigger('click')
      expect(wrapper.vm.$data.drawer).toBe(true)
    })

    it('should have a title', () => {
      const wrapper = mountFunction()

      const title = wrapper.find('.v-navigation-drawer .nav-drawer-header')
      expect(title.exists()).toBe(true)
    })

    it('should have .link-text if menu is not empty', () => {
      const wrapper = mountFunction()
      const links = wrapper.findAll('.v-navigation-drawer .link-text')
      expect(links.length).toBeGreaterThan(0)
    })

    it("should have .link-text replace '/index' with '/'", () => {
      const wrapper = mountFunction()
      const link = wrapper.findAll('.v-navigation-drawer .link-text').at(0)
      expect(link.props('to')).toBe('/')
    })
  })
})
