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
              method="POST"
              name="subscribeToJobs"
              netlify
              netlify-honeypot="bot-field"
              class="sticky-sm"
              action="/"
            >
              <input type="hidden" name="form-name" value="subscribeToJobs" />

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
                  ></v-text-field>
                  <v-btn
                    type="submit"
                    dark
                    color="deep-purple accent-4"
                    :disabled="subscribeToJobsEmail === ''"
                    @click="subscribed = true"
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
      class="rounded-lg"
      max-width="750px"
      @click:outside="closeJob()"
    >
      job:{{ job }}
      <!-- :fullscreen="$vuetify.breakpoint.smAndDown" -->
      <NuxtChild @closeDialog="closeJob()" />
    </v-dialog>
  </section>
</template>

<script>
import LivePreview from '~/components/LivePreview.vue'
export default {
  components: { LivePreview },
  scrollToTop: false,
  async asyncData({ $content, params, $fire }) {
    const jobs = await $content('jobs').fetch()

    // TODO: Move these into the store as getters
    const uniqueLocations = jobs
      .map((ele) => ele.location || '')
      .filter((ele, i, arr) => arr.indexOf(ele) === i && ele !== '')
    const uniqueRoles = jobs
      .map((ele) => ele.position || '')
      .filter((ele, i, arr) => arr.indexOf(ele) === i && ele !== '')
    const uniqueTypes = jobs
      .map((ele) => ele.type || '')
      .filter((ele, i, arr) => arr.indexOf(ele) === i && ele !== '')
    // console.log(typeof uniqueTypes, uniqueTypes)

    // get firbase collection into array
    const paidJobs = await $fire.firestore
      .collection('jobs')
      .get()
      .then((querySnapshot) => {
        const jobs = []
        querySnapshot.forEach((doc) => {
          jobs.push({ id: doc.id, ...doc.data() })
        })
        return jobs
      })

    let jobActive = false
    if (params.slug !== undefined) {
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
    closeJob() {
      // console.log('Close Job Parent')

      this.jobActive = false
      this.$router.push({
        name: 'job-board',
      })
    },
    openJob(currentJob) {
      // console.log('openJob', currentJob)
      this.jobActive = true
    },
  },
}
</script>

<style lang="scss" scoped>
.job-details {
}
.v-dialog__content {
  align-items: flex-end !important;
}

.v-dialog {
  margin-bottom: 0 !important;
  bottom: 0 !important;
}
</style>
