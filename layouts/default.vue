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
  mounted() {
    // console.log('LAYOUT: mounted')
    // Hotjar Tracking Code for https://laboverflow.com/
    //   ;(function (h, o, t, j, a, r) {
    //     h.hj =
    //       h.hj ||
    //       function () {
    //         ;(h.hj.q = h.hj.q || []).push(arguments)
    //       }
    //     h._hjSettings = { hjid: 2978923, hjsv: 6 }
    //     a = o.getElementsByTagName('head')[0]
    //     r = o.createElement('script')
    //     r.async = 1
    //     r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv
    //     a.appendChild(r)
    //   })(window, document, 'https://static.hotjar.com/c/hotjar-', '.js?sv=')
  },
}
</script>
