<template>
  <article>
    <nuxt-content :document="{ body: article.body }" />
  </article>
</template>
<script>
export default {
  async asyncData({ $axios, route, $content, params }) {
    // implicit (assumes $eq operator)
    const article = await $content('articles', params.slug).fetch()

    return { article }
  },
}
</script>
