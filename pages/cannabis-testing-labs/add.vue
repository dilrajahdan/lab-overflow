<template>
  <article>
    <v-sheet
      class="deep-purple white--text d-flex flex-column justify-center py-3"
    >
      <v-container class="">
        <v-row class="">
          <v-col cols="12" md="8">
            <v-card-title>
              <h1 class="overline">
                Submit your lab
                <!-- ({{ $vuetify.breakpoint.name }}) -->
              </h1>
            </v-card-title>
            <v-card-subtitle class="">
              <h2 class="display-1">
                Apply now to be featured on the Lab Overflow
              </h2>
            </v-card-subtitle>
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>
    <v-container>
      <v-row>
        <v-col>
          <form
            id="addlab"
            ref="addlab"
            method="POST"
            name="addlab"
            data-netlify
            data-netlify-honeypot="bot-field"
          >
            <p class="hidden">
              <label>
                Don’t fill this out if you’re human:
                <input name="bot-field" />
              </label>
            </p>
            <v-form
              v-model="addlab.valid"
              lazy-validation
              :rules="addlab.rules"
            >
              <v-card>
                <input type="hidden" name="form-name" value="addlab" />
                <input type="hidden" name="url" :value="$route.path" />

                <v-card-title class="display-1">Submit your lab</v-card-title>
                <!-- <v-card-text>
        <p>Email dilrajahdan@gmail.com with you lab details</p>
      </v-card-text> -->

                <!-- <v-card-title>Lab Details</v-card-title> -->

                <v-card-text>
                  <v-text-field
                    v-model="addlab.data.name"
                    name="lab"
                    label="Lab Name"
                    :rules="addlab.rules.lab"
                  ></v-text-field>

                  <v-text-field
                    v-model="addlab.data.address"
                    name="labAddress"
                    label="Lab Address"
                    :rules="addlab.rules.labAddress"
                  ></v-text-field>

                  <v-text-field
                    v-model="addlab.data.website"
                    name="labWebsite"
                    label="Lab Website"
                    type="url"
                    :rules="addlab.rules.labWebsite"
                  ></v-text-field>
                </v-card-text>

                <v-card-title>Contact Details</v-card-title>
                <v-card-text>
                  <v-text-field
                    v-model="addlab.data.contact_name"
                    name="labContactName"
                    label="Contact Name"
                    :rules="addlab.rules.contact_name"
                  ></v-text-field>

                  <v-text-field
                    v-model="addlab.data.contact_phone"
                    name="labContactPhone"
                    label="Contact Phone"
                    type="tel"
                    :rules="addlab.rules.contact_phone"
                  ></v-text-field>

                  <v-text-field
                    v-model="addlab.data.contact_email"
                    name="labContactEmail"
                    label="Contact Email"
                    type="email"
                    :rules="addlab.rules.contact_email"
                  ></v-text-field>

                  <v-text-field
                    v-model="addlab.data.role"
                    name="labContactRole"
                    label="Role (e.g Lab Director)"
                    :rules="addlab.rules.role"
                  ></v-text-field>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="grey " text @click="labDialog = false">
                    Cancel
                  </v-btn>
                  <v-btn
                    type="submit"
                    color="primary"
                    :disabled="!addlab.valid"
                  >
                    Submit
                  </v-btn>
                </v-card-actions>
                <!-- 
                <pre>{{ addlab.valid }}</pre>
                <pre>{{ addlab }}</pre> -->
              </v-card>
            </v-form>
          </form>
        </v-col>
      </v-row>
    </v-container>
  </article>
</template>

<script>
import ogImage from '@/assets/img/laboverflow-bg.png'

export default {
  data: () => ({
    timeout: 2000,
    snackbar: false,
    labDialog: false,
    addlab: {
      data: {
        name: '',
        address: '',
        website: '',
        contact_name: '',
        contact_phone: '',
        contact_email: '',
        role: '',
      },
      rules: {
        name: [
          (v) => !!v || 'Lab name is required',
          (v) => v.length <= 50 || 'Lab name must be less than 50 characters',
        ],
        address: [
          (v) => !!v || 'Lab address is required',
          (v) =>
            v.length <= 50 || 'Lab address must be less than 50 characters',
        ],
        phone: [
          (v) => !!v || 'Lab phone is required',
          (v) => v.length <= 20 || 'Lab phone must be less than 20 characters',
        ],
        email: [
          (v) => !!v || 'Lab email is required',
          (v) =>
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || // eslint-disable-line
            'Please enter a valid email address',
        ],
        website: [
          (v) => !!v || 'Lab website is required',
          (v) =>
            v.length <= 50 || 'Lab website must be less than 50 characters',
        ],
        contact_name: [
          (v) => !!v || 'Lab contact name is required',
          (v) =>
            v.length <= 50 ||
            'Lab contact name must be less than 50 characters',
        ],
        contact_phone: [
          (v) => !!v || 'Lab contact phone is required',
          (v) =>
            v.length <= 20 ||
            'Lab contact phone must be less than 20 characters',
        ],
        contact_email: [
          (v) => !!v || 'Lab contact email is required',
          (v) =>
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || // eslint-disable-line
            'Please enter a valid email address',
        ],
        role: [
          (v) => !!v || 'Lab role is required',
          (v) => v.length <= 50 || 'Lab role must be less than 50 characters',
        ],
      },
      valid: false,
    },
  }),
  head() {
    return {
      title: this.title,
      meta: [
        {
          hid: 'Lab Directory',
          name: 'description',
          content: this.description,
        },
        { hid: 'og-type', property: 'og:type', content: 'website' },
        { hid: 'og-title', property: 'og:title', content: this.title },
        {
          hid: 'og-desc',
          property: 'og:description',
          content: this.description,
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
  mounted() {
    // this.title = 'Lab Directory'
    // this.description =
    //   'Find the lab you need, or add your lab to the directory.'
    //  trigger validation
    // this.$refs.addlab.validate()
  },
  methods: {
    submitAddLabForm() {
      const form = this.$refs.addlab
      console.log('form', form)
      form.submit()
      this.labDialog = false
      this.snackbar = true
    },
  },
}
</script>
