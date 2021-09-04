<template>
  <section>
    <!-- <v-card
      color="deep-purple"
      dark
      tile
      class="d-flexC align-center flex-column py-9"
    >
      <v-container>
        <v-row>
          <v-col cols="6">
            <v-card-subtitle class="overline py-0">Sponsor</v-card-subtitle>
            <v-card-title>Your Lab here</v-card-title>
            <v-card-subtitle
              >Thousands of eyeballs every months</v-card-subtitle
            >
          </v-col>
          <v-col cols="6">
            <v-img
              src="/logo.png"
              height="150"
              class="deep-purple darken-2 mr-3"
            ></v-img>
          </v-col>
        </v-row>
      </v-container>
    </v-card> -->

    <v-container fluid class="mt-3">
      <v-row>
        <v-col class="" cols="12" md="3">
          <v-card color="">
            <!-- <v-subheader>Filters</v-subheader> -->
            <v-card-subtitle>Filter</v-card-subtitle>
            <v-card-text v-if="!$vuetify.breakpoint.mdAndUp">
              <v-autocomplete
                v-model="selectedRegionItem"
                :items="searchList"
                item-text="region"
                item-value="region"
                return-object
                label="Region"
                autocomplete="off"
                :menu-props="{
                  closeOnContentClick: true,
                  closeOnClick: false,
                }"
              >
                <template #item="{ item }">
                  <v-list-item link exact @change="changeRegion(item)">
                    {{ item.region }}, {{ item.country }} ({{ item.labs }})
                  </v-list-item>
                </template>
                <template #selection="{ item }">
                  {{ item.region }}, {{ item.country }}
                  <!-- </v-list-item> -->
                </template>
              </v-autocomplete>
            </v-card-text>

            <v-card-text v-else>
              <p class="overline">Country</p>
              <v-radio-group v-model="country" @change="changeCountry(country)">
                <v-radio label="Canada" value="canada"></v-radio>
                <v-radio label="Europe" value="europe"></v-radio>
                <v-radio label="USA" value="usa"></v-radio>
                <!-- <v-radio label="Europe" value="europe"></v-radio> -->
              </v-radio-group>

              <p class="overline mb-0 pb-0">Region</p>

              <v-list dense color="">
                <v-list-item-group v-model="region" color="primary">
                  <v-list-item
                    v-for="(item, i) in selectedCountry[0].states"
                    :key="i"
                    :to="{ path: slugize(item.name) }"
                  >
                    <v-list-item-content>
                      <v-list-item-title>
                        {{ item.name }} ({{ item.labs }})
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="3" order-md="2" class=""
          ><v-card
            class="sticky-box"
            :href="`mailto:admin@laboverflow.com?subject=Advertize on Lab Overflow, ${regionLabel}, ${countryLabel}`"
            ><v-card-text>Advertize here</v-card-text>
          </v-card>

          <!-- <v-card color="pink mb-3" dark
                ><v-card-text>Submit you Lab</v-card-text>
              </v-card> -->
        </v-col>

        <v-col cols="12" md="6" order-md="1" class="greenC">
          <v-row>
            <v-col cols="12" class="yellowC">
              <v-card>
                <v-card-title>
                  Cannabis testing labs in
                  {{ regionLabel }},
                  {{ countryLabel }}
                </v-card-title>
                <v-list v-if="labs.length" three-line>
                  <v-list-item-group>
                    <template v-for="(item, index) in labs">
                      <v-list-item
                        :key="item.slug"
                        :to="{ path: `${params.region}/${item.slug}` }"
                      >
                        <template #default="{}">
                          <v-img
                            src="/logo.png"
                            class="mr-4 grey lighten-2"
                            max-width="64"
                            min-width="64"
                          ></v-img>
                          <v-list-item-content>
                            <v-list-item-title
                              v-text="item['Lab']"
                            ></v-list-item-title>

                            <v-list-item-subtitle
                              class="text--primary"
                              v-text="item['Address']"
                            ></v-list-item-subtitle>

                            <v-list-item-subtitle
                              class="d-flex justify-space-betweenX"
                            >
                              <span>
                                <v-icon
                                  left
                                  :color="
                                    item.Accredited !== ''
                                      ? 'yellow darken-3'
                                      : 'grey lighten-1'
                                  "
                                  title="Accreditation"
                                >
                                  mdi-certificate
                                </v-icon>
                                {{ item.Accredited || '-' }}
                              </span>

                              <span class="ml-3">
                                <v-icon
                                  left
                                  :color="
                                    item['Pickup Service'] !== ''
                                      ? 'yellow darken-3'
                                      : 'grey lighten-1'
                                  "
                                  title="Pick-up service"
                                >
                                  mdi-car-pickup
                                </v-icon>

                                <template v-if="item['Pickup Service'] !== ''">
                                  Yes
                                </template>
                                <template v-else> No </template>
                              </span>
                            </v-list-item-subtitle>
                          </v-list-item-content>
                        </template>
                      </v-list-item>

                      <v-divider
                        v-if="index < labs.length - 1"
                        :key="index"
                      ></v-divider>
                    </template>
                  </v-list-item-group>
                </v-list>

                <v-list v-else>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title
                        >No Labs listed in
                        <span class="capitalize">{{ regionLabel }}</span
                        >,
                        <span class="capitalize">{{
                          countryLabel
                        }}</span></v-list-item-title
                      >
                    </v-list-item-content>

                    <v-list-item-action>
                      <v-btn
                        href="mailto:admin@laboverflow.com?subject=Submit my Lab"
                        >Submit your Lab</v-btn
                      >
                    </v-list-item-action>
                  </v-list-item>
                </v-list>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>
<script>
export default {
  async asyncData({ $content, params }) {
    // Get regions data for filters
    const allRegions = await $content('regions').fetch()
    const allLabs = await $content('labs').only(['Region']).fetch()
    const searchList = []

    // Build filter items
    allRegions.forEach((country) => {
      country.states.forEach((region) => {
        // Get number of labs per region
        const labsInRegions = allLabs.filter(
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

    // Get default region for country filter
    const defaultRegion = allRegions.map((country) => {
      return country.states.find((region) => region.labs > 0)
    })
    // console.log('defaultRegion', defaultRegion)

    // Get formatted Country label - map params.country to slug
    const selectedCountry = allRegions.filter((country) => {
      return params.country === country.slug
    })

    // Get Region label - map params.region to region name to get the abbreviation code
    const selectedRegion = selectedCountry[0].states.filter((region) => {
      return params.region === region.name.toLowerCase().replace(/ /gi, '-')
    })
    console.log('selectedRegion', selectedRegion)

    // Get regionObjectiuon
    const selectedRegionItem = searchList.filter(
      (item) =>
        item.countrySlug === params.country && item.regionSlug === params.region
    )[0]

    // get labs in region using abbreviation code
    const labs = await $content('labs')
      .where({ Region: selectedRegion[0].abbreviation.toUpperCase() })
      .fetch()

    // set filters / labs
    const country = selectedCountry[0].slug
    const region = selectedRegion[0].name

    const countryLabel = selectedCountry[0].name
    const regionLabel = selectedRegion[0].name

    // console.log('countryLabel', countryLabel)
    // console.log('regionLabel', regionLabel)

    const title = `Cannabis testing labs in ${region}, ${selectedCountry[0].name}`
    const description = `Local cannabis testing labs in ${region}, ${selectedCountry[0].name}. Filter by TATs, accreditation, pick-up services and test type (potency, cannabinoid profile, terpene profile).`

    return {
      title,
      description,
      country,
      countryLabel,
      region,
      regionLabel,
      selectedCountry,
      selectedRegion,
      labs,
      params,
      defaultRegion,
      searchList,
      selectedRegionItem,
    }
  },
  data: () => ({
    // selectedRegionItem: null,
    // selectedRegionItem: {
    //   countrySlug: 'usa',
    //   country: 'United States',
    //   regionSlug: 'kentucky',
    //   region: 'Kentucky',
    //   code: 'KY',
    //   labs: 1,
    // },
    // value: null,
  }),
  head() {
    return {
      title: this.title,
      meta: [
        {
          hid: 'Lab Directory',
          name: 'description',
          content: this.description,
        },
      ],
    }
  },
  methods: {
    slugize(str) {
      return str.toLowerCase().replace(/ /gi, '-')
    },
    changeRegion(item) {
      console.log('DIL changeRegion', item)
      // this.selectedRegionItem = item

      this.$router.push({
        name: 'cannabis-testing-labs-country-region',
        params: { country: item.countrySlug, region: item.regionSlug },
      })
    },
    changeCountry(country) {
      // console.log('DIL country', country)

      let defaultRegion
      if (country === 'usa') {
        defaultRegion = this.slugize(this.defaultRegion[0].name)
      } else if (country === 'canada') {
        defaultRegion = this.slugize(this.defaultRegion[1].name)
      } else {
        defaultRegion = this.slugize(this.defaultRegion[2].name)
      }

      this.$router.push({
        name: 'cannabis-testing-labs-country-region',
        params: { country, region: defaultRegion },
      })
    },
  },
}
</script>
