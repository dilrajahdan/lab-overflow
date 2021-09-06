<template>
  <section></section>
</template>

<script>
export default {
  async asyncData({ $content, params, redirect, $ga, $vuetify }) {
    const job = await $content('jobs', params.slug).fetch()

    if (job.length) {
      if (!$vuetify.breakpoint.xsOnly) {
        redirect(`/jobs/${job[0].slug}`)
      }
    }

    return { job, params, $ga }
  },
  data() {
    return {
      job: null,
    }
  },
}
</script>
