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
            offset-sm="1"
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
                The official job board for lab professionals in the Cannabis
                industry
              </h2>
            </v-card-subtitle>

            <v-card-text class="body-1">
              Make your next career move here
            </v-card-text>
          </v-col>
        </v-row>
      </v-container>
    </v-card>

    <v-container class="mt-3 filters">
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

              jobActive:{{ jobActive }}
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
      class=""
      :fullscreen="$vuetify.breakpoint.smAndDown"
      @click:outside="closeJob()"
    >
      <v-card>
        <NuxtChild @closeDialog="closeJob()" />
      </v-card>
    </v-dialog>
  </section>
</template>

<script>
import LivePreview from '~/components/LivePreview.vue'
export default {
  components: { LivePreview },
  async asyncData({ $content, params, $fire }) {
    const jobs = await $content('jobs').fetch()

    // TODO: Move these into the store as getters
    // Get unique locations
    const uniqueLocations = jobs
      .map((ele) => ele.location)
      .filter((ele, i, arr) => arr.indexOf(ele) === i && ele !== '')

    // Get unique roles (position)
    const uniqueRoles = jobs
      .map((ele) => ele.position)
      .filter((ele, i, arr) => arr.indexOf(ele) === i && ele !== '')

    // Get unique titles
    const uniqueTypes = jobs
      .map((ele) => ele.type)
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

    return {
      jobs,
      params,
      uniqueLocations,
      uniqueRoles,
      uniqueTypes,
      paidJobs,
    }
  },
  data() {
    return {
      job: {},
      jobActive: false,
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
  mounted() {
    // eslint-disable-next-line no-undef
    // console.warn('Job Board >>> Mounted', { ...this.paidJobs })
  },

  methods: {
    // slugize(str) {
    //   return str.toLowerCase().replace(/ /gi, '-')
    // },
    closeJob() {
      console.log('Close Job Parent')

      this.jobActive = false
      this.$router.push({
        name: 'job-board',
      })
    },
    openJob(currentJob) {
      console.log('openJob', currentJob)
      // let job
      // try {
      //   job = await this.$content('jobs', currentJob.slug).fetch()
      // } catch (e) {
      //   console.warn('Cant find job', e)

      //   // get job item from $fire.firestore where slug = params.slug
      //   job = await this.$fire.firestore
      //     .collection('jobs')
      //     .where('slug', '==', currentJob.slug)
      //     .get()
      //     .then((snapshot) => {
      //       if (snapshot.empty) {
      //         return null
      //       }
      //       return snapshot.docs[0].data()
      //     })
      // }
      // this.job = job
      this.jobActive = true
    },
  },
}
</script>

<style lang="scss">
.job-details {
}

.v-dialog {
  margin-bottom: 0 !important;
  bottom: 0 !important;
}
</style>
