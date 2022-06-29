<template>
  <article>
    <v-sheet
      class="deep-purple white--text d-flex flex-column justify-center py-3"
    >
      <v-container class="">
        <v-row class="">
          <v-col cols="12" md="8">
            <v-card-title>
              <h1 class="overline">Mastermind</h1>
            </v-card-title>
            <v-card-subtitle class="">
              <h2 class="display-1">
                Want to connect with like-minded lab professionals to share
                challenges, learn from each other, and hold each other
                accountable to achieve goals? Join the Mastermind community
              </h2>
            </v-card-subtitle>
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>
    <v-container>
      <v-row>
        <v-col cols="12" sm="9" lg="6">
          <form
            id="mastermind"
            ref="mastermind"
            method="POST"
            name="mastermind"
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

            <v-card>
              <input type="hidden" name="form-name" value="mastermind" />
              <input type="hidden" name="url" :value="$route.path" />

              <v-card-title
                >Fill in your details below. We will use this information to
                connect you with a group that matches your
                requirements</v-card-title
              >

              <v-card-text>
                <v-text-field
                  v-model="mastermind.data.name"
                  name="name"
                  label="Name"
                ></v-text-field>

                <v-text-field
                  v-model="mastermind.data.email"
                  name="email"
                  label="Email"
                ></v-text-field>

                <v-text-field
                  v-model="mastermind.data.location"
                  name="location"
                  label="Location"
                ></v-text-field>

                <v-text-field
                  v-model="mastermind.data.role"
                  name="role"
                  label="Role (e.g. CSO, Technician, Chemist, QA/QC)"
                ></v-text-field>
              </v-card-text>

              <v-card-title>Mastermind Details</v-card-title>
              <v-card-text>
                <v-checkbox
                  v-model="mastermind.data.week"
                  name="week"
                  label="I can commit to 1 hour per week"
                >
                </v-checkbox>
                <v-checkbox
                  v-model="mastermind.data.month"
                  name="month"
                  label="I can commit to 1 hour per month"
                >
                </v-checkbox>

                <v-checkbox
                  v-model="mastermind.data.inside"
                  name="inside"
                  label="Only connect me with people inside in state/region"
                >
                </v-checkbox>

                <v-checkbox
                  v-model="mastermind.data.inside"
                  name="samerole"
                  label="Only connect me with people in my role"
                >
                </v-checkbox>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="grey " text type="reset"> Cancel </v-btn>
                <v-btn type="submit" color="primary"> Submit </v-btn>
              </v-card-actions>
            </v-card>
          </form>
        </v-col>

        <!-- <v-col cols="12" sm="3" lg="6">
          <subscribe-to-jobs class=""></subscribe-to-jobs>
        </v-col> -->
      </v-row>
    </v-container>
  </article>
</template>

<script>
import ogImage from '@/assets/img/laboverflow-bg.png'

export default {
  data: () => ({
    mastermind: {
      data: {
        name: '',
        email: '',
        location: '',
        role: '',
        week: false,
        month: false,
        inside: false,
        samerole: false,
      },

      rules: {
        name: [
          (v) => !!v || 'Name is required',
          (v) => v.length < 3 || 'Name must be at least 3 characters',
        ],
        email: [
          (v) => !!v || 'Email is required',
          (v) => /.+@.+\..+/.test(v) || 'Email must be valid',
        ],
        location: [
          (v) => !!v || 'Location is required',
          (v) => v.length < 3 || 'Location must be at least 3 characters',
        ],
      },
      valid: false,
    },
  }),
  head() {
    return {
      title: 'Join a mastermind',
      meta: [
        {
          hid: 'Mastermind',
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
