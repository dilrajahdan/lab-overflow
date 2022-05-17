<template>
  <article>
    <h1 class="my16">h1. Forum</h1>
    <ul>
      <li v-for="article in articles" :key="article.slug" cl>
        <h4>
          <nuxt-link :to="`/articles/${article.slug}`">{{
            article.slug
          }}</nuxt-link>
        </h4>
        {{ article }}
      </li>
    </ul>
  </article>
</template>

<script>
export default {
  async asyncData({ $axios, $route, $content }) {
    // implicit (assumes $eq operator)
    const articles = await $content('articles').fetch()

    // // explicit $eq
    // const articles = await this.$content('articles').where({ title: { $eq: 'Home' } }).fetch()

    // // $gt
    // const articles = await this.$content('articles').where({ age: { $gt: 18 } }).fetch()
    // // $in
    // const articles = await this.$content('articles').where({ name: { $in: ['odin', 'thor'] } }).fetch()

    return { articles }
  },
}
</script>
