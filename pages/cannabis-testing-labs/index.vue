<template>
  <div>
    <v-card color="deep-purple" dark tile class="py-3">
      <v-container>
        <v-row>
          <v-col cols="12" md="8" offset-md="0" lg="6" xl="4">
            <v-card-title>
              <h1 class="overline">Lab directory</h1>
            </v-card-title>
            <v-card-subtitle class="">
              <h2 class="display-1">
                Find a cannabis testing labs in your area
              </h2>
            </v-card-subtitle>

            <v-card-text>
              <v-autocomplete
                class=""
                outlined
                hide-details
                filled
                label="Search region"
                :items="searchList"
                return-object
                item-value="region"
                item-text="region"
                :menu-props="{
                  closeOnContentClick: true,
                  closeOnClick: true,
                }"
                autocomplete="off"
              >
                <template #item="{ item }">
                  <v-list-item
                    link
                    exact
                    :to="`/cannabis-testing-labs/${item.countrySlug}/${item.regionSlug}`"
                  >
                    {{ item.region }}, {{ item.country }} ({{ item.labs }})
                  </v-list-item>
                </template>
              </v-autocomplete>
            </v-card-text>
          </v-col>
          <!-- <v-col cols="12" sm="10" md="8" offset-md="0" lg="6" xl="4">
            <v-card-subtitle class="body-2">
              Finding a cannabis testing lab can be difficult.
            </v-card-subtitle>
            <v-card-subtitle class="body-2"
              >Lab Overflow helps you find state-regulated cannabis testing labs
              with ISO 17025 accreditation near you.
            </v-card-subtitle>

            <v-card-subtitle class="body-2"
              >Filter by region, assay, pick-up service, or accreditation
              status. Lab Overflow helps you find a trusted laboratory to test
              your product for potency and quality assurance.
            </v-card-subtitle>
          </v-col> -->
        </v-row>
      </v-container>
    </v-card>

    <v-container class="mt-3">
      <v-row>
        <v-col cols="12" sm="4" lg="4" offset-lg="0">
          <v-card>
            <v-list dense>
              <v-subheader>Canada</v-subheader>
              <v-list-item-group v-model="selectedItem" color="primary">
                <v-list-item
                  v-for="item in regionsCanada.states"
                  :key="`usa-${item.name}`"
                  :to="{
                    name: 'cannabis-testing-labs-country-region',
                    params: {
                      region: item.name.toLowerCase().replace(/ /gi, '-'),
                      country: regionsCanada.slug,
                    },
                  }"
                >
                  <v-list-item-content>
                    <v-list-item-title
                      >{{ item.name }} ({{ item.labs }})</v-list-item-title
                    >
                    <!-- <v-list-item-subtitle>{{ item }}</v-list-item-subtitle> -->
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-card>
        </v-col>
        <v-col cols="12" sm="4" lg="4" offset-lg="0">
          <v-card>
            <v-list dense>
              <v-subheader>Europe</v-subheader>
              <v-list-item-group v-model="selectedItem" color="primary">
                <v-list-item
                  v-for="item in regionsEurope.states"
                  :key="`usa-${item.name}`"
                  :to="{
                    name: 'cannabis-testing-labs-country-region',
                    params: {
                      region: item.name.toLowerCase().replace(/ /gi, '-'),
                      country: regionsEurope.slug,
                    },
                  }"
                >
                  <v-list-item-content>
                    <v-list-item-title
                      >{{ item.name }} ({{ item.labs }})</v-list-item-title
                    >
                    <!-- <v-list-item-subtitle>{{ item }}</v-list-item-subtitle> -->
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-card>
        </v-col>
        <v-col cols="12" sm="4" lg="4" offset-lg="0">
          <v-card>
            <v-list dense>
              <v-subheader>USA</v-subheader>
              <v-list-item-group v-model="selectedItem" color="primary">
                <v-list-item
                  v-for="item in regionsUSA.states"
                  :key="`usa-${item.name}`"
                  :to="{
                    name: 'cannabis-testing-labs-country-region',
                    params: {
                      region: item.name.toLowerCase().replace(/ /gi, '-'),
                      country: regionsUSA.slug,
                    },
                  }"
                >
                  <v-list-item-content>
                    <v-list-item-title
                      >{{ item.name }} ({{ item.labs }})</v-list-item-title
                    >
                    <!-- <v-list-item-subtitle>{{ item }}</v-list-item-subtitle> -->
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  async asyncData({ $content, params }) {
    const allRegions = await $content('regions').fetch()

    // Get regions of labs for list
    const labs = await $content('labs').only(['Region']).fetch()

    const searchList = []
    /*
      loop thru every regions per country.
      calc how many labs are in that region
      update prop 'lab' with length
    */

    allRegions.forEach((country) => {
      country.states.forEach((region) => {
        // Get country label from country code
        const labsInRegions = labs.filter(
          (lab) => lab.Region === region.abbreviation
        )
        region.labs = labsInRegions.length

        // Create clean array of regions
        searchList.push({
          countrySlug: country.slug,
          country: country.name,
          regionSlug: region.name.toLowerCase().replace(/ /gi, '-'),
          region: region.name,
          code: region.abbreviation,
          labs: region.labs,
        })
      })
    })

    // console.log('searchList', searchList)

    return {
      searchList,
      allRegions,
      labs,
      params,
    }
  },
  data: () => ({
    selectedItem: null,
    title: 'Cannabis Testing Lab Directory',
  }),
  head() {
    return {
      title: this.title,
      meta: [
        {
          hid: 'Lab Directory',
          name: 'description',
          content: `Lab Overflow's Lab Directory is the world’s leading platform for searching, comparing and selecting cannabis testing labs.`,
        },
      ],
    }
  },

  computed: {
    regionsUSA() {
      return this.allRegions.filter(
        (country) => country.name === 'United States'
      )[0]
    },
    regionsCanada() {
      return this.allRegions.filter((country) => country.name === 'Canada')[0]
    },
    regionsEurope() {
      return this.allRegions.filter((country) => country.name === 'Europe')[0]
    },
  },
  methods: {
    slugize(str) {
      return str.toLowerCase().replace(/ /gi, '-')
    },
  },
}
</script>
