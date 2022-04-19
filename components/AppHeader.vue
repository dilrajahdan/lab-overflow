<template>
  <div>
    <v-navigation-drawer
      v-show="!noLinks"
      v-model="drawer"
      :clipped="clipped"
      fixed
      app
      temporary
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          :disabled="item.disabled"
          router
          exact
        >
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar dark clipped-left fixed app>
      <v-container>
        <v-row>
          <v-app-bar-nav-icon
            v-show="$vuetify.breakpoint.xs && !noLinks"
            @click.stop="drawer = !drawer"
          />

          <v-toolbar-title class="d-flex align-center">
            <!-- ({{ $vuetify.breakpoint.name }}) -->
            <nuxt-link class="text-decoration-none white--text" to="/">
              {{ title }}
              <b>{{ title2 }}</b>
            </nuxt-link>
          </v-toolbar-title>
          <v-spacer />
          <div v-show="!noLinks">
            <v-tabs
              v-show="$vuetify.breakpoint.smAndUp"
              class="mr-3"
              background-color="transparent"
            >
              <v-tab
                v-for="item in items"
                :key="item.title"
                :disabled="item.disabled"
                :to="item.to"
                >{{ item.title }}</v-tab
              >
            </v-tabs>
          </div>
        </v-row></v-container
      >
    </v-app-bar>
  </div>
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
      clipped: false,
      drawer: false,

      items: [
        {
          icon: 'mdi-chart-bubble',
          title: 'Lab directory',
          to: '/cannabis-testing-labs',
        },

        {
          icon: 'mdi-chart-bubble',
          title: 'Job board',
          to: '/job-board',
          disabled: false,
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Post a job',
          to: '/post-a-job',
          disabled: false,
          outlined: true,
        },
      ],
      //   miniVariant: false,
      //   right: true,
      //   rightDrawer: false,
      title: 'Lab',
      title2: 'Overflow',
    }
  },
}
</script>
