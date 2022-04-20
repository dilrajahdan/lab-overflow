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
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>
              {{ title }}
              <b>{{ title2 }}</b>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
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
        <v-row align="center" justify="center">
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
          <!-- <div > -->
          <!-- <v-tabs
              v-show="$vuetify.breakpoint.smAndUp"
              class="mr-3"
              background-color="transparent"
            > -->
          <!-- {{ $vuetify.breakpoint.name }} -->
          <v-btn
            v-for="item in items"
            v-show="!noLinks || $vuetify.breakpoint.mdAndUp"
            :key="item.title"
            :to="item.to"
            class="ml-2"
            :color="item.outlined ? 'red' : ''"
            :class="item.outlined ? 'd-flex' : 'd-none d-md-flex'"
            >{{ item.title }}</v-btn
          >
          <!-- </v-tabs> -->
          <!-- </div> -->
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
          title: 'Home',
          to: '/',
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
      ],
      title: 'Lab',
      title2: 'Overflow',
    }
  },
}
</script>
