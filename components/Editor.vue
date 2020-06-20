<template>
  <div ref="container" class="c-editor" :style="{ width: hideEditor ? '50%' : '100%' }">
    <div v-if="!hideEditor" class="editor-container">
      <div ref="editor" class="editor" />
    </div>
    <div class="svg-container" :style="{ width: hideEditor ? '100%' : '50%' }">
      <Renderer :width="width" :height="height" :grid-data="grid" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import Renderer from './Renderer.vue'
import { interpret, Output } from '@/lib/gbnscript/src'
import { GridData } from '@/types/Renderer'

// TODO:
// smaller screen layout

export default Vue.extend({
  components: {
    Renderer
  },
  props: {
    value: {
      type: String,
      default: '// enter program\n'
    } as PropOptions<string>,
    focused: {
      type: Boolean,
      default: false
    } as PropOptions<boolean>,
    compiled: {
      type: Boolean,
      default: false
    } as PropOptions<boolean>,
    readOnly: {
      type: Boolean,
      default: false
    } as PropOptions<boolean>,
    hideEditor: {
      type: Boolean,
      default: false
    } as PropOptions<boolean>
  },
  data: () => ({
    editor: null as any,
    fontSize: 16,
    width: 0,
    height: 0,
    grid: null as GridData | null,
    isCompiling: false
  }),
  created() {
    if (this.compiled) {
      this.compile(this.value)
    }
  },
  mounted() {
    if ((window as any).ace) {
      this.initEditor()
    }
  },
  beforeDestroy() {
    if (this.editor) {
      this.editor.destroy()
      this.editor.container.remove()
    }
  },
  methods: {
    getCode() {
      return (this.editor && this.editor.getValue()) || ''
    },
    initEditor() {
      this.editor = (window as any).ace.edit(this.$refs.editor as any)
      if (this.editor) {
        this.editor.$blockScrolling = Infinity
        this.editor.setFontSize(`${this.fontSize.toString()}px`)
        this.editor.setShowPrintMargin(false)
        this.editor.getSession().setUseWrapMode(true)
        this.editor.getSession().setUseSoftTabs(true)
        this.editor.getSession().setTabSize(2)
        this.editor.setValue(this.value)
        this.editor.execCommand('gotolineend')
        this.focused && this.editor.focus()

        if (!this.readOnly) {
          this.editor.commands.addCommand({
            name: 'compile',
            bindKey: { win: 'Ctrl-Enter', mac: 'Ctrl-Enter' }, // Command-Enter
            exec: () => {
              const message = this.compile()
              // console.log('message', message)
              this.$emit('compiled', message)
            }
          })
        }

        // command + to increase font size
        // this.editor.commands.addCommand({
        //   name: 'increaseFontSize',
        //   bindKey: { win: 'Ctrl-=', mac: 'Ctrl-=' },
        //   exec: () => {
        //     this.fontSize++
        //     this.editor &&
        //       this.editor.setFontSize(`${this.fontSize.toString()}px`)
        //     console.log('plus', this.fontSize)
        //   }
        // })
        // // command - to decrease font size
        // this.editor.commands.addCommand({
        //   name: 'decreaseFontSize',
        //   bindKey: { win: 'Ctrl--', mac: 'Ctrl--' },
        //   exec: () => {
        //     this.fontSize--
        //     this.editor &&
        //       this.editor.setFontSize(`${this.fontSize.toString()}px`)
        //     console.log('minus', this.fontSize)
        //   }
        // })

        if (this.readOnly) {
          // https://github.com/ajaxorg/ace/issues/266
          this.editor.setReadOnly(true)
          this.editor.setHighlightActiveLine(false)
          this.editor.setHighlightGutterLine(false)
          this.editor.renderer.$cursorLayer.element.style.opacity = 0
        }
      }
    },
    compile(value?: string) {
      if ((value || this.editor) && !this.isCompiling) {
        this.isCompiling = true
        this.$nuxt.$emit('disableCompileButton')
        const result: Output = interpret(
          value || (this.editor && this.editor.getValue()) || ''
        )
        this.isCompiling = false
        // console.log('result', result)
        if (result.success) {
          if (!result.data) {
            return {
              success: true,
              message: 'compiled.'
            }
          }
          if (result.data.grid) {
            this.grid = {
              id: 'root',
              tag: 'group',
              children: result.data.grid
            }
          }
          if (result.data.size) {
            this.width = result.data.size.width || 0
            this.height = result.data.size.height || 0
          }
          return {
            success: true,
            message: 'compile success!'
          }
        }
        // console.log('interpret:', interpret(this.editor.getValue()))
        if (result.error) {
          return {
            success: false,
            message: `[${result.error.type}]: ${result.error.message} at line ${result.error.line} column ${result.error.column}`
          }
        }
      }
      return {
        success: false,
        message: ''
      }
    }
  }
})
</script>

<style lang="scss">
.c-editor {
  width: 100%;
  height: 430px;
  max-width: 900px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: stretch;
  color: rgba(0, 0, 0, 0.87);
  margin: 0 auto;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);

  .editor-container {
    position: relative;
    width: 50%;
    height: 100%;
    margin: 0;
    left: 0;

    .editor {
      width: 100%;
      height: 100%;
      color: rgba(0, 0, 0, 0.87);
    }

    .ace_gutter {
      color: rgba(0, 0, 0, 0.87);
    }

    .ace_gutter-layer {
      width: 64px !important;
    }
  }

  .svg-container {
    position: relative;
    width: 50%;
    height: 100%;
    opacity: 1;
    background-color: #f0f0f0;
    overflow: hidden;
    display: flex;
    flex-flow: row;
    justify-content: center;
    align-items: flex-start;
  }
}

.v-application.theme--dark .c-editor {
  .editor {
    background-color: #2f2f2f;
    color: #eee;
  }

  .ace_gutter {
    background: #3e3e3e;
    color: #eee;
  }

  .ace_gutter-active-line {
    background-color: #2f2f2f;
  }

  .ace_marker-layer .ace_active-line {
    background: rgba(0, 0, 0, 0.2);
  }

  .svg-container {
    background: #3e3e3e;
  }
}
</style>
