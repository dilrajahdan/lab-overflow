<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
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
    <v-app-bar dark :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon
        v-show="$vuetify.breakpoint.xs"
        @click.stop="drawer = !drawer"
      />

      <v-toolbar-title>
        ({{ $vuetify.breakpoint.name }})

        <nuxt-link class="text-decoration-none white--text" to="/">
          {{ title }}
          <b>{{ title2 }}</b>
        </nuxt-link>
      </v-toolbar-title>
      <v-spacer />
      <div>
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
          <!-- <v-tab disabled>Forum</v-tab>
          <v-tab to="/cannabis-testing-labs">Lab Directory</v-tab>
          <v-tab disabled>Suppiers</v-tab>
          <v-tab disabled>Jobs</v-tab> -->
        </v-tabs>
      </div>
      <!-- <v-btn icon class="pink" @click.stop="rightDrawer = !rightDrawer">
        <v-icon>mdi-star</v-icon>
      </v-btn> -->
    </v-app-bar>
    <v-main class="grey lighten-4">
      <Nuxt />
    </v-main>
    <v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed>
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light> mdi-repeat </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-footer dark :absolute="!fixed" app>
      <span
        >&copy; {{ new Date().getFullYear() }} | Contact: admin@laboverflow.com
      </span>
      <!-- Advertise | Add Your Lab | Add
        Your Lab Supplier | Add Your Job Post | Privacy | T&C -->
    </v-footer>
  </v-app>
</template>

<script>
export default {
  transition: 'fade',
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,

      items: [
        // {
        //   icon: 'mdi-apps',
        //   title: 'Home',
        //   to: '/',
        // },
        {
          icon: 'mdi-chart-bubble',
          title: 'Forum',
          to: '/forum',
          disabled: true,
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Lab Directory',
          to: '/cannabis-testing-labs',
        },
        // {
        //   icon: 'mdi-chart-bubble',
        //   title: ' Lab Suppliers',
        //   to: '/lab-suppliers',
        //   disabled: true,
        // },
        {
          icon: 'mdi-chart-bubble',
          title: 'Jobs',
          to: '/jobs',
          disabled: false,
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Lab',
      title2: 'Overflow',
    }
  },
}
</script>
