<template>
  <v-app dark>
    <Navbar />
    <v-main :style="{ backgroundColor: dark ? '#f5f5f5' : '#272727' }">
      <nuxt />
    </v-main>
    <v-footer app absolute inset style="width: auto">
      <v-col class="text-center" cols="12"
        >&copy; {{ new Date().getFullYear() }} - Grid By Numbers</v-col
      >
    </v-footer>
    <v-btn
      fab
      small
      :light="!dark"
      :dark="dark"
      class="toggle"
      aria-label="Toggle Dark Mode"
      @click="toggleDark"
    >
      <v-icon :light="!dark" :dark="dark">mdi-television</v-icon>
    </v-btn>
  </v-app>
</template>

<script>
import Navbar from '@/components/Navbar'

export default {
  components: {
    Navbar
  },
  data() {
    return {
      dark: true
    }
  },
  created() {
    this.$vuetify.theme.dark = false
  },
  methods: {
    toggleDark() {
      this.$vuetify.theme.dark = this.dark
      this.dark = !this.dark
    }
  }
}
</script>

<style lang="scss" scoped>
.toggle {
  z-index: 10;
  position: fixed;
  right: 16px;
  bottom: 10px;
}
</style>
