<template>
  <div>
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
        white--text
      "
    >
      <v-icon dark left>mdi-facebook</v-icon>
      <span>Share on Facebook</span>
    </ShareNetwork>
    <br />

    <ShareNetwork
      network="linkedin"
      :url="url"
      :title="title"
      :description="description"
      :quote="quote"
      :hashtags="hashtags"
      class="
        mr-4
        mb-2
        v-btn v-btn--rounded
        rounded-sm
        v-size--x-small
        pa-2
        blue
        darken-2
        white--text
      "
    >
      <v-icon left dark>mdi-linkedin</v-icon>
      <span>Share on Linked In</span>
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
        v-btn v-btn--rounded
        rounded-sm
        v-size--x-small
        pa-2
        blue
        darken-4
        white--text
      "
    >
      <v-icon left dark>mdi-twitter</v-icon>
      <span>Share on Twitter</span>
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
    },
    hashtags: {
      type: String,
      required: true,
      default: '',
    },
  },
}
</script>
