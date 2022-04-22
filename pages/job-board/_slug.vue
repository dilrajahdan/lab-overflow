<template>
  <v-sheet class="job-details" color="">
    <v-container>
      <v-row
        align="center"
        justify="center"
        class="
          justify-space-between
          job-details__header
          sticky
          w-100
          grey
          lighten-3
        "
      >
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
    </v-container>
  </v-sheet>
</template>
<script>
export default {
  // scrollToTop: false,
  async asyncData({ $content, params, store, redirect, $fire, $ga }) {
    // console.warn('_slug asyncData', params)
    let job
    if (!params.slug) {
      job = {}
    } else {
      try {
        job = await store.getters['jobs/getJobBySlug'](params.slug)
      } catch (e) {
        console.error('cant find job slug', e)
        redirect('/job-board')
      }
    }

    return { job, params, $ga }
  },

  methods: {
    closeDialog() {
      this.$emit('closeDialog')
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

<style lang="scss">
.job-details__header {
  width: 100%;
  left: 0;
  // top: 0;
  margin: 0;
  padding: 0;
}
</style>
