import { mount, createLocalVue } from '@vue/test-utils'
import Rectangle from '@/components/svg/Rectangle.vue'
import { RectTagAttr } from '@/types/svg/Rectangle'

const localVue = createLocalVue()

describe('Renderer.vue', () => {
  const mountFunction = (options = {}) => {
    return mount(Rectangle, {
      localVue,
      ...options
    })
  }

  it('renders correctly', () => {
    const wrapper = mountFunction({
      propsData: {
        attributes: {
          id: '0',
          tag: 'rectangle'
        } as RectTagAttr
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('exists', () => {
    const wrapper = mountFunction({
      propsData: {
        attributes: {
          id: '0',
          tag: 'rectangle'
        } as RectTagAttr
      }
    })
    expect(wrapper.exists()).toBe(true)
  })

  // TODO: computed
})
