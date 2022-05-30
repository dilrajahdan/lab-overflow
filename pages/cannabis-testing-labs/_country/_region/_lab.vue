<template>
  <section>
    <v-container>
      <v-row class="mt-0 pb-0">
        <v-col cols="12" sm="8">
          <v-btn
            color=""
            outlined
            small
            class="mt-0 mb-4"
            :to="`/cannabis-testing-labs/${params.country}/${params.region}`"
          >
            <v-icon left>mdi-arrow-left</v-icon>
            Back to labs</v-btn
          >
        </v-col>
      </v-row>
    </v-container>
    <v-container class="details-body pt-0">
      <v-row>
        <v-col cols="12" sm="9">
          <!-- Lab details -->
          <v-card class="mx-autoD">
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-card-title class="display-1"> {{ lab.Lab }} </v-card-title>
                  <v-card-subtitle>{{ lab.Address }} </v-card-subtitle>

                  <v-row>
                    <v-col cols="12" sm="4">
                      <v-card-text class="pb-0">Accreditation</v-card-text>
                      <v-card-subtitle class="pt-0 font-weight-bold">{{
                        lab.Accredited || '-'
                      }}</v-card-subtitle>

                      <v-card-text class="pb-0"> Pick-up service</v-card-text>
                      <v-card-subtitle class="pt-0 font-weight-bold">
                        <template v-if="lab['Pickup Service'] !== ''">
                          Yes
                        </template>
                        <template v-else> No </template>
                      </v-card-subtitle>
                    </v-col>

                    <v-col cols="12" sm="4">
                      <v-card-text class="pb-0"> Cannabis license</v-card-text>
                      <v-card-subtitle class="pt-0 font-weight-bold">{{
                        lab.Licence || '-'
                      }}</v-card-subtitle>

                      <v-card-text class="pb-0"> License type</v-card-text>
                      <v-card-subtitle class="pt-0 font-weight-bold">{{
                        lab['Licence Type'] || '-'
                      }}</v-card-subtitle>
                    </v-col>

                    <v-col cols="12" sm="4">
                      <v-card-text class="pb-0">Sample types</v-card-text>
                      <v-card-subtitle class="pt-0 font-weight-bold">{{
                        lab['Sample Types'] || '-'
                      }}</v-card-subtitle>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-container>

            <v-card-actions class="">
              <v-row>
                <v-col>
                  <v-btn
                    class="primary"
                    min-width="100%"
                    @click="showCallBack()"
                    >Request Callback</v-btn
                  >
                </v-col>
                <v-col class="flex-grow-0">
                  <v-btn text color="primary " @click="showContactDetails()">
                    Contact details
                  </v-btn>
                </v-col>
              </v-row>
            </v-card-actions>

            <v-expand-transition>
              <div v-show="showDetails">
                <v-divider></v-divider>

                <v-row
                  align="center"
                  justify="center"
                  class="pinkD pt-0 mt-0 mb-3"
                >
                  <!-- <v-col>
                <v-card-text class="pb-0"> Contact name </v-card-text>
                <v-card-subtitle class="pt-0 pb-0 font-weight-bold">{{
                  fullName
                }}</v-card-subtitle>
              </v-col>

              <v-col>
                <v-card-text class="pb-0"> Email </v-card-text>
                <v-card-subtitle class="pt-0 pb-0 font-weight-bold">
                  <a :href="`mailto:${lab.Email}`">{{ lab.Email }}</a>
                </v-card-subtitle>
              </v-col> -->

                  <v-col>
                    <v-card-text class="py-0"> Phone </v-card-text>
                    <v-card-subtitle
                      v-if="lab.cleanPhone"
                      class="pt-0 pb-0 font-weight-bold"
                      ><a :href="`tel:${lab.cleanPhone}`">{{
                        lab.Phone
                      }}</a></v-card-subtitle
                    >
                  </v-col>

                  <v-col>
                    <v-card-text class="py-0"> URL </v-card-text>
                    <v-card-subtitle class="pt-0 pb-0 font-weight-bold"
                      ><a
                        target="_blank"
                        :href="`http://${lab.URL}?ref=laboverflow.com`"
                        >{{ lab.URL }}</a
                      ></v-card-subtitle
                    >
                  </v-col>
                </v-row>
              </div>
            </v-expand-transition>

            <!-- Request callback dialog -->
            <form
              ref="labcallback"
              method="POST"
              name="labcallback"
              data-netlify
              data-netlify-honeypot="bot-field"
              accept-charset="UTF-8"
            >
              <input type="hidden" name="form-name" value="labcallback" />
              <input type="hidden" name="lab-name" :value="lab.Lab" />
              <v-dialog v-model="showRequestCallback" max-width="600px">
                <v-card>
                  <v-card-title>
                    <!-- {{ $route.params }} -->
                    <span class="text-h5"
                      >Request callback from {{ lab.Lab }}</span
                    >
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="6">
                          <p class="hidden">
                            <label>
                              Don’t fill this out if you’re human:
                              <input name="bot-field" />
                            </label>
                          </p>
                          <v-text-field
                            v-model="requestForm.name"
                            name="name"
                            type="text"
                            class="my-0X"
                            label="Name*"
                            :rules="nameRules"
                            required
                          ></v-text-field>
                          <v-text-field
                            v-model="requestForm.email"
                            name="email"
                            type="email"
                            class="my-0X"
                            label="Email*"
                            :rules="emailRules"
                            required
                          ></v-text-field>
                          <v-text-field
                            v-model="requestForm.phone"
                            name="phone"
                            type="tel"
                            class="my-0X"
                            label="Phone*"
                            :rules="nameRules"
                            required
                          ></v-text-field>

                          <!-- <v-text-field
                        v-model="requestForm.company"
                        name="company"
                        label="Company name*"
                        :rules="nameRules"
                        required
                      ></v-text-field> -->
                          <v-select
                            v-model="requestForm.time"
                            name="time"
                            :items="['Morning', 'Afternoon', 'Evening']"
                            :rules="[(v) => !!v || 'Item is required']"
                            label="Best time to phone*"
                            required
                          ></v-select>
                        </v-col>

                        <v-col cols="12" sm="6">
                          <span>Business type</span>
                          <v-radio-group
                            v-model="requestForm.businessType"
                            :rules="[(v) => !!v || 'Item is required']"
                            mandatory
                          >
                            <v-radio
                              name="businessType"
                              label="Cultivator"
                              value="Cultivator"
                            ></v-radio>
                            <v-radio
                              name="businessType"
                              label="Extractor"
                              value="Extractor"
                            ></v-radio>
                            <v-radio
                              name="businessType"
                              label="Dispensary"
                              value="Dispensary"
                            ></v-radio>
                            <v-radio
                              name="businessType"
                              label="Grower"
                              value="Grower"
                            ></v-radio>
                            <v-radio
                              name="businessType"
                              label="Producer"
                              value="Producer"
                            ></v-radio>
                            <v-radio
                              name="businessType"
                              label="Lab"
                              value="Lab"
                            ></v-radio>
                            <v-radio
                              name="businessType"
                              label="Consultant"
                              value="Consultant"
                            ></v-radio>
                          </v-radio-group>
                        </v-col>
                      </v-row>
                    </v-container>
                    <input type="hidden" name="_gotcha" />

                    <small>*indicates required field</small>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text @click="showRequestCallback = false">
                      Cancel
                    </v-btn>
                    <v-btn
                      color="primary"
                      :disabled="!validRequestForm"
                      type="submit"
                      @click.prevent="sumitCallbackForm($event)"
                    >
                      Request callback
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </form>
          </v-card>

          <!-- Assays -->
          <v-card class="Xmx-auto my-6">
            <v-card-title class="mb-3">Tests</v-card-title>
            <v-card-subtitle>Safety</v-card-subtitle>

            <v-card-text>
              <v-chip
                class="mr-1 mb-1"
                :color="lab['Pesticides'] ? 'deep-purple accent-4' : ''"
                :text-color="lab['Pesticides'] ? 'white' : ''"
                filter-icon="mdi-add"
              >
                <v-icon left>{{
                  lab['Pesticides'] ? 'mdi-check-bold' : 'mdi-close-thick'
                }}</v-icon>
                Pesticides</v-chip
              >
              <v-chip
                class="mr-1 mb-1"
                :color="lab['Mycotoxins'] ? 'deep-purple accent-4' : ''"
                :text-color="lab['Mycotoxins'] ? 'white' : ''"
              >
                <v-icon left>{{
                  lab['Mycotoxins'] ? 'mdi-check-bold' : 'mdi-close-thick'
                }}</v-icon>
                Mycotoxins</v-chip
              >
              <v-chip
                class="mr-1 mb-1"
                :color="lab['Heavy Metals'] ? 'deep-purple accent-4' : ''"
                :text-color="lab['Heavy Metals'] ? 'white' : ''"
              >
                <v-icon left>{{
                  lab['Heavy Metals'] ? 'mdi-check-bold' : 'mdi-close-thick'
                }}</v-icon>
                Heavy Metals</v-chip
              >
              <v-chip
                class="mr-1 mb-1"
                :color="lab['Microbiological'] ? 'deep-purple accent-4' : ''"
                :text-color="lab['Microbiological'] ? 'white' : ''"
              >
                <v-icon left>{{
                  lab['Microbiological'] ? 'mdi-check-bold' : 'mdi-close-thick'
                }}</v-icon>
                Microbiological</v-chip
              >
              <v-chip
                class="mr-1 mb-1"
                :color="lab['Residual Solvents'] ? 'deep-purple accent-4' : ''"
                :text-color="lab['Residual Solvents'] ? 'white' : ''"
              >
                <v-icon left>{{
                  lab['Residual Solvents']
                    ? 'mdi-check-bold'
                    : 'mdi-close-thick'
                }}</v-icon>
                Residual Solvents</v-chip
              >
              <v-chip
                class="mr-1 mb-1"
                :color="lab['Moisture Activity'] ? 'deep-purple accent-4' : ''"
                :text-color="lab['Moisture Activity'] ? 'white' : ''"
              >
                <v-icon left>{{
                  lab['Moisture Activity']
                    ? 'mdi-check-bold'
                    : 'mdi-close-thick'
                }}</v-icon>
                Moisture Activity</v-chip
              >
              <v-chip
                class="mr-1 mb-1"
                :color="lab['Stability'] ? 'deep-purple accent-4' : ''"
                :text-color="lab['Stability'] ? 'white' : ''"
              >
                <v-icon left>{{
                  lab['Stability'] ? 'mdi-check-bold' : 'mdi-close-thick'
                }}</v-icon>
                Stability</v-chip
              >
            </v-card-text>

            <v-card-subtitle>Profiling</v-card-subtitle>
            <v-card-text>
              <v-chip
                class="mr-1 mb-1"
                :color="lab['Cannabinoid'] ? 'deep-purple accent-4' : ''"
                :text-color="lab['Cannabinoid'] ? 'white' : ''"
              >
                <v-icon left>{{
                  lab['Cannabinoid'] ? 'mdi-check-bold' : 'mdi-close-thick'
                }}</v-icon>
                Cannabinoid</v-chip
              >
              <v-chip
                class="mr-1 mb-1"
                :color="lab['Terpenes'] ? 'deep-purple accent-4' : ''"
                :text-color="lab['Terpenes'] ? 'white' : ''"
              >
                <v-icon left>{{
                  lab['Terpenes'] ? 'mdi-check-bold' : 'mdi-close-thick'
                }}</v-icon>
                Terpenes</v-chip
              >
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="3">
          <share-the-love-card
            :url="`https://laboverflow.com${$route.path}`"
            :title="pageTitle"
            :description="pageDescription"
            hashtags="lab directory, members directory, cannabis, testing, lab, laboverflow"
          ></share-the-love-card>
        </v-col>
      </v-row>
    </v-container>
    <!-- Snackbar  -->
    <v-snackbar v-model="snackbar" :timeout="timeout">
      Callback request has been sent

      <template #action="{ attrs }">
        <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </section>
</template>

<script>
import ogImage from '@/assets/img/laboverflow-bg.png'

export default {
  async asyncData({ $content, params, $ga }) {
    // Get lab data
    let lab = await $content('labs').where({ slug: params.lab }).fetch()
    lab = lab[0]

    // Convert numbert to string
    lab.Phone = `${lab.Phone}`

    // Clean data
    if (lab.Phone) {
      // console.log('lab.Phone', lab.Phone, typeof lab.Phone)

      lab.cleanPhone = lab.Phone.replace(/ /gi, '')
        .replace(/\(/gi, '')
        .replace(/\)/gi, '')
    } else {
      lab.cleanPhone = '-'
    }

    // Get data for meta description
    // =========
    // Get regions data for filters
    const allRegions = await $content('regions').fetch()
    const allLabs = await $content('labs').only(['Region']).fetch()
    allRegions.forEach((country) => {
      country.states.forEach((region) => {
        const labsInRegions = allLabs.filter(
          (lab) => lab.Region === region.abbreviation
        )
        region.labs = labsInRegions.length
      })
    })

    // Get formatted Country label - map params.country to slug
    const selectedCountry = allRegions.filter((country) => {
      return params.country === country.slug
    })

    // Get formatted Region label - map params.region to region name to get the abbreviation code
    const selectedRegion = selectedCountry[0].states.filter((region) => {
      return params.region === region.name.toLowerCase().replace(/ /gi, '-')
    })

    const country = selectedCountry[0].name
    const region = selectedRegion[0].name

    const pageTitle = `${lab.Lab} - ${region}, ${country}.`
    const pageDescription = `${lab.Lab} is a cannabis testing lab located in ${region}, ${country}. Request a callback or contact them directly.`
    // console.log('pageDescription', pageDescription)
    return {
      pageTitle,
      pageDescription,
      lab,
      params,
      $ga,
    }
  },
  data: () => ({
    snackbar: false,
    timeout: 2000,
    showRequestCallback: null,
    showDetails: null,
    requestForm: {
      name: '',
      email: '',
      phone: '',
      company: '',
      time: '',
      businessType: null,
    },
    validRequestForm: true,
    nameRules: [
      (v) => !!v || 'Name is required',
      // (v) => (v && v.length <= 10) || 'Name must be less than 10 characters',
    ],
    emailRules: [
      (v) => !!v || 'E-mail is required',
      (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ],
  }),
  head() {
    return {
      title: this.title,
      meta: [
        {
          hid: 'Lab Directory',
          name: 'description',
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
          content: `${process.env.baseURL}${ogImage}`,
        },
        {
          hid: 'og-url',
          property: 'og:url',
          content: `${process.env.baseURL}${this.$route.path}`,
        },
      ],
    }
  },
  computed: {
    fullName() {
      return `${this.lab['First Name']} ${this.lab['Last Name']}`
    },
  },
  methods: {
    showContactDetails() {
      this.showDetails = !this.showDetails

      const trackingEventData = {
        eventCategory: `${this.params.country}/${this.params.region}/${this.params.lab}`,
        eventAction: 'click',
        eventLabel: 'contact details clicked',
        eventValue: this.showDetails ? 'show' : 'hide',
      }

      // console.log(trackingEventData)
      this.$ga.event(trackingEventData)
    },
    showCallBack() {
      this.showRequestCallback = !this.showRequestCallback

      const trackingEventData = {
        eventCategory: `${this.params.country}/${this.params.region}/${this.params.lab}`,
        eventAction: 'click',
        eventLabel: 'request callback clicked',
        eventValue: this.showRequestCallback ? 'show' : 'hide',
      }

      // console.log(trackingEventData)
      this.$ga.event(trackingEventData)
    },
    sumitCallbackForm() {
      const form = this.$refs.labcallback
      form.submit()
      this.showRequestCallback = false
      this.snackbar = true
    },
  },
}
</script>
