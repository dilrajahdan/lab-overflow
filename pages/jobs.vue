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
      <v-row>
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
            <!-- :class="{ 'job-details--mobile': isMobileLayout }" -->
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
    return {
      jobs,
      params,
    }
  },
  data: () => ({
    selectedItem: null,
    title: 'Cannabis Testing Jobs',
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
      console.log('route', this.$route.name === 'jobs-slug')
      return this.$vuetify.breakpoint.xsOnly && this.$route.name === 'jobs-slug'
    },
  },

  updated() {
    // `this` points to the vm instance
    console.log('a is: ', this.params.slug)
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
  // background: red;
}
.job-details--mobile {
  // background: yellow;
  // padding: 2em;

  position: absolute;
  top: 0;
  left: 0;
}
</style>
