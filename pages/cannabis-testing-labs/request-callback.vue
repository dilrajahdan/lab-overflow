<template>
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

    <v-card>
      <v-card-title>
        <!-- {{ $route.params }} -->
        <span class="text-h5">Request callback from {{ lab.Lab }}</span>
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
                name="name"
                type="text"
                class="my-0X"
                label="Name*"
                required
              ></v-text-field>
              <v-text-field
                name="email"
                type="email"
                class="my-0X"
                label="Email*"
                required
              ></v-text-field>
              <v-text-field
                name="phone"
                type="tel"
                class="my-0X"
                label="Phone*"
                required
              ></v-text-field>

              <v-select
                name="time"
                :items="['Morning', 'Afternoon', 'Evening']"
                label="Best time to phone*"
                required
              ></v-select>
            </v-col>

            <v-col cols="12" sm="6">
              <span>Business type</span>
              <v-radio-group mandatory>
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
                <v-radio name="businessType" label="Lab" value="Lab"></v-radio>
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
        <v-btn text @click="showRequestCallback = false"> Cancel </v-btn>
        <v-btn color="primary" type="submit"> Request callback </v-btn>
      </v-card-actions>
    </v-card>
  </form>
</template>
