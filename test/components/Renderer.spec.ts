import { mount, createLocalVue } from '@vue/test-utils'
import Renderer from '@/components/Renderer.vue'
import { GridData } from '@/types/Renderer'

const localVue = createLocalVue()

describe('Renderer.vue', () => {
  const mountFunction = (options = {}) => {
    return mount(Renderer, {
      localVue,
      ...options
    })
  }

  it('renders correctly', () => {
    const wrapper = mountFunction({
      propsData: {
        gridData: {
          id: '0',
          tag: 'group',
          children: []
        } as GridData
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('exists', () => {
    const wrapper = mountFunction({
      propsData: {
        gridData: {
          id: '0',
          tag: 'group',
          children: []
        } as GridData
      }
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('sets viewBox', () => {
    const wrapper = mountFunction({
      data: () => ({
        margin: {
          top: 80,
          bottom: 60,
          left: 60,
          right: 60
        }
      }),
      propsData: {
        width: 1000,
        height: 1000,
        gridData: {
          id: '0',
          tag: 'group',
          children: []
        } as GridData
      }
    })
    expect(wrapper.attributes('viewBox')).toBe('0 0 1120 1140')
  })

  // TODO: axises
})
