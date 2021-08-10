<template>
  <div>
    <v-row>
      <v-col>
        <v-card height="500" color="deep-purple" dark
          ><v-card-text>Sponsor</v-card-text></v-card
        >
      </v-col>
    </v-row>
    <v-container>
      <h1 class="display-1">
        Cannabis Testing Labs in {{ params.country }},
        {{ params.region }}
      </h1>

      <h2>{{ $route.params }}</h2>

      <!-- <p>Path: {{ $route.path }}</p> -->
      <!-- <p>params: {{ params }}</p> -->
      <!-- <p>country: {{ country }}</p>
    <p>region: {{ region }}</p> -->

      <!-- <v-row>
        <v-col> </v-col>
      </v-row> -->
      <v-row>
        <v-col class="pink" cols="3">
          <v-subheader>Filter</v-subheader>
          <v-select v-model="selectedCountry" :items="['USA', 'Canada']">
          </v-select>
          <ul>
            <li v-for="i in 5" :key="i">
              <nuxt-link :to="i">California {{ i }}</nuxt-link>
            </li>
          </ul>
        </v-col>
        <v-col cols="9" class="green">
          <v-row>
            <v-col cols="9" class="yellow">
              <ul>
                <li>
                  <nuxt-link :to="{ path: `${params.region}/sigma` }"
                    >Sigma</nuxt-link
                  >
                </li>
                <li v-for="i in 5" :key="i">{{ i }}</li>
              </ul>
            </v-col>
            <v-col cols="3" class="orange"
              ><v-card color="blue lighten-1 mb-3"
                ><v-card-text>Sponsor</v-card-text>
              </v-card>

              <v-card color="blue lighten-1"
                ><v-card-text>Sponsor</v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
export default {
  asyncData({ params }) {
    // console.log('params',params)
    // const country = params.country // When calling /abc the slug will be "abc"
    // const region = params.region // When calling /abc the slug will be "abc"
    // return { country, region , params}
    return { params }
  },
  data() {
    return {
      selectedCountry: 'USA',
    }
  },
}
</script>
