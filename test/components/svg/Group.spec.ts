import { mount, createLocalVue } from '@vue/test-utils'
import Group from '@/components/svg/Group.vue'
import { GTagAttr } from '@/types/svg/Group'

const localVue = createLocalVue()

describe('Renderer.vue', () => {
  const mountFunction = (options = {}) => {
    return mount(Group, {
      localVue,
      ...options
    })
  }

  it('renders correctly', () => {
    const wrapper = mountFunction({
      propsData: {
        attributes: {
          id: '0',
          tag: 'group'
        } as GTagAttr
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('exists', () => {
    const wrapper = mountFunction({
      propsData: {
        attributes: {
          id: '0',
          tag: 'group'
        } as GTagAttr
      }
    })
    expect(wrapper.exists()).toBe(true)
  })

  // TODO: attributes.children child.tag
  // TODO: computed
})
