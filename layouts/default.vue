<template>
  <v-app dark>
    <!-- <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer> -->
    <v-app-bar :clipped-left="clipped" fixed app>
      <!-- <v-app-bar-nav-icon @click.stop="drawer = !drawer" /> -->

      <v-toolbar-title
        >{{ title }} <b>{{ title2 }}</b></v-toolbar-title
      >
      <v-spacer />
      <div>
        <v-tabs class="mr-3">
          <v-tab to="/">Home</v-tab>
          <v-tab disabled>Forum</v-tab>
          <v-tab to="/cannabis-testing-labs">Lab Directory</v-tab>
          <v-tab disabled>Suppiers</v-tab>
          <v-tab disabled>Jobs</v-tab>
        </v-tabs>
      </div>
      <v-btn icon class="pink" @click.stop="rightDrawer = !rightDrawer">
        <v-icon>mdi-star</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
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
    <v-footer :absolute="!fixed" app>
      <span
        >&copy; {{ new Date().getFullYear() }} | Advertise | Add Your Lab | Add
        Your Supplier | Privacy | T&C</span
      >
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Find A Lab',
          to: '/find-a-lab',
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
