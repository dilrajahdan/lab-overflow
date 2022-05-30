<template>
  <article>
    <v-container>
      <v-row class="mt-4">
        <v-col class="redX" cols="12" sm="8">
          <v-card>
            <v-card-title>
              <h1 v-html="article.title"></h1>
            </v-card-title>
            <v-card-subtitle class="mt-1">
              <h3>By <span v-html="article.author"></span></h3>
            </v-card-subtitle>

            <v-card-text>
              <nuxt-content :document="{ body: article.body }" />
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="4" class="yellowC">
          <share-the-love-card class="sticky-sm"></share-the-love-card>
        </v-col>
      </v-row>
    </v-container>
  </article>
</template>
<script>
import ShareTheLoveCard from '~/components/ShareTheLoveCard.vue'
export default {
  components: { ShareTheLoveCard },
  async asyncData({ $axios, route, $content, params }) {
    // implicit (assumes $eq operator)
    const article = await $content('blog', params.slug).fetch()

    return { article }
  },
}
</script>

<style lang="scss">
.nuxt-content {
  // font-size: 1.3rem;
  line-height: 1.33;
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-bottom: 1rem;
  }

  img {
    max-width: 100%;
  }
}
</style>
