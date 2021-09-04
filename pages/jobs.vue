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
            <v-card-title class="mb-6">Jobs in cannabis testing </v-card-title>
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
      <!-- {{ jobs }} -->
      <v-row class="d-none">
        <v-col>
          <v-card color="grey lighten-2 ">
            <v-tabs v-model="tab" background-color="transparent" grow>
              <v-tab v-for="item in items" :key="item">
                {{ item }}
              </v-tab>
            </v-tabs>

            <v-tabs-items v-model="tab">
              <v-tab-item v-for="item in items" :key="item">
                <v-card color="basil" flat>
                  <v-card-text>
                    <!-- {{ text }} -->

                    <v-chip-group
                      v-model="selectedLocation"
                      active-class="primary--text"
                      column
                    >
                      <v-chip>All</v-chip>

                      <v-chip v-for="tag in items" :key="tag">
                        {{ tag }}
                      </v-chip>
                    </v-chip-group>
                  </v-card-text>
                </v-card>
              </v-tab-item>
            </v-tabs-items>

            <!-- <v-tabs fixed-tabs >
              <v-tab>Location</v-tab>
              <v-tab>Role</v-tab>
              <v-tab>Type</v-tab>
            </v-tabs> -->
          </v-card>
        </v-col>
      </v-row>
      <v-row class="mt-0">
        <v-col cols="12" sm="4" :class="{ 'd-none': isMobileLayout }">
          <!-- <v-btn class="mb-3" min-width="100%" color="primary">Post Job</v-btn> -->
          <v-card>
            <v-list two-line>
              <v-list-item-group
                v-model="selectedItem"
                active-class="deep-purple--text"
              >
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
        <v-col cols="12" sm="8">
          <section class="job-details grey lighten-4">
            <div class="d-none" :class="{ 'd-inline': isMobileLayout }">
              <v-btn to="/jobs" class="mb-3" text>Back</v-btn>
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
    // console.log('jobs', jobs)

    // Get unique titles
    // Get unique locations
    // Get unique types
    // Populate Form inputs/chips
    // Write computed function to filter results

    return {
      jobs,
      params,
    }
  },
  data: () => ({
    selectedItem: null,
    selectedLocation: 0,
    selectedType: 0,
    selectedRole: 0,
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
