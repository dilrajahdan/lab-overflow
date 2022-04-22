<template>
  <section>
    <v-card
      color="deep-purple"
      dark
      tile
      class="d-flex align-center flex-column py-3"
    >
      <v-container>
        <!-- <v-row>
          <v-col cols="6">{{ jobs }}</v-col>
          <v-col cols="6">{{ paidJobs }}</v-col>
        </v-row> -->

        <v-row>
          <v-col
            cols="12"
            sm="10"
            offset-sm="0"
            md="8"
            offset-md="0"
            lg="6"
            xl="4"
            class=""
          >
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
      <v-row class="mt-0">
        <v-col cols="12" sm="3">
          <v-subheader>Filters</v-subheader>

          <v-card color="gray lighten-4" elevation="1" class="sticky-sm">
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
        </v-col>

        <!-- Content -->
        <v-col cols="12" sm="9" class="mt-0 pt-sm-3 pt-0">
          <section class="job-details grey lighten-4">
            <!-- Paid jobs  -->
            <v-subheader>Sponsored cannabis lab jobs</v-subheader>
            <template v-for="item in paidJobs">
              <live-preview
                :key="`job-${item.id}`"
                :featured="true"
                :to="`/job-board/${item.slug}`"
                :job="item"
                @click.native="openJob(item)"
              >
              </live-preview>
            </template>

            <!-- <v-container  class="mt-3"> -->
            <form
              v-show="!subscribed"
              ref="subscribe"
              method="POST"
              name="subscribe"
              data-netlify
              data-netlify-honeypot="bot-field"
              class="sticky-sm"
              action="/thank-you"
            >
              <input type="hidden" name="form-name" value="subscribe" />

              <v-banner
                app
                :single-line="$vuetify.breakpoint.smAndUp"
                rounded
                sticky
                color="deep-orange darken-1"
                class="white--text"
              >
                <p class="body-1 pb-0 mb-0 flex-grow-0">
                  Send me awesome cannabis lab jobs here
                </p>
                <template #icon>
                  <v-icon class="" color="white" dark>mdi-email-plus</v-icon>
                </template>
                <template #actions class="">
                  <v-text-field
                    v-model="subscribeToJobsEmail"
                    filled
                    rounded
                    required
                    class="pa-0 ma-0 white"
                    placeholder="Your email"
                    hide-details
                    name="email"
                    type="email"
                    dense
                  />
                  <v-btn
                    type="submit"
                    dark
                    color="deep-purple accent-4"
                    :disabled="subscribeToJobsEmail === ''"
                    @click.prevent="submitSubscribe($event)"
                  >
                    Subscribe
                  </v-btn>
                </template>
              </v-banner>
            </form>

            <!-- Scraped jobs  -->
            <v-subheader>Cannabis lab jobs</v-subheader>

            <template v-for="item in filteredItems">
              <live-preview
                :key="item.id"
                :to="`/job-board/${item.slug}`"
                :job="item"
                @click.native="openJob(item)"
              >
              </live-preview>
            </template>
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
import LivePreview from '~/components/LivePreview.vue'
export default {
  components: { LivePreview },
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
      console.log('current job', job)
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
      subscribeToJobsEmail: '',
      subscribed: false,
      job: {},
      loading: false,
      selectedItem: null,
      selectedLocation: [],
      selectedType: [],
      selectedRole: [],
      uniqueLocations: [],
      uniqueTypes: [],
      uniqueRoles: [],
      title: 'Job board for Lab Professionals in the Cannabis industry',
    }
  },
  head() {
    return {
      title: this.title,
      meta: [
        {
          hid: 'Lab jobs',
          name: 'Lab jobs',
          content: `Job board for Lab Professionals in the Cannabis industry`,
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

    submitSubscribe(event) {
      // console.log('submitSubscribe', this.subscribeToJobsEmail)
      this.loading = true
      this.$fire.firestore
        .collection('subscribers')
        .add({
          email: this.subscribeToJobsEmail,
          url: this.$route.path,
          created: this.$fireModule.firestore.FieldValue.serverTimestamp(),
        })
        .then(() => {
          this.loading = false
          this.subscribed = true
          this.subscribeToJobsEmail = ''
        })
        .catch((error) => {
          this.loading = false
          console.error('Error adding document: ', error)
        })

      // submit form
      // event.preventDefault()

      // const axiosConfig = {
      //   headers: {
      //     'Content-Type': 'application/x-www-form-urlencoded',
      //   },
      //   baseURL: 'http://localhost:8888/',
      // }
      // this.$axios
      //   .post(
      //     `/`,
      //     {
      //       email: this.subscribeToJobsEmail,
      //       url: this.$route.path,
      //     },
      //     axiosConfig
      //   )
      //   .then((response) => {
      //     console.log(response)
      //     this.router.push('thanks')
      //   })
      //   .catch((error) => {
      //     console.log(error)
      //     this.router.push('error')
      //   })

      const form = this.$refs.subscribe
      form.submit()
    },
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
