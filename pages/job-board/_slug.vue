<template>
  <section v-if="job">
    <!-- <v-container v-if="job"> -->
    <v-row align="end" justify="end">
      <v-col class="flex-grow-0 sticky-box">
        <v-card-text>
          <v-btn large icon @click.native="closeDialog()"
            ><v-icon>mdi-close</v-icon></v-btn
          >
        </v-card-text>
      </v-col>
    </v-row>
    <v-row align="center" justify="center" class="pa-10">
      <v-col v-if="job" cols="12" class="">
        <v-card color="grey lighten-5 float-right ma-4 " max-width="250" hover>
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
            ></v-card-actions
          >
        </v-card>

        <v-card-title v-if="job.jobDescriptionCopy"
          >Job description</v-card-title
        >
        <v-card-text
          class="body-1"
          v-html="formatNewLines(job.jobDescriptionCopy)"
        >
        </v-card-text>

        <v-card-title v-if="job.howToApplyCopy">How to apply</v-card-title>
        <v-card-text
          v-if="job.howToApplyCopy"
          class="body-1"
          v-html="job.howToApplyCopy"
        />

        <v-btn
          v-if="job.applyURL"
          target="_blank"
          :href="job.applyURL"
          min-width="100%"
          color="primary"
          >Apply now</v-btn
        >
      </v-col>

      <v-col v-else cols="12" sm="10" md="8">
        <v-card-title>Can't find job :(</v-card-title>

        <v-card-text>
          <v-btn to="/job=board">Back</v-btn>
        </v-card-text>
      </v-col>
    </v-row>
    <!-- </v-container> -->
  </section>
</template>
<script>
export default {
  async asyncData({ $content, params, redirect, $fire, $ga }) {
    let job
    try {
      job = await $content('jobs', params.slug).fetch()
    } catch (e) {
      console.warn('Cant find job', e)

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
    } catch (e) {
      console.warn('Cant find job', e)

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
      console.log('close dialog')
      this.$emit('closeDialog')
      // this.route.push('/job=board')
    },
    formatNewLines(text) {
      if (!text) {
        return ''
      }
      return text.replace(/\n/g, '<br />')
    },
    gotoSourceUrl(url) {
      const trackingEventData = {
        eventCategory: `${this.params.country}/${this.params.region}/${this.params.lab}`,
        eventAction: 'click',
        eventLabel: 'contact details clicked',
        eventValue: this.showDetails ? 'show' : 'hide',
      }

      console.log(trackingEventData)
      this.$ga.event(trackingEventData)

      window.open(url, '_blank')
    },
  },
}
</script>
