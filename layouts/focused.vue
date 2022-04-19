<template>
  <v-app dark>
    <app-header no-links></app-header>

    <v-main class="grey lighten-4">
      <Nuxt />
    </v-main>

    <app-footer></app-footer>
  </v-app>
</template>

<script>
export default {
  transition: 'fade',
  data() {
    return {}
  },
}
</script>
