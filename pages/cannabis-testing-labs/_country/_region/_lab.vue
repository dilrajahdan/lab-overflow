<template>
  <v-container>
    <!-- <h2>{{ $route.params }}</h2> -->
    <nuxt-link class="my-6 d-block" to="/">Back to results</nuxt-link>
    <!-- <p>Cannabis Testing Lab in Canada, BC</p> -->
    <!-- <v-breadcrumbs :items="items"></v-breadcrumbs> -->

    <header class="details-header">
      <!-- <h1>Lab Details</h1> -->
      <h2 class="overline">Cannabis Testing Lab in Canada, BC</h2>
    </header>

    <div class="details-body">
      <v-card class="mx-autoD">
        <v-img
          src="/testalize-me-0jE8ynV4mis-unsplash.jpg"
          height="200px"
        ></v-img>

        <v-card-title> Sigma Analytical </v-card-title>

        <v-card-subtitle> Mr A Abrahim </v-card-subtitle>

        <v-card-text>
          <p>
            <v-icon color="yellow darken-3"> mdi-certificate </v-icon> GMP
            Certified
          </p>
          <p>
            <v-icon v-if="!active" color="grey lighten-1">
              mdi-car-pickup
            </v-icon>

            <v-icon v-else color="yellow darken-3"> mdi-car-pickup </v-icon>
            Pick-up Service
          </p>
        </v-card-text>

        <v-card-actions>
          <v-btn color="primary" text @click="show = !show"> Contact </v-btn>

          <v-spacer></v-spacer>

          <v-btn icon @click="show = !show">
            <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
          </v-btn>
        </v-card-actions>

        <v-expand-transition>
          <div v-show="show">
            <v-divider></v-divider>

            <v-row>
              <v-col>
                <v-card-text class="pb-0"> Phone </v-card-text>
                <v-card-subtitle class="pt-0 font-weight-bold"
                  ><a href="tel:000000000">000-000-000</a></v-card-subtitle
                >
              </v-col>
              <v-col>
                <v-card-text class="pb-0"> Email </v-card-text>
                <v-card-subtitle class="pt-0 font-weight-bold"
                  ><a href="mailto:email@lab.com"
                    >email@lab.com</a
                  ></v-card-subtitle
                >
              </v-col>
              <v-col>
                <v-card-text class="pb-0"> URL </v-card-text>
                <v-card-subtitle class="pt-0 font-weight-bold"
                  ><a href="http://sigma.com">sigma.com</a></v-card-subtitle
                >
              </v-col>
            </v-row>
          </div>
        </v-expand-transition>
      </v-card>

      <v-card :loading="loading" class="Xmx-auto my-6">
        <template slot="progress">
          <v-progress-linear
            color="deep-purple"
            height="10"
            indeterminate
          ></v-progress-linear>
        </template>

        <!-- <v-img
          height="200"
          src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
        ></v-img> -->

        <v-card-title>Assays performed</v-card-title>

        <!-- <v-card-title>Tonight's availability</v-card-title> -->

        <v-card-text>
          <v-chip-group
            v-model="assaySelection"
            active-class="deep-purple accent-4 white--text"
            column
            multiple
          >
            <v-chip>Pesticides</v-chip>

            <v-chip>Mycotoxins</v-chip>

            <v-chip>Heavy Metals</v-chip>

            <v-chip>Microbiological</v-chip>
            <v-chip>Residual Solvents</v-chip>
            <v-chip>Moisture Activity</v-chip>
            <v-chip>Terpenes</v-chip>
            <v-chip>Cannabinoid</v-chip>
            <v-chip>Stability</v-chip>
          </v-chip-group>
        </v-card-text>

        <v-card-title>Company information</v-card-title>
        <v-row>
          <v-col>
            <v-card-text class="pb-0"> Licence </v-card-text>
            <v-card-subtitle class="pt-0 font-weight-bold"
              >000-000-000</v-card-subtitle
            >
          </v-col>
          <v-col>
            <v-card-text class="pb-0"> Licence type</v-card-text>
            <v-card-subtitle class="pt-0 font-weight-bold"
              >Analytical Testing</v-card-subtitle
            >
          </v-col>
        </v-row>
      </v-card>
    </div>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    show: null,
    assaySelection: [0, 1, 2, 3, 4, 5, 6, 7],
    items: [
      {
        text: 'USA',
        disabled: false,
        href: 'breadcrumbs_dashboard',
      },
      {
        text: 'CA',
        disabled: false,
        href: 'breadcrumbs_link_1',
      },
      {
        text: 'Sigma',
        disabled: true,
        href: 'breadcrumbs_link_2',
      },
    ],
  }),
}
</script>
