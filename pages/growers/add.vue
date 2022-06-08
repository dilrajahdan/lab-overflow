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
                Are you a grower?
                <!-- ({{ $vuetify.breakpoint.name }}) -->
              </h1>
            </v-card-title>
            <v-card-subtitle class="">
              <h2 class="display-1">
                Get featured on Lab Overflow and let us help you connect with
                the best labs in your area. Apply today!
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
            id="addgrower"
            ref="addgrower"
            method="POST"
            name="addgrower"
            data-netlify
            data-netlify-honeypot="bot-field"
            action="/thank-you"
          >
            <p class="hidden">
              <label>
                Don’t fill this out if you’re human:
                <input name="bot-field" />
              </label>
            </p>
            <!-- <v-form
              v-model="addgrower.valid"
              lazy-validation
              :rules="addgrower.rules"
            > -->
            <v-card>
              <input type="hidden" name="form-name" value="addgrower" />
              <input type="hidden" name="url" :value="$route.path" />

              <v-card-title class="display-1"
                >Submit your cannabis business</v-card-title
              >
              <!-- <v-card-text>
        <p>Email dilrajahdan@gmail.com with you lab details</p>
      </v-card-text> -->

              <!-- <v-card-title>Lab Details</v-card-title> -->

              <v-card-text>
                <v-text-field
                  v-model="addgrower.data.name"
                  name="business"
                  label="Business Name"
                ></v-text-field>

                <v-text-field
                  v-model="addgrower.data.address"
                  name="businessAddress"
                  label="Business Address"
                ></v-text-field>

                <v-text-field
                  v-model="addgrower.data.website"
                  name="businessWebsite"
                  label="Business Website"
                  type="url"
                ></v-text-field>
              </v-card-text>

              <v-card-title>Contact Details</v-card-title>
              <v-card-text>
                <v-text-field
                  v-model="addgrower.data.contact_name"
                  name="businessContactName"
                  label="Contact Name"
                ></v-text-field>

                <v-text-field
                  v-model="addgrower.data.contact_phone"
                  name="businessContactPhone"
                  label="Contact Phone"
                  type="tel"
                ></v-text-field>

                <v-text-field
                  v-model="addgrower.data.contact_email"
                  name="businessContactEmail"
                  label="Contact Email"
                  type="email"
                ></v-text-field>

                <v-text-field
                  v-model="addgrower.data.role"
                  name="businessContactRole"
                  label="Role (e.g Lab Director)"
                ></v-text-field>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="grey " text @click="labDialog = false">
                  Cancel
                </v-btn>
                <v-btn type="submit" color="primary"> Submit </v-btn>
              </v-card-actions>
              <!-- 
                <pre>{{ addgrower.valid }}</pre>
                <pre>{{ addgrower }}</pre> -->
            </v-card>
            <!-- </v-form> -->
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
    addgrower: {
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
          (v) => !!v || 'Business name is required',
          (v) =>
            v.length <= 50 || 'Business name must be less than 50 characters',
        ],
        address: [
          (v) => !!v || 'Business address is required',
          (v) =>
            v.length <= 50 ||
            'Business address must be less than 50 characters',
        ],
        phone: [
          (v) => !!v || 'Business phone is required',
          (v) =>
            v.length <= 20 || 'Business phone must be less than 20 characters',
        ],
        email: [
          (v) => !!v || 'Business email is required',
          (v) =>
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || // eslint-disable-line
            'Please enter a valid email address',
        ],
        website: [
          (v) => !!v || 'Business website is required',
          (v) =>
            v.length <= 50 ||
            'Business website must be less than 50 characters',
        ],
        contact_name: [
          (v) => !!v || 'Business contact name is required',
          (v) =>
            v.length <= 50 ||
            'Business contact name must be less than 50 characters',
        ],
        contact_phone: [
          (v) => !!v || 'Business contact phone is required',
          (v) =>
            v.length <= 20 ||
            'Business contact phone must be less than 20 characters',
        ],
        contact_email: [
          (v) => !!v || 'Business contact email is required',
          (v) =>
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || // eslint-disable-line
            'Please enter a valid email address',
        ],
        role: [
          (v) => !!v || 'Business role is required',
          (v) =>
            v.length <= 50 || 'Business role must be less than 50 characters',
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
          hid: 'Grower Directory',
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
}
</script>
