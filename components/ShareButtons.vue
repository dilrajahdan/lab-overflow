<template>
  <div>
    <ShareNetwork
      network="linkedin"
      :url="url"
      :title="title"
      :description="description"
      :quote="quote"
      :hashtags="hashtags"
      class="
        mr-4
        mb-3
        v-btn v-btn--rounded
        rounded-sm
        v-size--x-small
        pa-2
        blue
        lighten-1
        white--text
        share-button
      "
    >
      <v-icon left dark>mdi-linkedin</v-icon>
      <span>Share on LinkedIn</span>
    </ShareNetwork>
    <br />
    <ShareNetwork
      network="twitter"
      :url="url"
      :title="title"
      :description="description"
      :quote="quote"
      :hashtags="hashtags"
      class="
        mr-4
        mb-3
        v-btn v-btn--rounded
        rounded-sm
        v-size--x-small
        pa-2
        blue
        lighten-1
        white--text
        share-button
      "
    >
      <v-icon left dark>mdi-twitter</v-icon>
      <span>Share on Twitter</span>
    </ShareNetwork>
    <br />
    <ShareNetwork
      network="facebook"
      :url="url"
      :title="title"
      :description="description"
      :quote="quote"
      :hashtags="hashtags"
      class="
        mr-4
        mb-3
        v-btn v-btn--rounded
        rounded-sm
        v-size--x-small
        pa-2
        blue
        lighten-1
        white--text
        share-button
      "
    >
      <v-icon dark left>mdi-facebook</v-icon>
      <span>Share on Facebook</span>
    </ShareNetwork>
  </div>
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
  },
}
</script>

<style>
.share-button {
  width: 160px;
  max-width: 100%;
}
</style>
