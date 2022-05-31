<template>
  <article>
    <v-sheet
      class="deep-purple white--text d-flex flex-column justify-center py-3"
    >
      <v-container class="">
        <v-row class="">
          <v-col cols="12" md="8">
            <v-card-title>
              <h1 class="overline">Blog</h1>
            </v-card-title>
            <v-card-subtitle class="">
              <h2 class="display-1">
                What do you want us to write about next?
              </h2>
            </v-card-subtitle>
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>

    <v-container>
      <v-row class="mt-4">
        <v-col class="redX" cols="12">
          <v-card class="pa-6">
            <v-card-title>
              <h3 class="text-h6">Blog articles for cannabis testing labs</h3>
            </v-card-title>
            <!-- list of articles -->
            <v-list three-line color="grey lighten-4">
              <v-list-item
                v-for="article in articles"
                :key="article.slug"
                :href="`/blog/${article.slug}`"
                :class="{ active: $route.path === `/blog/${article.slug}` }"
              >
                <!-- <pre>  {{ article }}</pre> -->
                <v-list-item-group>
                  <v-list-item-title class="text-h5" v-html="article.title">
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    By {{ article.author }}
                  </v-list-item-subtitle>
                </v-list-item-group>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
        <v-col cols="12" class="yellowC">
          <share-the-love-card
            :url="`https://laboverflow.com${$route.path}`"
            :title="pageTitle"
            :description="pageDescription"
            :hashtags="tagsString"
            class="sticky-sm"
          ></share-the-love-card>
        </v-col>
      </v-row>
    </v-container>
  </article>
</template>

<script>
export default {
  async asyncData({ $axios, $route, $content }) {
    // implicit (assumes $eq operator)
    const articles = await $content('blog').fetch()

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
