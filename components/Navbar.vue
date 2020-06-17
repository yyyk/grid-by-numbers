<template>
  <div class="nav">
    <v-app-bar app absolute flat>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>
        <nuxt-link to="/" exact class="text--primary header-title-link">
          Grid By Numbers
        </nuxt-link>
      </v-toolbar-title>
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
    drawer: false
  }),
  computed: {
    ...mapGetters(['menu'])
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
