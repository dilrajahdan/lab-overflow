<template>
  <article>
    <v-container>
      <v-row class="mt-0 pb-0">
        <v-col cols="12" sm="8">
          <v-btn outlined small class="mt-0 mb-4 teal--text" to="/blog">
            <v-icon left>mdi-arrow-left</v-icon>
            Back to blog</v-btn
          >
        </v-col>
      </v-row>
    </v-container>

    <v-container class="pt-0">
      <v-row>
        <v-col class="pt-0 redX" cols="12" sm="8">
          <v-card class="pa-6">
            <!-- <v-card-title> -->
            <h1 class="display-1" v-html="article.title"></h1>
            <!-- </v-card-title> -->
            <p class="mt-4 mb-2">By <span v-html="article.author"></span></p>
            <v-chip-group class="mb-4">
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

            <!-- <v-card-text> -->
            <nuxt-content :document="{ body: article.body }" />
            <!-- </v-card-text> -->
          </v-card>
        </v-col>
        <v-col class="pt-0 redX" cols="12" sm="4">
          <div class="sticky-sm">
            <v-card
              v-if="article.forumLink && article.forumLinkText"
              color="teal"
              dark
            >
              <v-card-title
                ><a
                  class="white--text text-decoration-none"
                  :href="`${article.forumLink}?utm_source=blog&utm_medium=link&utm_campaign=${article.slug}`"
                  >{{ article.forumLinkText }}</a
                ></v-card-title
              >
            </v-card>
            <share-the-love-card
              :url="`https://laboverflow.com${$route.path}`"
              :title="pageTitle"
              :description="pageDescription"
              :hashtags="tagsString"
              class="mt-4"
            ></share-the-love-card>
          </div>
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
    const pageTitle = article.title
    const pageDescription = article.description
    const ogImage = article.image
    const tags = article.tags
    // convert tags array to string
    const tagsString = tags.join(',')
    console.log(article.description)
    return { article, pageTitle, pageDescription, ogImage, tags, tagsString }
  },
  data() {
    return {
      // pageTitle,
      // pageTitle: pageTitle,
      // pageDescription,
      // ogImage,
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
          content: `${process.env.baseURL}${this.ogImage}`,
        },
        {
          hid: 't-type',
          name: 'twitter:card',
          content: `${process.env.baseURL}${this.ogImage}`,
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

<style lang="scss">
.nuxt-content {
  // font-size: 1.3rem;
  line-height: 1.33;
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  ul,
  ol {
    margin-bottom: 1rem;
  }

  img {
    max-width: 100%;
  }
}

.v-chip {
  cursor: default;
}
</style>
