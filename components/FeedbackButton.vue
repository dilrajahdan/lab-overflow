<template>
  <div>
    <v-tooltip top left>
      <!--  on, attrs  -->
      <template #activator="{ on, attrs }">
        <v-btn
          color="deep-purple accent-3"
          fab
          dark
          fixed
          bottom
          right
          v-bind="attrs"
          v-on="on"
          @click="dialog = true"
        >
          <v-icon>mdi-comment-quote</v-icon>
        </v-btn>
      </template>
      <span>I'd ❤️ your feedback</span>
    </v-tooltip>
    <v-dialog v-model="dialog" max-width="500px">
      <form
        ref="feedback"
        method="POST"
        name="feedback"
        data-netlify
        data-netlify-honeypot="bot-field"
        action="/thanks"
      >
        <input type="hidden" name="form-name" value="feedback" />
        <v-card>
          <v-card-title>
            <span class="headline mb-6"
              >What should I build or improve next?</span
            >
          </v-card-title>
          <v-card-subtitle>
            <span class="body-1">Be nice :)</span>
          </v-card-subtitle>
          <v-card-text>
            <v-text-field
              v-model="feedbackForm.name"
              label="Name"
              name="name"
              color="primary"
            />
            <v-text-field
              v-model="feedbackForm.email"
              label="Email"
              name="email"
              type="email"
              required
              color="primary"
            />
            <v-textarea
              v-model="feedbackForm.feedback"
              name="feedback"
              auto-grow
              label="Feeback"
              required
              color="primary"
            />
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="" text @click="dialog = false"> Cancel </v-btn>

            <v-btn
              type="submit"
              color="primary"
              text
              :disabled="
                feedbackForm.email === '' && feedbackForm.feedback === ''
              "
              @click.stop.prevent="submitFeedback()"
            >
              Send
            </v-btn>
          </v-card-actions>
        </v-card>
      </form>
    </v-dialog>
    <v-snackbar v-model="snackbar" :timeout="2000">
      Thank you for your feedback!
    </v-snackbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      snackbar: false,
      dialog: false,
      feedbackForm: {
        name: '',
        email: '',
        feedback: '',
      },
    }
  },
  methods: {
    submitFeedback() {
      // add data to firebase
      this.$fire.firestore
        .collection('feedback')
        .add({
          name: this.feedbackForm.name,
          email: this.feedbackForm.name,
          feedback: this.feedbackForm.name,
        })
        .then(() => {
          this.loading = false
          this.dialog = false
          this.snackbar = true

          this.feedbackForm = {
            name: '',
            email: '',
            feedback: '',
            // url: this.$route.
          }
        })
        .catch((error) => {
          this.loading = false
          console.error('Error adding document: ', error)
        })

      // this.dialog = false
      // this.snackbar = true

      // post form via axios
      // this.$axios.baseURL(process.env.baseURL)

      // this.$axios
      //   .post('/thanks', this.feedbackForm)
      //   .then((response) => {
      //     console.log(response)
      //   })
      //   .catch((error) => {
      //     console.log(error)
      //   })

      // const form = this.$refs.feedback
      // form.submit()
    },
  },
}
</script>
