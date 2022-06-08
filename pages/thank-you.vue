<template>
  <section>
    <v-card
      color="deep-purple"
      dark
      tile
      class="d-flex align-center flex-column py-3"
    >
      <v-container>
        <v-row>
          <v-col cols="12" md="8" offset-md="0" lg="6" xl="4" class="">
            <v-card-title>
              <h1 class="overline">Thank you</h1>
            </v-card-title>
            <v-card-subtitle class="">
              <h2 class="display-1">
                Book a call to see how we can help each other out
              </h2>
            </v-card-subtitle>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
    <v-container>
      <v-card>
        <!-- Calendly inline widget begin -->
        <div
          class="calendly-inline-widget"
          data-url="https://calendly.com/dil-ahdan/lab-chat?hide_event_type_details=1&hide_gdpr_banner=1"
          style="min-width: 320px; height: 630px"
        ></div>
        <script
          type="text/javascript"
          src="https://assets.calendly.com/assets/external/widget.js"
          async
        ></script>
        <!-- Calendly inline widget end -->
        <!-- <v-card-actions>
          <v-btn to="/">Back to home</v-btn>
        </v-card-actions> -->
      </v-card>
    </v-container>
  </section>
</template>
