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
      <v-row align="center" justify="center" class="">
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
            <v-row justify="end" align="end">
              <v-col cols="12" md="6" class="">
                <share-buttons
                  :url="`https://www.laboverflow.com/job-board/${job.slug}`"
                  :name="pageName"
                  :title="`Looking for a ${pageTitle} in ${job.location}`"
                  :description="pageDescription"
                  :quote="`Looking for a ${pageTitle} in ${job.location}`"
                  hashtags=""
                ></share-buttons>
              </v-col>
              <v-col cols="12" md="6" class="text-right">
                <v-spacer></v-spacer>
                <v-btn @click.native="closeDialog()">Close</v-btn>
                <v-btn
                  v-if="job.applyURL"
                  target="_blank"
                  :href="job.applyURL"
                  color="primary"
                  class="ml-2"
                  >Apply now</v-btn
                >
                <v-btn
                  v-if="job.applyEmail"
                  target="_blank"
                  :href="`mailto:${job.applyEmail}`"
                  color="primary"
                  >Email now</v-btn
                >
              </v-col>
            </v-row>
          </v-card-actions>
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
</template>
<script>
import ogImage from '@/assets/img/laboverflow-bg.png'

import ShareButtons from '~/components/ShareButtons.vue'
export default {
  components: { ShareButtons },
  // scrollToTop: false,
  async asyncData({ params, store, redirect, $fire, route, $ga }) {
    let job
    if (!params.slug) {
      job = {}
    } else {
      try {
        job = await store.getters['jobs/getJobBySlug'](params.slug)
      } catch (e) {
        console.error('cant find job slug', e) // eslint-disable-line no-console
        redirect('/job-board')
      }
    }

    // Meta
    const pageName = 'job'
    const pageTitle = job.position || 'Job position'
    const pageDescription = job.jobDescriptionCopy
      ? job.jobDescriptionCopy.slice(0, 30)
      : 'Job description'

    return { job, params, $ga, pageName, pageTitle, pageDescription }
  },
  data() {
    return {
      pageName: '',
      pageTitle: '',
      pageDescription: ' ',
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
        {
          hid: 'description',
          property: 'description',
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
