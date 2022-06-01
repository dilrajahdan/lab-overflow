<template>
  <section>
    <v-card
      color="deep-purple"
      dark
      tile
      class="d-flex align-center flex-column py-3"
    >
      <v-container>
        <v-row>
          <v-col cols="12" md="8">
            <v-card-title>
              <h1 class="overline">Job board</h1>
            </v-card-title>
            <v-card-subtitle class="">
              <h2 class="display-1">
                The job board for lab professionals in the cannabis industry
              </h2>
            </v-card-subtitle>

            <!-- <v-card-text class="body-1">
              Make your next career move here
            </v-card-text> -->
          </v-col>
        </v-row>
      </v-container>
    </v-card>

    <v-container>
      <v-row class="mt-0 sticky-sm" style="z-index: 10">
        <v-col>
          <subscribe-to-jobs class=""></subscribe-to-jobs>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="3">
          <div class="sticky-sm">
            <v-card color="gray lighten-4" elevation="1">
              <v-card-subtitle>Filters</v-card-subtitle>
              <v-card-text>
                <v-autocomplete
                  v-model="selectedLocation"
                  :items="uniqueLocations"
                  hide-details
                  class="mb-4"
                  label="Location"
                  clearable
                  autocomplete="off"
                  data-lpignore="true"
                  outlined
                  dense
                  filled
                ></v-autocomplete>

                <v-autocomplete
                  v-model="selectedRole"
                  :items="uniqueRoles"
                  hide-details
                  class="mb-4"
                  clearable
                  label="Role"
                  autocomplete="off"
                  data-lpignore="true"
                  outlined
                  dense
                  filled
                ></v-autocomplete>

                <v-autocomplete
                  v-model="selectedType"
                  :items="uniqueTypes"
                  hide-details
                  label="Type"
                  clearable
                  autocomplete="off"
                  data-lpignore="true"
                  outlined
                  dense
                  filled
                ></v-autocomplete>
              </v-card-text>
            </v-card>

            <share-the-love-card
              class="mt-4"
              :url="`https://laboverflow.com${$route.path}`"
              :title="pageTitle"
              :description="pageDescription"
              hashtags="job-board,cannabis,testing,lab,laboverflow"
            ></share-the-love-card>
          </div>
        </v-col>

        <!-- Content -->
        <v-col cols="12" sm="9" class="mt-0 pt-sm-3 pt-0">
          <section class="job-details grey lighten-4">
            <!-- Paid jobs  -->
            <v-card>
              <v-card-title>Featured cannabis lab jobs</v-card-title>
              <v-card-text>
                <live-preview
                  v-for="item in paidJobs"
                  :key="`job-${item.id}`"
                  :featured="true"
                  :to="`/job-board/${item.slug}`"
                  :job="item"
                  @click.native="openJob(item)"
                >
                </live-preview>
              </v-card-text>
            </v-card>

            <!-- Scraped jobs  -->
            <v-card class="mt-4">
              <v-card-title>Cannabis lab jobs</v-card-title>

              <v-card-text>
                <live-preview
                  v-for="item in filteredItems"
                  :key="item.id"
                  :to="`/job-board/${item.slug}`"
                  :job="item"
                  @click.native="openJob(item)"
                >
                </live-preview>
              </v-card-text>
            </v-card>
          </section>
        </v-col>
      </v-row>
    </v-container>

    <v-dialog
      v-model="jobActive"
      transition="dialog-bottom-transition"
      max-width="750px"
      scrollable
      :fullscreen="$vuetify.breakpoint.smAndDown"
      @click:outside="closeJob()"
    >
      <NuxtChild @closeDialog="closeJob()" />
    </v-dialog>
  </section>
</template>

<script>
import ogImage from '@/assets/img/laboverflow-bg.png'

import LivePreview from '~/components/LivePreview.vue'
import SubscribeToJobs from '~/components/SubscribeToJobs.vue'
export default {
  components: { LivePreview, SubscribeToJobs },
  scrollToTop: false,

  async asyncData({ $content, params, $fire, store }) {
    const jobs = await $content('jobs').fetch()

    const uniqueLocations = store.getters['jobs/getUniqueLocations']
    const uniqueRoles = store.getters['jobs/getUniqueRoles']
    const uniqueTypes = store.getters['jobs/getUniqueTypes']

    // get firbase collection into array
    const paidJobs = store.getters['jobs/getPaidJobs']

    let jobActive = false
    if (params.slug) {
      const job = await store.getters['jobs/getJobBySlug'](params.slug)
      store.dispatch('jobs/setActiveJob', job)
      // console.log('current job', job)
      jobActive = true
    }

    return {
      jobs,
      params,
      uniqueLocations,
      uniqueRoles,
      uniqueTypes,
      paidJobs,
      jobActive,
    }
  },

  data() {
    return {
      // subscribeToJobsEmail: '',
      // subscribed: false,
      job: {},
      loading: false,
      selectedItem: null,
      selectedLocation: [],
      selectedType: [],
      selectedRole: [],
      uniqueLocations: [],
      uniqueTypes: [],
      uniqueRoles: [],

      pageName: 'Job board',
      pageTitle: 'Job board',
      pageDescription:
        'The job board for lab professionals in the cannabis industry',
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

  computed: {
    filteredItems() {
      const filters = {
        location: this.selectedLocation,
        position: this.selectedRole,
        type: this.selectedType,
      }

      if (
        (this.selectedLocation && this.selectedLocation.length > 0) ||
        (this.selectedRole && this.selectedRole.length > 0) ||
        (this.selectedType && this.selectedType.length > 0)
      ) {
        // Go thru each job
        return this.jobs.filter((item) => {
          // Loop thru filters amd
          return Object.keys(filters).some((filter) => {
            // Return if any selected filters are in the keys array
            return item[filter] === filters[filter]
          })
        })
      }
      return this.jobs
    },
    isMobileLayout() {
      return (
        this.$vuetify.breakpoint.xsOnly && this.$route.name === 'job-board-slug'
      )
    },
  },
  // mounted() {
  //   this.paidJobs = this.$store.getters['jobs/getPaidJobs']
  //   console.log('mounted', this.paidJobs)
  // },

  methods: {
    encode(data) {
      return Object.keys(data)
        .map(
          (key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key])
        )
        .join('&')
    },
    closeJob() {
      this.jobActive = false
      this.$store.dispatch('jobs/setActiveJob', {})

      this.$router.push({
        name: 'job-board',
      })
    },
    openJob(job) {
      // console.log('openJob', currentJob)
      this.$store.dispatch('jobs/setActiveJob', job)

      this.jobActive = true
    },

    // submitSubscribe(event) {
    //   // console.log('submitSubscribe', this.subscribeToJobsEmail)
    //   this.loading = true
    //   this.$fire.firestore
    //     .collection('subscribers')
    //     .add({
    //       email: this.subscribeToJobsEmail,
    //       url: this.$route.path,
    //       created: this.$fireModule.firestore.FieldValue.serverTimestamp(),
    //     })
    //     .then(() => {
    //       this.loading = false
    //       this.subscribed = true
    //       this.subscribeToJobsEmail = ''
    //     })
    //     .catch((error) => {
    //       this.loading = false
    //       console.error('Error adding document: ', error)
    //     })
    //   const form = this.$refs.subscribe
    //   form.submit()
    // },
  },
}
</script>

<style lang="scss">
.v-dialog {
  margin-bottom: 0 !important;
  bottom: 0 !important;
  background: white !important;
}
</style>

<style lang="scss" scoped>
.job-details {
}
.v-dialog__content {
  align-items: flex-end !important;
}
</style>
