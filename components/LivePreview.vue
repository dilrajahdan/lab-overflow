<template>
  <v-card color="white">
    <v-container>
      <v-row align="center" class="flex-nowrap">
        <!-- Role -->
        <v-col class="py-0">
          <v-card-title class="overline">
            {{ job.labName || 'Lab name' }}
          </v-card-title>
          <v-card-subtitle class="">
            <h3 class="headline">
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
        <v-col class="py-0 flex-shrink-1 flex-grow-1">
          <v-chip-group column>
            <v-chip
              v-for="skill in job.selectedSkills"
              :key="skill"
              x-small
              outlined
              >{{ skill }}</v-chip
            >
          </v-chip-group>
        </v-col>

        <v-col class="flex-grow-0">
          <v-card-actions>
            <v-btn icon large @click="jobActive = !jobActive"
              ><v-icon>{{
                jobActive ? 'mdi-chevron-up' : 'mdi-chevron-down'
              }}</v-icon></v-btn
            >
          </v-card-actions>
        </v-col>
      </v-row>

      <!-- Job details -->
      <!-- <template > -->
      <!-- <v-divider></v-divider> -->
      <v-row v-if="jobActive">
        <v-col>
          <v-card color="teal lighten-5 float-right ma-4" max-width="250" hover>
            <v-card-title>
              {{ job.position }}
            </v-card-title>
            <v-card-subtitle class="">
              {{ job.labName }}
            </v-card-subtitle>

            <v-card-text class="overline">
              <v-chip-group column>
                <v-chip class="mt-1" label small>
                  {{ job.location }}
                </v-chip>
                <v-chip
                  v-if="job.salaryMin"
                  label
                  color="green lighten-4 mt-1"
                  small
                  >💰 USD {{ job.salaryMin }}
                  <span v-if="job.salaryMin && job.salaryMax">-</span>
                  {{ job.salaryMax }}
                </v-chip>
              </v-chip-group>
            </v-card-text>

            <v-card-actions>
              <v-btn min-width="100%" color="primary"
                >Apply now</v-btn
              ></v-card-actions
            >
          </v-card>

          <v-card-text class="" v-html="job.description" />
          <v-card-text class="" v-html="job.howToApply" />
        </v-col>

        <!-- <v-col class=""> </v-col> -->
      </v-row>
      <!-- </template> -->
    </v-container>
  </v-card>
</template>

<script>
export default {
  props: {
    job: {
      type: Object,
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
