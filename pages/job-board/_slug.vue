<template>
  <v-card loading="job">
    <!-- <v-container v-if="job"> -->
    <div class="sticky grey lighten-3">
      <v-row align="center" justify="center" class="justify-space-between">
        <v-col class="">
          <v-card-title v-if="job.position" class="">{{
            job.position
          }}</v-card-title>
        </v-col>
        <v-col class="flex-grow-0">
          <v-card-text>
            <v-btn color="" tile icon @click.native="closeDialog()"
              ><v-icon>mdi-close</v-icon></v-btn
            >
          </v-card-text>
        </v-col>
      </v-row>
    </div>
    <v-row class="my-0">
      <v-divider></v-divider>
    </v-row>
    <v-row align="center" justify="center" class="px-10">
      <v-col cols="12" class="">
        <v-card
          color="grey lighten-5 float-md-right ma-4 "
          :max-width="$vuetify.breakpoint.mdAndUp ? '350' : ''"
          hover
        >
          <v-card-title v-if="job.position">
            {{ job.position }}
          </v-card-title>
          <v-card-subtitle class="">
            {{ job.labName }}
          </v-card-subtitle>

          <v-card-text class="overline">
            <v-chip-group column>
              <v-chip class="mt-1" label small>
                {{ job.location }}
              </v-chip>
              <v-chip
                v-if="job.salaryMin"
                label
                color="green lighten-4 mt-1"
                small
                >💰 USD {{ job.salaryMin }}
                <span v-if="job.salaryMin && job.salaryMax">-</span>
                {{ job.salaryMax }}
              </v-chip>
            </v-chip-group>
          </v-card-text>

          <v-card-actions>
            <v-btn
              v-if="job.applyURL"
              target="_blank"
              :href="job.applyURL"
              min-width="100%"
              color="primary"
              >Apply now</v-btn
            >
            <v-btn
              v-if="job.applyEmail"
              :href="`mailto:${job.applyEmail}`"
              min-width="100%"
              color="primary"
              >Email now</v-btn
            >
          </v-card-actions>
        </v-card>

        <v-card-title v-if="job.jobDescriptionCopy"
          >Job description</v-card-title
        >

        <!-- eslint-disable vue/no-v-html -->
        <v-card-text
          class="body-1"
          v-html="formatNewLines(job.jobDescriptionCopy)"
        >
        </v-card-text>
        <!--eslint-enable-->

        <v-card-title v-if="job.howToApplyCopy">How to apply</v-card-title>
        <!-- eslint-disable vue/no-v-html -->
        <v-card-text
          v-if="job.howToApplyCopy"
          class="body-1"
          v-html="job.howToApplyCopy"
        />
        <!--eslint-enable-->
      </v-col>

      <v-col cols="12">
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click.native="closeDialog()">Close</v-btn>
          <v-btn
            v-if="job.applyURL"
            target="_blank"
            :href="job.applyURL"
            color="primary"
            >Apply now</v-btn
          >
          <v-btn
            v-if="job.applyEmail"
            target="_blank"
            :href="`mailto:${job.applyEmail}`"
            color="primary"
            >Email now</v-btn
          >
        </v-card-actions>
      </v-col>
    </v-row>
    <!-- </v-container> -->
  </v-card>
</template>
<script>
export default {
  // scrollToTop: false,
  async asyncData({ $content, params, redirect, $fire, $ga }) {
    console.warn('asyncData', params.slug)

    let job
    try {
      job = await $content('jobs', params.slug).fetch()
      console.warn('job content', job)
    } catch (e) {
      console.warn('Cant find job', e) // eslint-disable-line

      // get job item from $fire.firestore where slug = params.slug
      job = await $fire.firestore
        .collection('jobs')
        .where('slug', '==', params.slug)
        .get()
        .then((snapshot) => {
          if (snapshot.empty) {
            return null
          }
          return snapshot.docs[0].data()
        })
      console.warn('job fire', job)

      if (!job) {
        redirect('/job=board')
      }
    }

    return { job, params, $ga }
  },
  async mounted() {
    // this.$ga.pageview(this.params.slug)
    console.warn('mounted')
    let job
    try {
      job = await this.$content('jobs', this.params.slug).fetch()
      console.warn('mounted content', job)
    } catch (e) {
      console.warn('Cant find job', e) // eslint-disable-line

      // get job item from $fire.firestore where slug = params.slug
      job = await this.$fire.firestore
        .collection('jobs')
        .where('slug', '==', this.params.slug)
        .get()
        .then((snapshot) => {
          if (snapshot.empty) {
            return null
          }
          return snapshot.docs[0].data()
        })
      console.warn('mounted fire', job)

      if (!job) {
        this.$router.push({
          name: 'job-board',
        })
      }
    }
    this.job = job
    // return { job, params, $ga }
  },
  methods: {
    closeDialog() {
      // console.log('close dialog')
      this.$emit('closeDialog')
      // this.route.push('/job=board')
    },
    formatNewLines(text) {
      if (!text) {
        return ''
      }
      return text.replace(/\n/g, '<br />')
    },
  },
}
</script>
