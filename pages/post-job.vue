<template>
  <section class="section">
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
            <v-card-title class="display-1">Post a job</v-card-title>
            <!-- clientSecret: {{ clientSecret }} <br />
            loading: {{ loading }} <br /> -->
            <!-- elements: {{ elements }} <br />stripe: {{ stripe }} -->
          </v-col>
        </v-row>
      </v-container>
    </v-card>

    <v-container>
      <v-row>
        <!-- Form -->
        <v-col cols="12" sm="9" md="6">
          <v-card class="">
            <v-card-title>Let's start</v-card-title>
            <v-card-text>
              <v-text-field
                v-model="job.labName"
                hint="Name of your laboratory"
                label="Lab/Business name"
                required
              ></v-text-field>

              <v-text-field
                v-model="job.position"
                hint="The position you are hiring for"
                label="Position"
                required
              ></v-text-field>

              <v-text-field
                v-model="job.location"
                hint="Example: Remote or San Diago, CA, USA"
                label="Location"
                required
              ></v-text-field>

              <v-combobox
                v-model="job.selectedSkills"
                :items="skillsList"
                chips
                clearable
                label="Primary skills/experience"
                hint="Example: HPLC, GC (for Instruments) or Pesticide, Potency (Assay)"
                multiple
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
          <v-card class="mt-4">
            <v-card-title>Job details</v-card-title>

            <v-card-text>
              <v-select
                :v-model="1"
                hint=""
                label="Job type"
                :items="['Full-time', 'Part-time', 'Contract/Temp', 'Intern']"
              ></v-select>
            </v-card-text>

            <!-- <v-card-subtit<v-card-text>le class="">Salary range</v-card-subtitle> -->
            <v-card-text>
              <v-row>
                <v-col>
                  <v-select
                    v-model="job.salaryMin"
                    :items="salaryRange"
                    item-text="label"
                    item-value="value"
                    label="Minimum salary per year"
                    required
                  ></v-select>
                </v-col>
                <v-col>
                  <v-select
                    v-model="job.salaryMax"
                    :items="salaryRange"
                    item-text="label"
                    item-value="value"
                    label="Maximum salary per year"
                    required
                  ></v-select>
                </v-col>
              </v-row>
            </v-card-text>

            <v-card-text>
              <v-textarea
                v-model="job.description"
                label="Job description"
                required
                auto-grow
              ></v-textarea>
            </v-card-text>
          </v-card>
          <v-card class="mt-4">
            <v-card-title>How to apply</v-card-title>

            <v-card-text>
              <v-textarea
                v-model="job.howToApply"
                label="How to apply"
                required
                auto-grow
              ></v-textarea>

              <v-text-field
                v-model="job.applyURL"
                type="url"
                hint="Example: http://www.mylab.com/jobs/123"
                label="Apply URL"
              ></v-text-field>
              or

              <v-text-field
                v-model="job.applyEmail"
                type="email"
                label="Apply email"
                hint="This email is public, the Apply button links to it if you do not supply an Apply URL above."
              ></v-text-field>
            </v-card-text>
          </v-card>
          <v-card class="mt-4">
            <v-card-title>Company</v-card-title>

            <v-card-text>
              <v-text-field
                v-model="job.companyEmail"
                hint="Appears on invoice"
                label="Company email (stays private)"
                required
                auto-grow
              ></v-text-field>

              <v-text-field
                v-model="job.invoiceEmail"
                label="Invoice email (stays private)"
                required
                auto-grow
              ></v-text-field>

              <v-text-field
                v-model="job.invoiceNotes"
                v-card-text
                hint="Appears on invoice"
                label="Invoice notes / PO Number"
                required
                auto-grow
              ></v-text-field>
            </v-card-text>
          </v-card>
          <v-card class="mt-4">
            <v-card-title>Feedback</v-card-title>

            <v-card-text>
              <v-textarea
                v-model="job.feedback"
                hint="This isn't part of the job post."
                label="How could we make this experience better?"
                auto-grow
              ></v-textarea>
            </v-card-text>
          </v-card>

          <v-card class="mb-12" color="grey lighten-1">
            <v-card-title>Pay</v-card-title>
            <form id="payment-form">
              <div id="payment-element">
                <!--Stripe.js injects the Payment Element-->
              </div>
            </form>

            <v-btn
              id="button-text"
              color="primary"
              @click.prevent.stop="handleSubmit()"
            >
              Pay Now
            </v-btn>
            <v-btn text> Cancel </v-btn>
          </v-card>
        </v-col>

        <!-- Benefits -->
        <v-col cols="12" sm="3">
          <v-card class="stickyX">
            <v-card-title>Why post a job with Lab Overflow?</v-card-title>
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

                <!-- <li>
                  Your role will be posted in the Homepage, and the Lab Directory section of the
                  site under your labs region - MAKE THIS A PAID FEATURE 
                </li> -->
              </ul>
            </v-card-text>
          </v-card>

          <!-- <v-card class="mt-4">
            <v-card-title>Pay with</v-card-title>
            <v-card-text>
              <v-card-title>
                <v-icon>mdi-credit-card</v-icon>
                Credit Card
              </v-card-title>
              
            </v-card-text>
          </v-card> -->
        </v-col>
      </v-row>
    </v-container>

    <v-card class="buy-footer">
      <v-container>
        <v-row align="center" justify="center">
          <v-col class="my-4">
            <!-- Live Preview -->
            <v-card color="grey lighten-4">
              <v-container>
                <v-row align="center ">
                  <!-- Role -->
                  <v-col class="py-0 flex-grow-1">
                    <v-card-text class="overline pb-0">
                      {{ job.labName || 'Your Lab Here' }}
                    </v-card-text>
                    <v-card-title class="pt-0 mt-n2 mb-2">{{
                      job.position || 'Superstar you want to hire'
                    }}</v-card-title>
                    <v-card-subtitle class="">
                      <v-chip label small>{{
                        job.location || 'Location'
                      }}</v-chip>

                      <v-chip
                        v-if="job.salaryMin"
                        label
                        small
                        color="green lighten-3"
                        >USD {{ job.salaryMin }}
                        <span v-if="job.salaryMin && job.salaryMax">-</span>
                        {{ job.salaryMax }}
                      </v-chip>
                    </v-card-subtitle>
                  </v-col>

                  <!-- Skills -->
                  <v-col class="py-0">
                    <v-chip-group>
                      <v-chip
                        v-for="skill in job.selectedSkills"
                        :key="skill"
                        outlined
                        >{{ skill }}</v-chip
                      >
                    </v-chip-group>
                  </v-col>

                  <v-col class="flex-grow-0">
                    <v-card-actions>
                      <v-btn outlined>Apply</v-btn>
                    </v-card-actions>
                  </v-col>
                </v-row>
              </v-container>
            </v-card>
          </v-col>
          <v-col class="flex-grow-0"
            ><v-btn color="red" class="white--text" x-large
              >Start Hiring – $199</v-btn
            >

            <v-btn color="primary" @click="loadStripe()"> Continue </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card>

    <v-card tile class="d-flex align-center flex-column py-3 mb-16">
      <v-container>
        <v-row>
          <v-col>
            <v-stepper v-model="formStepper">
              <v-stepper-items>
                <v-stepper-content step="1">
                  <v-btn text> Cancel </v-btn>
                </v-stepper-content>

                <v-stepper-content step="2"> </v-stepper-content>
              </v-stepper-items>
            </v-stepper>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </section>
</template>

<script>
// import Stripe from 'stripe'
// const stripe = new Stripe(process.env.STRIPE_PK)

export default {
  data() {
    return {
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

      formStepper: 1,
      jobForm: null,
      job: {
        selectedSkills: [],
        labName: '',
        position: '',
        title: '',
        description: '',
        location: '',
        salary: '',
        email: '',
        minSalary: '',
        maxSalary: '',
      },
      loading: false,
      elements: null,
      items: [{ id: 'xl-tshirt' }],
      stripe: null,
    }
  },
  mounted() {},
  methods: {
    async loadStripe() {
      this.stripe = await Stripe(process.env.STRIPE_PK) // eslint-disable-line no-undef
      // this.$store.dispatch('createPaymentIntent')
      this.initialize()
      this.formStepper = 3
    },

    async initialize() {
      // const items = this.items
      // const response = await fetch(
      //   '/.netlify/functions/create-payment-intent',
      //   {
      //     method: 'POST',
      //     headers: { 'Content-Type': 'application/json' },
      //     body: JSON.stringify({ items }),
      //   }
      // )
      // const { clientSecret } = await response.json()
      await this.$store.dispatch('createPaymentIntent')

      const clientSecret = this.$store.getters.clientSecret

      const appearance = {
        theme: 'stripe',
      }

      this.elements = this.stripe.elements({ appearance, clientSecret })

      const paymentElement = this.elements.create('payment')
      paymentElement.mount('#payment-element')
    },

    async handleSubmit(e) {
      // e.preventDefault()
      this.loading = true
      // const elements = this.elements

      console.warn('EMAIL', this.job.email) // eslint-disable-line no-console

      const { error } = await this.stripe.confirmPayment({
        elements: this.elements,
        confirmParams: {
          // Make sure to change this to your payment completion page
          return_url: 'http://localhost:8888/post-job-success',
          // receipt_email: document.getElementById('email'),
          receipt_email: this.job.email,
        },
      })

      // This point will only be reached if there is an immediate error when
      // confirming the payment. Otherwise, your customer will be redirected to
      // your `return_url`. For some payment methods like iDEAL, your customer will
      // be redirected to an intermediate site first to authorize the payment, then
      // redirected to the `return_url`.
      if (error.type === 'card_error' || error.type === 'validation_error') {
        console.warn(error.message)
      } else {
        console.error('An unexpected error occured.')
      }

      this.loading = false
    },

    removeSkill(item) {
      this.job.selectedSkills.splice(this.job.selectedSkills.indexOf(item), 1)
      this.job.selectedSkills = [...this.job.selectedSkills]
    },
  },
}
</script>

<style lang="scss">
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
