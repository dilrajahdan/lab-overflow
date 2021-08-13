<template>
  <v-container fluid>
    <v-row justify="center">
      <h1 class="display-1 my-6">Find A Cannabis Testing Lab Near You</h1>
    </v-row>
    <v-row>
      <v-col cols="8" offset="2">
        <v-autocomplete
          label="Select Location"
          :items="['USA', 'Canada']"
        ></v-autocomplete>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="4" offset="2">
        <!-- <nuxt-link
          :to="{
            name: 'cannabis-testing-labs-country-region',
            params: { region: 'bc', country: 'canada' },
          }"
          >BC</nuxt-link
        >

        <nuxt-link
          :to="{
            name: 'cannabis-testing-labs-country-region',
            params: { region: 'ca', country: 'usa' },
          }"
          >CA</nuxt-link
        > -->

        <v-list dense>
          <v-subheader>USA</v-subheader>
          <v-list-item-group v-model="selectedItem" color="primary">
            <v-list-item
              v-for="item in regionsUSA"
              :key="`usa-${item.name}`"
              :to="{
                name: 'cannabis-testing-labs-country-region',
                params: {
                  region: item.name.toLowerCase().replace(/ /gi, '-'),
                  country: 'usa',
                },
              }"
            >
              <v-list-item-content>
                <v-list-item-title>{{ item.name }}</v-list-item-title>
                <v-list-item-subtitle>{{
                  labsInRegion(item.abbreviation)
                }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-col>
      <v-col cols="4">
        <v-list dense>
          <v-subheader>Canada</v-subheader>
          <v-list-item-group v-model="selectedItem" color="primary">
            <v-list-item
              v-for="item in regionsCanada"
              :key="`canada-${item.name}`"
              :to="{
                name: 'cannabis-testing-labs-country-region',
                params: {
                  region: item.name.toLowerCase().replace(/ /gi, '-'),
                  country: 'canada',
                },
              }"
            >
              <v-list-item-content>
                <v-list-item-title>{{ item.name }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-col>
    </v-row>
    <!-- <v-autocomplete
      label="Select Location"
      :items="['USA', 'Canada']"
    ></v-autocomplete> -->
  </v-container>
</template>

<script>
export default {
  async asyncData({ $content, params }) {
    let regionsUSA = await $content('regions')
      .without(['slug', 'createdAt', 'updatedAt', 'dir', 'path', 'extension'])
      .where({ name: 'United States' })
      .fetch()
    // console.log('regions USA', regionsUSA[0].states)

    regionsUSA = regionsUSA[0].states

    let regionsCanada = await $content('regions')
      .without(['slug', 'createdAt', 'updatedAt', 'dir', 'path', 'extension'])
      .where({ name: 'Canada' })
      .fetch()
    // console.log('regions Canada', regionsCanada[0].states)
    regionsCanada = regionsCanada[0].states

    const labs = await $content('labs').only(['Region']).fetch()

    const regionArray = []

    // go thru each region
    const filteredUSARegions = regionsUSA.filter((r, i) => {
      // filter labs where lab.Region = r.abbreviation
      const regionLabel = labs.filter((lab, j) => {
        return r.abbreviation === lab.Region
      })

      if (regionLabel.length > 0) {
        regionArray.push({
          region: regionLabel[0].Region,
          labs: regionLabel.length,
        })

        // console.log('r', r.abbreviation, regionLabel[0].Region)
        return r.abbreviation === regionLabel[0].Region
      }
      return false
    })

    // console.log('regionArray', regionArray)
    // console.log('filteredUSARegions', filteredUSARegions)

    return {
      regionsUSA,
      regionsCanada,
      // regions,
      regionArray,
      filteredUSARegions,
      labs,
      params,
    }
  },
  data: () => ({
    selectedItem: null,
    items: [
      { text: 'CA', id: 'ca' },
      { text: 'CO', id: 'co' },
      { text: 'NY', id: 'ny' },
    ],
  }),

  // computed() {},

  methods: {
    // Output how many labs in region. 0 if not
    labsInRegion(regionCode) {
      const labsInRegion = this.regionArray.filter((region) => {
        return region.region === regionCode
      })
      console.log('code', labsInRegion[0])

      if (labsInRegion[0]) {
        return labsInRegion[0].labs
      }
      return 0
    },
  },
}
</script>
