import { shallowMount, createLocalVue } from '@vue/test-utils'
import Editor from '@/components/Editor.vue'

const localVue = createLocalVue()

describe('Editor.vue', () => {
  const mountFunction = (options = {}) => {
    return shallowMount(Editor, {
      localVue,
      ...options
    })
  }

  it('renders correctly', () => {
    const wrapper = mountFunction()
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('exists', () => {
    const wrapper = mountFunction()
    expect(wrapper.exists()).toBe(true)
  })

  it('should have c-editor css class', () => {
    const wrapper = mountFunction()
    const parentDiv = wrapper.find('.c-editor')
    expect(parentDiv.exists()).toBe(true)
  })

  it('should have editor-container and svg-container', () => {
    const wrapper = mountFunction()
    const editorContainer = wrapper.find('.editor-container')
    const svgContainer = wrapper.find('.svg-container')
    expect(editorContainer.exists()).toBe(true)
    expect(svgContainer.exists()).toBe(true)
  })

  describe('Props', () => {
    it('should hide editor when hideEditor is true', () => {
      const wrapper = mountFunction({
        propsData: {
          hideEditor: true
        }
      })
      const editorContainer = wrapper.find('.editor-container')
      expect(editorContainer.exists()).toBe(false)
    })
  })
})
