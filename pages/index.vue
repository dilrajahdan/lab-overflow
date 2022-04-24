<template>
  <div class="">
    <v-sheet
      class="deep-purple white--text d-flex flex-column justify-center py-3"
    >
      <v-container class="">
        <v-row class="">
          <v-col cols="12" sm="6" md="8">
            <v-card-title>
              <h1 class="overline">Lab Overflow</h1>
            </v-card-title>
            <v-card-subtitle class="">
              <h2 class="display-1">
                Empowering cannabis testing labs to develop technology through
                collective knowledge
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
    <v-container>
      <v-row>
        <v-col cols="12" sm="6" class="fill-heightX">
          <v-card
            class="fill-heightX"
            to="/cannabis-testing-labs/canada/ontario/sigma-analytical-services"
          >
            <v-card-title>
              <h2 class="text-h6">Featured lab</h2>
            </v-card-title>
            <v-card-text>
              <v-img height="229" class="teal darken-4 white--text">
                <v-row align="end" justify="end" class="fill-height">
                  <v-col class="">
                    <v-card-subtitle class="overline pb-0"
                      >Toronto, Canada</v-card-subtitle
                    >
                    <v-card-title class="text-h3 py-0"
                      >Sigma Analytical Services</v-card-title
                    >
                  </v-col>
                </v-row>
              </v-img>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" to="/cannabis-testing-labs"
                >View all labs</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6" class="">
          <v-card class="">
            <v-card-title>
              <h2 class="text-h6">Latest jobs</h2>
            </v-card-title>
            <v-card-text>
              <template v-for="item in paidJobs">
                <live-preview
                  :key="`job-${item.id}`"
                  dense
                  :featured="true"
                  :to="`/job-board/${item.slug}`"
                  :job="item"
                  @click.native="openJob(item)"
                >
                </live-preview>
              </template>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" to="/job-board">View all jobs</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  asyncData({ store, route }) {
    // const paidJobs = await store.getters['jobs/getPaidJobs']
    //

    console.log(route)
    return {}
  },
  data() {
    return {
      // title: null,
      pageName: 'home',
      pageTitle: 'Lab Overflow',
      pageDescription:
        'Empowering cannabis testing labs to develop technology through collective knowledge',
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
          content: `${process.env.baseURL}/woman-coat.jpg`,
        },
        {
          hid: 't-type',
          name: 'twitter:card',
          content: `${process.env.baseURL}/woman-coat.jpg`,
        },
        {
          hid: 'og-url',
          property: 'og:url',
          content: `${process.env.baseURL}${this.$route.path}`,
        },
      ],
    }
  },
  computed: {
    paidJobs() {
      return this.$store.getters['jobs/getPaidJobs'].slice(0, 2)
    },
  },
}
</script>
