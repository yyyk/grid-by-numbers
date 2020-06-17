<template>
  <v-container fill-height>
    <v-snackbar
      v-model="snackbar"
      :timeout="snackbarTimeout"
      top
      :color="success ? 'success' : 'error'"
    >
      <span>{{ snackbarText }}</span>
      <template v-slot:action="{ attrs }">
        <v-btn color="white" text v-bind="attrs" aria-label="Close" @click="snackbar = false">Close</v-btn>
      </template>
    </v-snackbar>
    <v-layout column justify-center align-center>
      <Editor ref="editor" :focused="true" :value="localCode" @compiled="onEditorCompiled" />
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions, mapGetters } from 'vuex'
import Editor from '@/components/Editor.vue'

export default Vue.extend({
  components: {
    Editor
  },
  data: () => ({
    snackbar: false,
    success: true,
    snackbarTimeout: 4000,
    snackbarText: '',
    localCode: ''
  }),
  computed: {
    ...mapGetters(['code'])
  },
  created() {
    this.localCode = this.code
  },
  mounted() {
    this.$nuxt.$on('compile', () => {
      if (this.$refs.editor) {
        const message = (this.$refs.editor as any).compile()
        this.onEditorCompiled(message)
      }
    })
  },
  beforeDestroy() {
    if (this.$refs.editor) {
      this.updateCode((this.$refs.editor as any).getCode())
    }
    this.$nuxt.$off('compile')
  },
  methods: {
    ...mapActions(['updateCode']),
    onEditorCompiled(message: { success: boolean; message: string }) {
      this.snackbar = false
      this.$nextTick(() => {
        this.snackbar = true
        this.snackbarText = message.message
        this.snackbarTimeout = message.success ? 4000 : 0
        this.success = message.success
      })
    }
  },
  head() {
    return {
      title: 'Code Editor'
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
