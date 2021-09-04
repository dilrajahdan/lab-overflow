<template>
  <section>
    <!-- <nuxt-content :document="job" /> -->
    <v-card-title class="mb-3"> {{ job.name }}</v-card-title>
    <!-- params : {{ params }} -->
    <!-- <hr /> -->
    <v-card-text class="py-0"> Location </v-card-text>
    <v-card-subtitle class="pt-0 pb-0 font-weight-bold">{{
      job.location
    }}</v-card-subtitle>
    <v-card-text class="py-0"> Type </v-card-text>

    <v-card-subtitle class="pt-0 pb-0 font-weight-bold">{{
      job.type
    }}</v-card-subtitle>
    <v-card-text class="py-0"> Salary </v-card-text>

    <v-card-subtitle class="pt-0 pb-0 font-weight-bold">{{
      job.salary
    }}</v-card-subtitle>
    <!-- <v-card-subtitle>{{ job.benefits }}</v-card-subtitle> -->
    <v-card-text class="py-0"> Benefits </v-card-text>
    <v-card-text class="pt-0 pb-0">
      <v-chip-group active-class="primary--text" column>
        <v-chip v-for="benefit in job.benefits" :key="benefit">
          {{ benefit }}
        </v-chip>
      </v-chip-group>
    </v-card-text>
    <v-card-actions>
      <v-btn
        min-width="100%"
        target="_blank"
        color="primary"
        :href="job.sourceUrl"
        >Apply Now</v-btn
      >
    </v-card-actions>
    <v-card-text
      style="white-space: pre-line"
      v-html="job.description"
    ></v-card-text>
    <v-card-actions>
      <v-btn
        min-width="100%"
        target="_blank"
        color="primary"
        :href="job.sourceUrl"
        >Apply Now</v-btn
      >
    </v-card-actions>
  </section>
</template>
<script>
export default {
  async asyncData({ $content, params, redirect }) {
    const job = await $content('jobs', params.slug).fetch()

    if (job.length) {
      redirect(`/jobs/${job[0].slug}`)
    }

    return { job, params }
  },
}
</script>
