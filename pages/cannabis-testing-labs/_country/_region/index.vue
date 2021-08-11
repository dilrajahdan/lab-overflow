<template>
  <div>
    <v-row>
      <v-col>
        <!-- <v-card height="500" color="deep-purple" dark tile>
          <v-container>
            <v-card-text>Sponsor</v-card-text>
            <v-card-title>You lab name here</v-card-title>
            <v-card-subtitle
              >Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Commodi, optio.</v-card-subtitle
            >

          </v-container>
        </v-card> -->
      </v-col>
    </v-row>

    <v-container>
      <h1 class="display-1 my-6">
        Cannabis Testing Labs in {{ params.country.toUpperCase() }},
        {{ params.region.toUpperCase() }}
      </h1>

      <!-- <h2>{{ $route.params }}</h2> -->

      <!-- <p>Path: {{ $route.path }}</p> -->
      <!-- <p>params: {{ params }}</p> -->
      <!-- <p>country: {{ country }}</p>
    <p>region: {{ region }}</p> -->

      <!-- <v-row>
        <v-col> </v-col>
      </v-row> -->
      <v-row>
        <v-col class="" cols="3">
          <h3 class="overline">Filter</h3>
          <v-select v-model="selectedCountry" :items="['USA', 'Canada']">
          </v-select>

          <v-list dense>
            <v-list-item-group v-model="selectedRegion" color="primary">
              <v-list-item v-for="(item, i) in 5" :key="i">
                <v-list-item-content>
                  <v-list-item-title>California {{ item }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>

          <!-- <ul>
            <li v-for="i in 5" :key="i">
              <nuxt-link :to="i">California {{ i }}</nuxt-link>
            </li>
          </ul> -->
        </v-col>
        <v-col cols="9" class="greenC">
          <v-row>
            <v-col cols="9" class="yellowC">
              <v-list two-line>
                <v-list-item-group v-model="selected">
                  <template v-for="(item, index) in items">
                    <v-list-item
                      :key="item.title"
                      :to="{ path: `${params.region}/sigma` }"
                    >
                      <template #default="{ active }">
                        <v-list-item-content>
                          <v-list-item-title
                            v-text="item.title"
                          ></v-list-item-title>

                          <v-list-item-subtitle
                            class="text--primary"
                            v-text="item.headline"
                          ></v-list-item-subtitle>

                          <v-list-item-subtitle
                            v-text="item.subtitle"
                          ></v-list-item-subtitle>
                        </v-list-item-content>

                        <v-list-item-action>
                          <!-- <v-list-item-action-text
                            v-text="item.action"
                          ></v-list-item-action-text> -->
                          <v-icon color="yellow darken-3">
                            mdi-certificate
                          </v-icon>

                          <v-icon v-if="!active" color="grey lighten-1">
                            mdi-car-pickup
                          </v-icon>

                          <v-icon v-else color="yellow darken-3">
                            mdi-car-pickup
                          </v-icon>
                        </v-list-item-action>
                      </template>
                    </v-list-item>

                    <v-divider
                      v-if="index < items.length - 1"
                      :key="index"
                    ></v-divider>
                  </template>
                </v-list-item-group>
              </v-list>
            </v-col>
            <v-col cols="3" class="orangeX"
              ><v-card flat color="deep-purple mb-3" dark height="150"
                ><v-card-text>Sponsor</v-card-text>
              </v-card>

              <v-card flat color="pink mb-3" dark height="150"
                ><v-card-text>Add Your Lab</v-card-text>
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
      selectedRegion: '1',
      items: [
        {
          action: '15 min',
          headline: 'Mr Ashton Abrahim',
          subtitle: `124 Catherine Gardens, Hounslow, Middlesex, TW3 2PW`,
          title: 'Sigma Analytical',
        },
        {
          action: '2 hr',
          headline: 'Summer BBQ',
          subtitle: `Wish I could come, but I'm out of town this weekend.`,
          title: 'me, Scrott, Jennifer',
        },
        {
          action: '6 hr',
          headline: 'Oui oui',
          subtitle: 'Do you have Paris recommendations? Have you ever been?',
          title: 'Sandra Adams',
        },
        {
          action: '12 hr',
          headline: 'Birthday gift',
          subtitle:
            'Have any ideas about what we should get Heidi for her birthday?',
          title: 'Trevor Hansen',
        },
        {
          action: '18hr',
          headline: 'Recipe to try',
          subtitle:
            'We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
          title: 'Britta Holt',
        },
      ],
    }
  },
}
</script>
