<template>
  <v-footer dark absolute app>
    <v-container class="py-10C">
      <v-row>
        <v-col cols="12" sm="6">
          <div class="footer-links text-center text-sm-left">
            <nuxt-link
              v-for="item in items"
              :key="item.title"
              class="d-block white--text mb-2 footer-links__item"
              :to="item.to"
              >{{ item.title }}</nuxt-link
            >
          </div>
        </v-col>
        <v-col cols="12" sm="6" class="d-flex justify-center justify-sm-end">
          <share-buttons></share-buttons>
        </v-col>
      </v-row>
      <v-row class="mt-0">
        <v-col cols="12">
          <small class="d-block text-center text-sm-left">
            &copy; {{ new Date().getFullYear() }}
            <nuxt-link class="white--text" to="/">Lab Overflow</nuxt-link>
          </small>
        </v-col>
      </v-row>
    </v-container>
    <!-- Advertise | Add Your Lab | Add
        Your Lab Supplier | Add Your Job Post | Privacy | T&C -->
  </v-footer>
</template>

<script>
export default {
  transition: 'fade',
  props: {
    noLinks: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      items: [
        {
          title: 'Home',
          to: '/',
        },

        {
          title: 'Forum',
          to: '/forum',
        },
        {
          title: 'Lab directory',
          to: '/cannabis-testing-labs',
        },

        {
          title: 'Job board',
          to: '/job-board',
        },
        {
          title: 'Post a job',
          to: '/post-a-job',
          outlined: true,
        },
        {
          title: 'Contact',
          to: '/contact',
          outlined: true,
        },
      ],
      title: 'Lab',
      title2: 'Overflow',
    }
  },
}
</script>

<style lang="scss">
.footer-links {
  columns: 2;
}
</style>
