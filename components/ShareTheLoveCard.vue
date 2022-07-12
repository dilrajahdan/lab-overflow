<template>
  <v-card :class="fillHeight ? '100%' : ''">
    <v-card-subtitle>Share the love</v-card-subtitle>
    <v-card-text>
      <share-buttons
        :url="`https://laboverflow.com${$route.path}`"
        :title="pageTitle"
        :description="pageDescription"
        hashtags="forum, cannabis, testing, lab, laboverflow"
      ></share-buttons>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    url: {
      type: String,
      required: true,
      default: 'https://laboverflow.com',
    },
    title: {
      type: String,
      required: true,
      default: 'Title',
    },
    description: {
      type: String,
      required: true,
      default: 'Description',
    },
    quote: {
      type: String,
      required: false,
      default: '',
    },
    hashtags: {
      type: String,
      required: false,
      default: '',
    },
    fillHeight: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      pageName: '',
      pageTitle: '',
      pageDescription: '',
    }
  },
}
</script>
