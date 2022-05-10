<template>
  <v-app dark>
    <app-header></app-header>
    <v-main class="grey lighten-4">
      <Nuxt />
    </v-main>

    <feedback-button></feedback-button>
    <app-footer></app-footer>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  transition: 'fade',
}
</script>
