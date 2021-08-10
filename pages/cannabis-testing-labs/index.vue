<template>
  <div>
    <!-- <v-card color="green" height="300" class="mb-3">
      <v-card-title primary-title>
        Find A Cannabis Testing Lab Near You</v-card-title
      >
      <v-card-text> Select Your Region </v-card-text>
    </v-card> -->

    <h1 class="display-1 my-6">Find A Cannabis Testing Lab Near You</h1>
    <v-row>
      <v-col>
        <h2>USA</h2>

        <!-- <nuxt-link
          :to="{
            name: 'cannabis-testing-labs-country-region',
            params: { region: 'ca' },
          }"
          >CA</nuxt-link
        > -->

        <nuxt-link
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
        >

        <ul>
          <li v-for="n in 25" :key="n">
            <a>Region {{ n }}</a>
          </li>
        </ul>

        <v-list flat>
          <v-subheader>USA</v-subheader>
          <v-list-item-group v-model="selectedItem" color="primary">
            <v-list-item
              v-for="(item, i) in items"
              :key="i"
              :to="{
                path: 'usa',
                params: { country: 'usa', region: 'ca' },
              }"
            >
              <!-- <v-list-item-icon>
                <v-icon v-text="item.icon"></v-icon>
              </v-list-item-icon> -->
              <v-list-item-content>
                <v-list-item-title v-text="item.text"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-col>
      <v-col
        ><h2>Canada</h2>
        <ul>
          <li v-for="n in 10" :key="n">
            <a>Region {{ n }}</a>
          </li>
        </ul></v-col
      >
    </v-row>
    <!-- <v-autocomplete
      label="Select Location"
      :items="['USA', 'Canada']"
    ></v-autocomplete> -->
  </div>
</template>

<script>
export default {
  data: () => ({
    selectedItem: null,
    items: [
      { text: 'CA', id: 'ca' },
      { text: 'CO', id: 'co' },
      { text: 'NY', id: 'ny' },
    ],
  }),
}
</script>
