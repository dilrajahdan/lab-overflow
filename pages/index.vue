<template>
  <div class="">
    <v-sheet
      class="deep-purple white--text d-flex flex-column justify-center py-3"
    >
      <v-container class="">
        <v-row justify="" class="">
          <v-col cols="12" sm="6" md="6">
            <v-card-title>
              <h1 class="overline">Welcome to Lab Overflow</h1>
            </v-card-title>
            <v-card-subtitle class="">
              <h2 class="display-1">
                The hub for cannabis testing professionals
              </h2>
            </v-card-subtitle>

            <h1 class="display-1 mb-6 display-1"></h1>
            <!--             
            <p class="font-weight-regular mb-9">
              Members of the cannabis testing industry are dissatisfied with
              their current information flow.
            </p>
            <p class="font-weight-regular mb-9">
              Knowledge is power. And the lack of knowledge about cannabis
              testing is losing labs and the industry itself money.
            </p>
            <p class="font-weight-regular mb-9">
              This a website where you can connect with other professionals
              anonymously in order to share and improve your methods, find
              reliable suppliers, pick up tips for your next career move and
              more – all while ensuring that knowledge flows freely between the
              lab community!
            </p> -->
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
              <h2 class="text-h6">
                <!-- <v-icon>mdi-account-circle</v-icon> -->
                Featured lab
              </h2>
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
        <v-col cols="12" sm="6" class="fill-heightX">
          <v-card class="fill-heightX">
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
  async asyncData({ store }) {
    // const paidJobs = await store.getters['jobs/getPaidJobs']
    //
    // return { paidJobs }
  },
  data() {
    return {
      // title: null,
    }
  },
  head() {
    return {
      // title: this.title,
      meta: [
        {
          hid: 'homepage',
          name: 'description',
          content: `The community for the cannabis testing industry. Join us, bring your wisdom and share your knowledge to bulk up your lab's methods! Exchange ideas with experienced industry workers, form virtual partnerships or start your next career move with us!`,
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
