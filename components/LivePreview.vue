<template>
  <section>
    <v-card
      :to="to"
      hover
      tile
      :color="featured ? 'yellow lighten-4' : 'white'"
      class="job mb-2"
    >
      <v-container>
        <v-row align="center" class="flex-nowrap">
          <!-- Featured -->
          <v-col
            v-if="featured"
            v-show="$vuetify.breakpoint.mdAndUp"
            class="flex-grow-0 pr-0"
          >
            <v-card-text class="py-0 pr-0">
              <v-icon>mdi-star</v-icon>
            </v-card-text>
          </v-col>

          <v-col class="py-0">
            <v-card-title v-if="featured" class="overline">
              {{ job.labName || 'Lab name' }}
            </v-card-title>
            <v-card-subtitle class="pb-0">
              <h3 class="primary--text position">
                {{ job.position || 'Position' }}
              </h3>
            </v-card-subtitle>

            <v-card-text class="">
              <v-chip-group>
                <v-chip class="mt-1" label x-small>{{
                  job.location || 'Location, Country'
                }}</v-chip>

                <v-chip
                  v-if="job.salaryMin"
                  label
                  x-small
                  color="green lighten-4 mt-1"
                  >💰 USD {{ job.salaryMin }}
                  <span v-if="job.salaryMin && job.salaryMax">-</span>
                  {{ job.salaryMax }}
                </v-chip>
              </v-chip-group>
            </v-card-text>
          </v-col>

          <!-- Skills -->
          <v-col
            v-show="$vuetify.breakpoint.mdAndUp"
            class="py-0 flex-shrink-1 flex-grow-1"
          >
            <v-chip-group column>
              <v-chip
                v-for="skill in job.selectedSkills.slice(0, 5)"
                :key="skill"
                x-small
                outlined
                >{{ skill }}</v-chip
              >
            </v-chip-group>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
    <slot></slot>
  </section>
</template>

<script>
export default {
  props: {
    job: {
      type: Object,
      required: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    to: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      jobActive: false,
    }
  },
  methods: {},
}
</script>

<style lang="scss">
.position {
  cursor: pointer;
}
</style>
