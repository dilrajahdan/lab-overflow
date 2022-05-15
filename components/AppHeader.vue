<template>
  <div>
    <v-navigation-drawer
      v-show="!noLinks"
      v-model="drawer"
      color="grey lighten-3"
      :clipped="clipped"
      fixed
      app
      temporary
    >
      <v-list>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>
              <v-img
                contain
                height="40"
                position="0 50%"
                alt="Lab Overflow"
                :src="require('~/assets/img/laboverflow.png')"
              ></v-img>
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
          :class="item.outlined ? 'red darken-3 white--text' : ''"
        >
          <v-list-item-content>
            <v-list-item-title class="text-h6" v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar clipped-left fixed app color="">
      <v-container>
        <v-row no-gutters align="center" justify="center">
          <v-app-bar-nav-icon
            v-show="$vuetify.breakpoint.smAndDown && !noLinks"
            @click.stop="drawer = !drawer"
          />

          <!-- <v-toolbar-title class="d-flex align-center"> -->
          <nuxt-link
            v-show="$vuetify.breakpoint.smAndUp"
            class="text-decoration-none ml-2"
            to="/"
          >
            <v-img
              contain
              height="50"
              width="142"
              position="0% 50%"
              class=""
              alt="Lab Overflow"
              :src="require('~/assets/img/laboverflow.png')"
            ></v-img>
          </nuxt-link>
          <!-- </v-toolbar-title> -->
          <v-spacer />

          <v-btn
            v-for="item in items"
            v-show="!noLinks || $vuetify.breakpoint.mdAndUp"
            :key="item.title"
            :to="item.to"
            class="ml-2 elevation-0"
            :color="
              item.outlined ? 'red darken-3 white--text' : 'teal accent-4'
            "
            :class="item.outlined ? 'd-flex' : 'd-none d-md-flex'"
            >{{ item.title }}</v-btn
          >
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
      ],
      title: 'Lab',
      title2: 'Overflow',
    }
  },
}
</script>
