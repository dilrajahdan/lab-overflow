<template>
  <article>
    <v-sheet
      class="deep-purple white--text d-flex flex-column justify-center py-3"
    >
      <v-container class="">
        <v-row class="">
          <v-col cols="12" md="8">
            <v-card-title>
              <h1 class="overline">Contact</h1>
            </v-card-title>
            <v-card-subtitle class="">
              <h2 class="display-1">
                We love to talk with cannabis businesses.
              </h2>
            </v-card-subtitle>
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>

    <v-container class="mt-2">
      <subscribe-to-jobs></subscribe-to-jobs>
      <v-row align="center">
        <v-col cols="12" sm="8">
          <p class="body-1 mt-4 text-h5">
            <a
              href="mailto:eric.burton.martin@gmail.com?subject=Laboverflow science"
              >Contact Eric for the science
            </a>
          </p>

          <p class="body-1 mt-4 text-h5">
            <a
              href="mailto:dilrajahdan@gmail.com?subject=Laboverflow advertizing"
              >Contact Dil for advertising</a
            >
          </p>
        </v-col>
      </v-row>
    </v-container>
  </article>
</template>

<script>
import ogImage from '@/assets/img/laboverflow-bg.png'

export default {
  data() {
    return {
      pageName: 'contact',
      pageTitle: 'Contact',
      pageDescription: 'We love to talk with cannabis businesses.',
    }
  },
  head() {
    return {
      title: this.pageTitle,
      meta: [
        {
          hid: this.pageName,
          name: this.pageTitle,
          content: this.pageDescription,
        },
        { hid: 'og-type', property: 'og:type', content: 'website' },
        { hid: 'og-title', property: 'og:title', content: this.pageTitle },
        {
          hid: 'og-desc',
          property: 'og:description',
          content: this.pageDescription,
        },
        {
          hid: 'og-image',
          property: 'og:image',
          content: `${process.env.baseURL}${ogImage}`,
        },
        {
          hid: 't-type',
          name: 'twitter:card',
          content: `${process.env.baseURL}${ogImage}`,
        },
        {
          hid: 'og-url',
          property: 'og:url',
          content: `${process.env.baseURL}${this.$route.path}`,
        },
      ],
    }
  },
}
</script>
