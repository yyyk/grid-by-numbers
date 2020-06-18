<template>
  <div class="nav">
    <v-app-bar app absolute flat>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>
        <nuxt-link to="/" exact class="text--primary header-title-link">Grid By Numbers</nuxt-link>
      </v-toolbar-title>
      <v-spacer />
      <v-btn
        v-if="showEditorLink"
        depressed
        nuxt
        exact
        tag="a"
        color="primary"
        to="/editor"
        class="editor-link"
        aria-label="Link to Code Editor"
      >editor</v-btn>
      <v-btn
        v-if="showCompileButton"
        depressed
        color="primary"
        class="compile-button"
        aria-label="Compile Code"
        @click="onCompile"
      >compile</v-btn>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      app
      :disable-route-watcher="true"
      :disable-resize-watcher="true"
      floating
    >
      <v-list nav dense :expand="true">
        <v-subheader class="mt-2">
          <span class="nav-drawer-header">Table of Contents</span>
        </v-subheader>
      </v-list>
      <v-list-item
        v-for="(link, index) in menu"
        :key="index"
        nuxt
        exact
        :to="link.path === '/index' ? '/' : link.path"
        color="primary"
        class="link-text"
      >
        <v-list-item-content>
          <v-list-item-title v-text="link.title" />
        </v-list-item-content>
      </v-list-item>
    </v-navigation-drawer>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'

export default Vue.extend({
  data: () => ({
    drawer: false,
    showEditorLink: false,
    showCompileButton: false
  }),
  computed: {
    ...mapGetters(['menu'])
  },
  watch: {
    $route() {
      this.setButtonVisibility()
    }
  },
  created() {
    this.setButtonVisibility()
  },
  methods: {
    setButtonVisibility() {
      const fullPath = this.$route.fullPath
      if (fullPath && /^\/editor/i.test(fullPath)) {
        this.showEditorLink = false
        this.showCompileButton = true
      } else {
        this.showEditorLink = true
        this.showCompileButton = false
      }
    },
    onCompile() {
      this.$nuxt.$emit('compile')
    }
  }
})
</script>

<style lang="scss" scoped>
.header-title-link {
  text-decoration: none;
}

.link-text {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
