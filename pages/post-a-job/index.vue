<template>
  <section class="post-job">
    <v-card
      color="deep-purple"
      dark
      tile
      class="d-flex align-center flex-column py-3"
    >
      <v-container>
        <v-row align="center">
          <v-col cols="12" sm="6" class="">
            <v-card-title>
              <h1 class="overline">Post a job</h1>
            </v-card-title>
            <v-card-subtitle class="">
              <h2 class="display-1">
                Find your next lab superstar in 1 month...
              </h2>
            </v-card-subtitle>
            <v-card-text>
              <p class="body-1">
                Or we will repost your job for another month for FREE - no
                strings attached!
              </p>
            </v-card-text>
          </v-col>
          <!-- <v-col sm="6"> </v-col> -->
        </v-row>
      </v-container>
    </v-card>

    <v-form class="mt-3">
      <v-container>
        <v-row>
          <!-- Form -->
          <v-col cols="12" sm="9" md="6">
            <!-- Postion Details -->
            <v-card>
              <v-card-title>Let's start</v-card-title>
              <v-card-text>
                <v-text-field
                  v-model="job.labName"
                  filled
                  hint="Name of your laboratory"
                  label="Lab/Business name"
                  required
                ></v-text-field>

                <v-text-field
                  v-model="job.position"
                  hint="The position you are hiring for"
                  label="Position"
                  required
                  filled
                ></v-text-field>

                <v-text-field
                  v-model="job.location"
                  hint="Example: Remote or San Diago, CA, USA"
                  label="Location"
                  required
                  filled
                ></v-text-field>

                <v-combobox
                  v-model="job.selectedSkills"
                  :items="skillsList"
                  chips
                  clearable
                  label="Primary skills/experience"
                  hint="Example: HPLC, GC (for Instruments) or Pesticide, Potency (Assay)"
                  multiple
                  filled
                >
                  <!-- <template #selection="{ attrs, item, select, selected }">
                  <v-chip
                    v-bind="attrs"
                    :input-value="selected"
                    close
                    @click="select"
                    @click:close="removeSkill(item)"
                  >
                    <strong>{{ item }}</strong
                    >&nbsp;
                    <span>(interest)</span>
                  </v-chip>
                </template> -->
                </v-combobox>
              </v-card-text>
            </v-card>

            <!-- Job Details -->
            <v-card class="mt-4">
              <v-card-title>Job details</v-card-title>

              <v-card-text class="pb-0">
                <v-select
                  v-model="job.type"
                  filled
                  hint=""
                  label="Job type"
                  :items="['Full-time', 'Part-time', 'Contract/Temp', 'Intern']"
                ></v-select>
              </v-card-text>

              <!-- <v-card-subtit<v-card-text>le class="">Salary range</v-card-subtitle> -->
              <v-card-text class="pb-0">
                <v-row>
                  <v-col>
                    <v-select
                      v-model="job.salaryMin"
                      filled
                      :items="salaryRange"
                      item-text="label"
                      item-value="value"
                      label="Minimum salary per year"
                      hide-details
                      required
                    ></v-select>
                  </v-col>
                  <v-col>
                    <v-select
                      v-model="job.salaryMax"
                      filled
                      :items="salaryRange"
                      item-text="label"
                      item-value="value"
                      label="Maximum salary per year"
                      required
                      hide-details
                    ></v-select>
                  </v-col>
                </v-row>

                <small>
                  Please use USD equivalent. We don't have currency built-in yet
                  and we'd like to use this salary data to show salary trends in
                  analytical testing labs.
                </small>
              </v-card-text>

              <v-card-text>
                <client-only>
                  <p class="body-1 mb-0">Job description</p>
                  <tiptap-editor v-model="job.description"></tiptap-editor>
                </client-only>
              </v-card-text>
            </v-card>

            <!-- How to apply -->
            <v-card class="mt-4">
              <v-card-title>How to apply</v-card-title>

              <v-card-text>
                <client-only>
                  <p class="body-1 mb-0">How to apply</p>
                  <tiptap-editor
                    v-model="job.howToApply"
                    class="mb-6"
                  ></tiptap-editor>
                </client-only>

                <!-- <v-textarea
                v-model="job.howToApply"
                label="How to apply"
                required
                auto-grow
              ></v-textarea> -->

                <v-text-field
                  v-model="job.applyURL"
                  filled
                  type="url"
                  hint="Example: http://www.mylab.com/jobs/123"
                  label="Apply URL"
                ></v-text-field>

                <p><b>OR</b></p>

                <v-text-field
                  v-model="job.applyEmail"
                  filled
                  type="email"
                  label="Apply email"
                  persistent-hint
                  hint="This email is public, the Apply button links to it if you do not supply an Apply URL above."
                ></v-text-field>
              </v-card-text>
            </v-card>

            <!-- Company -->
            <v-card class="mt-4">
              <v-card-title>Company</v-card-title>

              <v-card-text>
                <v-text-field
                  v-model="job.companyEmail"
                  type="email"
                  filled
                  hint="Appears on invoice"
                  label="Your company email (stays private - appears on invoice)"
                  required
                  auto-grow
                ></v-text-field>

                <v-text-field
                  v-model="job.invoiceNotes"
                  filled
                  hint="Appears on invoice"
                  label="Invoice notes / PO Number (stays private - appears on invoice))"
                  required
                  auto-grow
                ></v-text-field>
              </v-card-text>
            </v-card>

            <!-- Feedback -->
            <v-card class="mt-4">
              <v-card-title>Feedback</v-card-title>

              <v-card-text>
                <v-textarea
                  v-model="job.feedback"
                  filled
                  hint="This isn't part of the job post."
                  label="How could we make this experience better?"
                  auto-grow
                ></v-textarea>
              </v-card-text>
            </v-card>
          </v-col>

          <!-- Benefits Live Preview -->
          <v-col cols="12" sm="6">
            <!-- Intro -->
            <v-card color="deep-purple lighten-5">
              <v-card-title>Why Lab Overflow?</v-card-title>
              <v-card-text>
                <ul>
                  <li>
                    We are the only job board for Cannabis Testing Laboratory
                    Professionals
                  </li>
                  <li>
                    We are spending all our energy on marketing and SEO so you
                    dont have to
                  </li>
                  <li>We email your role to our growing list every week</li>
                </ul>
              </v-card-text>
            </v-card>

            <live-preview :job="job" class="mt-4 sticky"></live-preview>
          </v-col>
        </v-row>
      </v-container>
    </v-form>

    <v-card class="buy-footer">
      <v-container>
        <v-row align="center" justify="end">
          <v-col class="flex-grow-0"
            ><v-btn
              color="red"
              class="white--text"
              large
              :disabled="!job.companyEmail"
              @click.stop="gotoCheckout()"
            >
              Start Hiring – $199</v-btn
            >
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </section>
</template>

<script>
import LivePreview from '~/components/LivePreview.vue'
// import Stripe from 'stripe'
// const stripe = new Stripe(process.env.STRIPE_PK)

import TiptapEditor from '~/components/TiptapEditor.vue'

export default {
  components: {
    TiptapEditor,
    LivePreview,
  },
  data() {
    return {
      editor: null,
      salaryRange: [
        {
          value: '0',
          label: 'USD 0 per year',
        },
        {
          value: '10k',
          label: 'USD 10,000 per year',
        },
        {
          value: '20k',
          label: 'USD 20,000 per year',
        },
        {
          value: '30k',
          label: 'USD 30,000 per year',
        },
        {
          value: '40k',
          label: 'USD 40,000 per year',
        },
        {
          value: '50k',
          label: 'USD 50,000 per year',
        },
        {
          value: '60k',
          label: 'USD 60,000 per year',
        },
        {
          value: '70k',
          label: 'USD 70,000 per year',
        },
        {
          value: '80k',
          label: 'USD 80,000 per year',
        },
        {
          value: '90k',
          label: 'USD 90,000 per year',
        },
        {
          value: '100k',
          label: 'USD 100,000 per year',
        },
        {
          value: '110k',
          label: 'USD 110,000 per year',
        },
        {
          value: '120k',
          label: 'USD 120,000 per year',
        },
        {
          value: '130k',
          label: 'USD 130,000 per year',
        },
        {
          value: '140k',
          label: 'USD 140,000 per year',
        },
        {
          value: '150k',
          label: 'USD 150,000 per year',
        },
        {
          value: '160k',
          label: 'USD 160,000 per year',
        },
        {
          value: '170k',
          label: 'USD 170,000 per year',
        },
        {
          value: '180k',
          label: 'USD 180,000 per year',
        },
        {
          value: '190k',
          label: 'USD 190,000 per year',
        },
        {
          value: '200k',
          label: 'USD 200,000 per year',
        },
        {
          value: '210k',
          label: 'USD 210,000 per year',
        },
        {
          value: '220k',
          label: 'USD 220,000 per year',
        },
        {
          value: '230k',
          label: 'USD 230,000 per year',
        },
        {
          value: '240k',
          label: 'USD 240,000 per year',
        },
        {
          value: '250k',
          label: 'USD 250,000 per year',
        },
        {
          value: '260k',
          label: 'USD 260,000 per year',
        },
        {
          value: '270k',
          label: 'USD 270,000 per year',
        },
        {
          value: '280k',
          label: 'USD 280,000 per year',
        },
        {
          value: '290k',
          label: 'USD 290,000 per year',
        },
        {
          value: '300k',
          label: 'USD 300,000 per year',
        },
        {
          value: '310k',
          label: 'USD 310,000 per year',
        },
        {
          value: '320k',
          label: 'USD 320,000 per year',
        },
        {
          value: '330k',
          label: 'USD 330,000 per year',
        },
        {
          value: '340k',
          label: 'USD 340,000 per year',
        },
        {
          value: '350k',
          label: 'USD 350,000 per year',
        },
        {
          value: '360k',
          label: 'USD 360,000 per year',
        },
        {
          value: '370k',
          label: 'USD 370,000 per year',
        },
        {
          value: '380k',
          label: 'USD 380,000 per year',
        },
        {
          value: '390k',
          label: 'USD 390,000 per year',
        },
        {
          value: '400k',
          label: 'USD 400,000 per year',
        },
        {
          value: '410k',
          label: 'USD 410,000 per year',
        },
        {
          value: '420k',
          label: 'USD 420,000 per year',
        },
      ],

      skillsList: [
        'HPLC',
        'ICP-MS',
        'LCMS',
        'LC-MS/MS',
        'GCMS',
        'GC',
        'MS/MS',
        'MSMS',
        'qPCR',
        'Pesticides',
        'Cannabinoids',
        'Terpenes',
        'Mycotoxins',
        'Residual Solvents',
        'Trace Metal Analysis',
        'Microbiological Analysis',
      ],

      clientSecret: null,
      job: {
        selectedSkills: [],
        labName: '',
        position: '',
        title: '',
        description: '',
        location: '',
        type: 'Full-time',
        salary: '',
        salaryMin: '',
        salaryMax: '',
        applyUrl: '',
        applyEmail: '',
        companyEmail: '',
        invoiceNotes: '',
      },
    }
  },
  methods: {
    gotoCheckout() {
      // save job in store
      this.$store.commit('setJobAd', this.job)
      console.warn('saving', this.job)
      // redirect to checkout
      this.$router.push('/post-a-job/checkout')
      console.warn('redirecting')
    },

    // removeSkill(item) {
    //   this.job.selectedSkills.splice(this.job.selectedSkills.indexOf(item), 1)
    //   this.job.selectedSkills = [...this.job.selectedSkills]
    // },
  },
}
</script>

<style lang="scss">
.post-job {
  padding-bottom: 180px;
}

.buy-footer {
  position: fixed;
  bottom: 0;
  z-index: 10;
  width: 100%;
}

.sticky {
  top: 80px;
  position: sticky;
  z-index: 1;
}
</style>
