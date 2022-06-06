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
      <v-row class="mt-0 sticky-sm" style="z-index: 10">
        <v-col>
          <subscribe-to-jobs class=""></subscribe-to-jobs>
        </v-col>
      </v-row>
      <v-row class="mt-4">
        <v-col class="redX" cols="12">
          <v-card class="pa-6">
            <v-card-title>
              <h3 class="text-h6">Blog articles for cannabis testing labs</h3>
            </v-card-title>
            <!-- list of articles -->

            <v-card
              v-for="article in articles"
              :key="article.slug"
              color="grey lighten-4"
              :to="`/blog/${article.slug}`"
              class="d-flex mb-4"
              :class="{ active: $route.path === `/blog/${article.slug}` }"
            >
              <v-avatar class="ma-3" size="125" tile>
                <v-img :src="article.image"></v-img>
              </v-avatar>

              <div class="">
                <v-card-title class="text-h5 mb-2" v-html="article.title">
                </v-card-title>
                <v-card-subtitle class="pb-2">
                  By {{ article.author }}
                </v-card-subtitle>
                <v-chip-group class="mx-4 mb-2">
                  <v-chip
                    v-for="tag in article.tags"
                    :key="tag"
                    color="grey"
                    small
                    outlined
                  >
                    {{ tag }}
                  </v-chip>
                </v-chip-group>
              </div>
            </v-card>

            <!-- <v-list three-line color="grey lighten-4">
              <v-list-item
                v-for="article in articles"
                :key="article.slug"
                :href="`/blog/${article.slug}`"
                :class="{ active: $route.path === `/blog/${article.slug}` }"
              >
                <v-list-item-group>
                  <v-list-item-title class="text-h5" v-html="article.title">
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    By {{ article.author }}
                  </v-list-item-subtitle>
                </v-list-item-group>
              </v-list-item>
            </v-list> -->
          </v-card>
        </v-col>
        <v-col cols="12" class="yellowC">
          <share-the-love-card
            :url="`https://laboverflow.com${$route.path}`"
            :title="pageTitle"
            :description="pageDescription"
            hashtags="blog,articles,cannabis,testing,labs,laboverflow"
            class="sticky-sm"
          ></share-the-love-card>
        </v-col>
      </v-row>
    </v-container>
  </article>
</template>

<script>
import ogImage from '@/assets/img/laboverflow-bg.png'

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

  data() {
    return {
      pageName: 'Blog',
      pageTitle: 'Blog',
      pageDescription: 'Blog articles for cannabis testing labs',
    }
  },
  head() {
    return {
      title: this.pageTitle,
      meta: [
        {
          hid: this.pageTitle,
          name: this.pageTitle,
          content: this.pageDescription,
        },
        { hid: 'og-type', property: 'og:type', content: 'website' },
        { hid: 'og-title', property: 'og:title', content: this.pageTitle },
        {
          hid: 'og-desc',
          property: 'og:description',
          content: this.pageDescription,
        },
        {
          hid: 'og-image',
          property: 'og:image',
          content: `${process.env.baseURL}${ogImage}`,
        },
        {
          hid: 't-type',
          name: 'twitter:card',
          content: `${process.env.baseURL}${ogImage}`,
        },
        {
          hid: 'og-url',
          property: 'og:url',
          content: `${process.env.baseURL}${this.$route.path}`,
        },
      ],
    }
  },
}
</script>
