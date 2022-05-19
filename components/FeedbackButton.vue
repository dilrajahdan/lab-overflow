<template>
  <div class="feedback">
    <v-tooltip left>
      <!--  on, attrs  -->
      <template #activator="{ on, attrs }">
        <v-btn
          tile
          class="feedback__button"
          color="deep-purple accent-3"
          right
          bottom
          dark
          fixed
          v-bind="attrs"
          v-on="on"
          @click="dialog = true"
        >
          <v-icon left>mdi-comment-quote</v-icon> Feedback
        </v-btn>
      </template>
      <span>We'd ❤️ your feedback</span>
    </v-tooltip>
    <v-dialog
      v-model="dialog"
      transition="slide-x-reverse-transition"
      max-width="500px"
    >
      <form
        ref="feedback"
        method="POST"
        name="feedback"
        data-netlify
        data-netlify-honeypot="bot-field"
        action="/thank-you"
      >
        <input type="hidden" name="form-name" value="feedback" />

        <v-card>
          <v-card-title>
            <span class="headline mb-6"
              >See a bug? or have an idea of what we should build next?</span
            >
          </v-card-title>
          <v-card-subtitle>
            <span class="body-1"
              >We are 2 humans so be nice and we will sort it ;)</span
            >
          </v-card-subtitle>
          <!-- {{ params }} -->

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
              @click.prevent="submitFeedback($event)"
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
    encode(data) {
      return Object.keys(data)
        .map(
          (key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key])
        )
        .join('&')
    },

    submitFeedback() {
      // add data to firebase
      // debugger

      this.$fire.firestore
        .collection('feedback')
        .add({
          name: this.feedbackForm.name,
          email: this.feedbackForm.name,
          feedback: this.feedbackForm.name,
          url: this.$route.path,
          created: this.$fireModule.firestore.FieldValue.serverTimestamp(),
        })
        .then(() => {
          this.loading = false
          this.dialog = false
          this.snackbar = true

          this.feedbackForm = {
            name: '',
            email: '',
            feedback: '',
          }
        })
        .catch((error) => {
          this.loading = false
          console.error('Error adding document: ', error)
        })

      const form = this.$refs.feedback
      form.submit()
    },
  },
}
</script>

<style lang="scss">
.feedback__button {
  right: 0;
  top: 50%;
  transform: rotate(90deg) translateY(-50%) translateX(50%);
  transform-origin: top right;
  z-index: 9;
}
</style>
