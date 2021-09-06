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
          <v-col
            cols="12"
            sm="10"
            offset-sm="1"
            md="8"
            offset-md="0"
            lg="6"
            xl="4"
          >
            <v-card-title class="display-1 mb-6"
              >Jobs in cannabis testing
            </v-card-title>
            <v-card-subtitle class="body-1">
              Make your next career move or find your labs next superstar
            </v-card-subtitle>
            <!-- <v-card-actions>
              <v-btn>Post Job</v-btn>
            </v-card-actions> -->
          </v-col>
        </v-row>
      </v-container>
    </v-card>

    <v-container>
      <!-- Filters -->
      <v-row :class="{ 'd-none': isMobileLayout }">
        <v-col>
          <v-card color="gray lighten-4">
            <v-card-subtitle class="pb-1">Filters</v-card-subtitle>
            <v-card-text>
              <v-row>
                <v-col cols="12" sm="4">
                  <v-autocomplete
                    v-model="selectedLocation"
                    :items="uniqueLocations"
                    hide-details
                    label="Location"
                    clearable
                    autocomplete="off"
                    data-lpignore="true"
                  ></v-autocomplete>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-autocomplete
                    v-model="selectedRole"
                    :items="uniqueRoles"
                    hide-details
                    clearable
                    label="Role"
                    autocomplete="off"
                    data-lpignore="true"
                  ></v-autocomplete>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-autocomplete
                    v-model="selectedType"
                    :items="uniqueTypes"
                    hide-details
                    label="Type"
                    clearable
                    autocomplete="off"
                    data-lpignore="true"
                  ></v-autocomplete>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row class="mt-0">
        <v-col cols="12" sm="4" :class="{ 'd-none': isMobileLayout }">
          <!-- <v-btn class="mb-3" min-width="100%" color="primary">Post Job</v-btn> -->
          <v-card>
            <v-list two-line>
              <v-list-item-group v-model="selectedItem" color="cyan darken-4">
                <template v-for="(item, index) in jobs">
                  <v-list-item
                    :key="item.title"
                    :to="{
                      name: 'jobs-slug',
                      params: {
                        slug: item.slug,
                      },
                    }"
                  >
                    <template #default="{}">
                      <v-list-item-content>
                        <v-list-item-title
                          v-text="item.name"
                        ></v-list-item-title>

                        <v-list-item-subtitle
                          class="text--primary"
                          v-text="item.location"
                        ></v-list-item-subtitle>

                        <v-list-item-subtitle
                          v-text="item.salary"
                        ></v-list-item-subtitle>
                      </v-list-item-content>

                      <v-list-item-action>
                        <v-list-item-action-text
                          v-text="item.type"
                        ></v-list-item-action-text>
                      </v-list-item-action>
                    </template>
                  </v-list-item>

                  <v-divider
                    v-if="index < jobs.length - 1"
                    :key="index"
                  ></v-divider>
                </template>
              </v-list-item-group>
            </v-list>
          </v-card>
        </v-col>
        <v-col cols="12" sm="8" class="mt-0 pt-sm-3 pt-0">
          <section class="job-details grey lighten-4">
            <div class="d-none" :class="{ 'd-inline': isMobileLayout }">
              <v-btn to="/jobs" class="mb-3 secondary" dark outlined
                ><v-icon left>mdi-arrow-left</v-icon> Back to jobs</v-btn
              >
            </div>

            <v-card>
              <NuxtChild />
            </v-card>
          </section>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
export default {
  async asyncData({ $content, params }) {
    const jobs = await $content('jobs').fetch()

    // Get unique locations
    const uniqueLocations = jobs
      .map((ele) => ele.location)
      .filter((ele, i, arr) => arr.indexOf(ele) === i && ele !== '')

    // Get unique titles
    const uniqueRoles = jobs
      .map((ele) => ele.name)
      .filter((ele, i, arr) => arr.indexOf(ele) === i && ele !== '')

    const uniqueTypes = jobs
      .map((ele) => ele.type)
      .filter((ele, i, arr) => arr.indexOf(ele) === i && ele !== '')
    console.log(uniqueTypes)

    // Populate Form inputs/chips
    // Write computed function to filter results

    return {
      jobs,
      params,
      uniqueLocations,
      uniqueRoles,
      uniqueTypes,
    }
  },
  data: () => ({
    selectedItem: null,
    selectedLocation: 0,
    selectedType: 0,
    selectedRole: 0,
    uniqueLocations: [],
    uniqueTypes: [],

    title: 'Cannabis Testing Jobs',
    tab: 0,
    items: ['Location', 'Role', 'Type'],
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  }),
  head() {
    return {
      title: this.title,
      meta: [
        {
          hid: 'Lab Jobs',
          name: 'description',
          content: `!!!!!!!!! FILL IN `,
        },
      ],
    }
  },
  computed: {
    isMobileLayout() {
      return this.$vuetify.breakpoint.xsOnly && this.$route.name === 'jobs-slug'
    },
  },

  methods: {
    slugize(str) {
      return str.toLowerCase().replace(/ /gi, '-')
    },
  },
}
</script>

<style lang="scss">
.job-details {
}
</style>
