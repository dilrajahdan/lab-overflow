<template>
  <v-container>
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
              v-for="(item, i) in items"
              :key="i"
              :to="{
                name: 'cannabis-testing-labs-country-region',
                params: { region: 'ca', country: 'usa' },
              }"
            >
              <v-list-item-content>
                <v-list-item-title v-text="item.text"></v-list-item-title>
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
              v-for="(item, i) in items"
              :key="i"
              :to="{
                name: 'cannabis-testing-labs-country-region',
                params: { region: 'bc', country: 'canada' },
              }"
            >
              <v-list-item-content>
                <v-list-item-title v-text="item.text"></v-list-item-title>
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
