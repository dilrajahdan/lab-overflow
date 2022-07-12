import colors from 'vuetify/es5/util/colors'
import getRoutes from './utils/get-routes'

export default {
  vue: {
    config: {
      productionTip: false,
      devtools: true,
    },
  },
  env: {
    baseURL:
      process.env.NODE_ENV === 'production'
        ? 'https://laboverflow.com'
        : 'http://localhost:8888',
    STRIPE_PK: process.env.STRIPE_PK,
  },

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',
  ssr: true,
  mode: 'spa',
  // router: {
  //   trailingSlash: false,
  // },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate:
      '%s - Empowering cannabis testing labs to develop technology through collective knowledge',
    title: 'Lab Overflow',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      {
        name: 'apple-mobile-web-app-status-bar-style',
        content: 'black-translucent',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    script: [{ src: 'https://js.stripe.com/v3/' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/styles.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/persistedState.client.js', mode: 'client' },
    { src: '~/plugins/hotjar.client.js', mode: 'client' },
    { src: '~/plugins/reddit.client.js', mode: 'client' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    // https://google-analytics.nuxtjs.org/setup
    '@nuxtjs/google-analytics',
    // https://github.com/LinusBorg/portal-vue
    'portal-vue/nuxt',
    // https://timbenniks.dev/writings/easy-dynamic-routes-in-your-nuxt-sitemap
    // '@/modules/sitemapRouteGenerator',
    // Always make sitemap last element of the array. https://sitemap.nuxtjs.org/guide/setup
    '@nuxtjs/sitemap',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
    // https://firebase.nuxtjs.org/guide/getting-started
    '@nuxtjs/firebase',
    // https://github.com/nicolasbeauvais/vue-social-sharing
    'vue-social-sharing/nuxt',
    // Always make sitemap last element of the array. https://sitemap.nuxtjs.org/guide/setup
    '@nuxtjs/sitemap',
  ],

  firebase: {
    // options
    config: {
      apiKey: 'AIzaSyC9npU2vot8Ktnu39neq032aN0NnCuab14',
      authDomain: 'lab-overflow.firebaseapp.com',
      projectId: 'lab-overflow',
      storageBucket: 'lab-overflow.appspot.com',
      messagingSenderId: '209478965474',
      appId: '1:209478965474:web:6e8b46164035441b2926bb',
      measurementId: 'G-6E3MDJBHXE',
    },
    services: {
      auth: true, // Just as example. Can be any other service.
      firestore: true,
      // functions: true,
      // storage: true,
      // database: true,
      // messaging: true,
      performance: true,
      analytics: true,
      // remoteConfig: true
    },
  },
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: process.env.BASE_URL,
  },
  publicRuntimeConfig: {
    axios: {
      browserBaseURL: process.env.BROWSER_BASE_URL,
    },
  },
  privateRuntimeConfig: {
    axios: {
      baseURL: process.env.BASE_URL,
    },
  },

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {
    nestedProperties: ['region.states.name'],
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    // treeShake: true,
    theme: {
      dark: false,
      themes: {
        light: {
          primary: colors.cyan.darken4,
          // accent: colors.grey.darken3,
          // secondary: colors.amber.darken3,
          // info: colors.teal.lighten1,
          // warning: colors.amber.base,
          // error: colors.deepOrange.accent4,
          // success: colors.green.accent3,
        },
        dark: {
          primary: colors.blue.darken4,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },
  googleAnalytics: {
    id: 'UA-205843034-1',
  },

  sitemap: {
    defaults: {
      changefreq: 'daily',
      priority: 1,
      lastmod: new Date(),
    },
    hostname: process.env.BASE_URL || 'http://laboverflow.com',
    routes: async () => {
      return await getRoutes()
      // https://jackwhiting.co.uk/posts/generating-sitemap-entries-for-nuxt-content/
      // const { $content } = require('@nuxt/content')
      // const blog = await $content('blog').fetch()
      // // Setup an empty array we will push to.
      // const routes = []

      // // Add an entry for the item including lastmod and priorty
      // blog.forEach((article) =>
      //   routes.push({
      //     url: article.path,
      //   })
      // )
      // console.log('routes', routes)
      // // return all routes
      // return [routes]
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    babel: {
      plugins: [
        ['@babel/plugin-proposal-private-property-in-object', { loose: true }],
      ],
    },
  },
}
