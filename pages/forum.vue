<template>
  <article>
    <v-sheet
      class="deep-purple white--text d-flex flex-column justify-center py-3"
    >
      <v-container class="">
        <v-row class="">
          <v-col cols="12" md="8">
            <v-card-title>
              <h1 class="overline">Forum</h1>
            </v-card-title>
            <v-card-subtitle class="">
              <h2 class="display-1">
                Finally, a place for cannabis scientists to engage in open
                discussion
              </h2>
            </v-card-subtitle>

            <h1 class="display-1 mb-6 display-1"></h1>
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>

    <v-container class="mt-2">
      <subscribe-to-jobs></subscribe-to-jobs>
    </v-container>
    <v-container class="">
      <v-row>
        <v-col cols="12" sm="8">
          <v-card>
            <v-card-text>
              <p class="body-1 mt-4 text-h5">
                Currently, there exists no unified standardization in the
                industry which can lead to inconsistent results, questionable
                practices, and confusion for labs and clients alike.
              </p>

              <p>
                Our forum advocates for open anonymous communication between
                cannabis testing labs in order to improve transparency, testing
                methodologies, and quality control within the industry.
              </p>

              <p>
                We at Lab Overflow believe that by sharing information and
                collaborating, we can help to create a stronger, more reliable
                cannabis testing ecosystem for everyone involved.
              </p>

              <v-btn color="primary" href="https://forum.laboverflow.com"
                >Take me to the forum</v-btn
              >
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="4">
          <share-the-love-card
            :url="`https://laboverflow.com${$route.path}`"
            :title="pageTitle"
            :description="pageDescription"
            hashtags="forum,cannabis,testing,lab,laboverflow"
          ></share-the-love-card>
        </v-col>
      </v-row>
    </v-container>
  </article>
</template>

<script>
import ogImage from '@/assets/img/laboverflow-bg.png'
// import ShareButtons from '~/components/ShareButtons.vue'

export default {
  components: {},
  data() {
    return {
      pageName: 'forum',
      pageTitle: 'Forum',
      pageDescription:
        'Finally, a place for cannabis scientists to engage in open discussion',
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
  mounted() {
    // console.log('asyncData', window.location)
    // return store.dispatch('fetchJob', route.params.slug)
  },
}
</script>
