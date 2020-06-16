<template>
  <v-container>
    <v-layout column justify-start align-stretch>
      <v-flex xs12 sm12 md12>
        <nuxt-content v-if="doc" :document="doc" />
        <Pager :prev="prev" :next="next" />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import Editor from '@/components/Editor.vue'
import Pager from '@/components/Pager.vue'

export default Vue.extend({
  components: {
    // eslint-disable-next-line vue/no-unused-components
    Editor,
    Pager
  },
  async asyncData({ $content }) {
    const slug = 'index'
    const [prev, next] = await $content('')
      .only(['title', 'path'])
      .sortBy('page')
      .surround(slug)
      .fetch()
    const doc = await $content(slug).fetch()
    return {
      doc,
      prev,
      next
    }
  }
})
</script>
