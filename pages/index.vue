<template>
  <div class="">
    <v-sheet
      class="deep-purple white--text d-flex flex-column justify-center py-3"
    >
      <v-container class="">
        <v-row class="">
          <v-col cols="12" md="8">
            <v-card-title>
              <h1 class="overline">
                Lab Overflow
                <!-- ({{ $vuetify.breakpoint.name }}) -->
              </h1>
            </v-card-title>
            <v-card-subtitle class="">
              <h2 class="display-1">
                Empowering cannabis testing labs to develop technology through
                collective knowledge
              </h2>
            </v-card-subtitle>
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>

    <v-container class="mt-2">
      <subscribe-to-jobs></subscribe-to-jobs>
    </v-container>
    <v-container>
      <v-row>
        <v-col cols="12" class="">
          <v-card
            to="/blog/the-cost-of-testing-cannabis-for-small-medium-and-large-labs"
          >
            <v-img
              dark
              height="200"
              src="/blog-content/piggy-bank.jpg"
              class="align-end"
              position="0% 50%"
              gradient="to top, rgba(0,0,0,.77) , rgba(25,32,72,.0)"
            >
              <v-container>
                <v-row align="end" justify="center" class="">
                  <v-col cols="12">
                    <v-card-subtitle class="text-overline py-0 my-0"
                      >Last article</v-card-subtitle
                    >
                    <v-card-title class="text-h4 pt-0"
                      >The cost of testing cannabis for small, medium, and large
                      labs</v-card-title
                    >
                    <v-card-subtitle class="pt-2"
                      >By Asrinus Subha</v-card-subtitle
                    >
                  </v-col>
                </v-row>
              </v-container>
            </v-img>

            <!-- <v-img
              class="white--text align-end"
              height="200px"
              src="/blog-content/Cannabis-flower-next-to-an-Erlenmeyer-flask.jpeg"
            >
              <v-card-subtitle class="text-overline py-0 my-0"
                >Last article</v-card-subtitle
              >
              <v-card-title class="pt-0"
                >Cannabis Lab 101: Cannabinoid Separation Methods in the Public
                Domain -Everything you need to know</v-card-title
              >
            </v-img> -->
          </v-card>
        </v-col>
      </v-row>

      <v-row class="">
        <v-col cols="12" sm="6" class="">
          <v-card class="fill-height d-flex flex-column">
            <v-card-title>
              <h2 class="text-h6">Featured lab</h2>
            </v-card-title>
            <v-card-text class="fill-height">
              <v-card
                dark
                color=""
                class="fill-height"
                to="/cannabis-testing-labs/usa/hawaii/aeos-labs"
              >
                <!-- 282 -->
                <v-img
                  position="0 0%"
                  :src="require('~/assets/img/hawaii.webp')"
                  height=""
                  gradient="to top , rgba(0,0,0,.77) 10%, rgba(0,96,100,.3) 40%"
                  class="fill-height"
                >
                  <v-row
                    no-gutters
                    align="end"
                    justify="end"
                    class="fill-height text--white"
                  >
                    <v-col class="">
                      <v-card-subtitle class="overline pb-0"
                        >Hawaii, USA</v-card-subtitle
                      >
                      <v-card-title class="text-h2 font-weight-medium pt-0"
                        >Aeos Labs</v-card-title
                      >
                    </v-col>
                  </v-row>
                  <!-- <v-row>
                    
                  </v-row> -->
                </v-img>
              </v-card>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn block color="primary" to="/cannabis-testing-labs"
                >View all labs</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6" class="">
          <v-card class="">
            <v-card-title>
              <h2 class="text-h6">Latest jobs</h2>
            </v-card-title>
            <v-card-text>
              <!-- {{ paidJobs }} -->
              <!-- <client-only> -->
              <live-preview
                v-for="item in paidJobs"
                :key="`job-${item.id}`"
                dense
                :featured="false"
                :to="`/job-board/${item.slug}`"
                :job="item"
                @click.native="openJob(item)"
              >
              </live-preview>
              <!-- </client-only> -->
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn block color="primary" to="/job-board">View all jobs</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" sm="3" class="">
          <v-card color="pink lighten-5" to="/growers/add">
            <v-img
              gradient="to bottom , rgba(0,0,0,.77) 10%, rgba(0,96,100,.3) 40%"
              dark
              height="280"
              :src="require('~/assets/img/baby-plant.jpeg')"
            >
              <v-card-title
                ><h4 class="text-h6">Are you a grower?</h4></v-card-title
              >
              <v-card-subtitle class="pt-2"
                ><p class="mb-0">
                  Want to be featured on Lab Overflow... or want to connect with
                  certified labs in your area? Add your details today!
                </p></v-card-subtitle
              >
            </v-img>
          </v-card>
        </v-col>
        <v-col cols="12" sm="3" class="">
          <v-card
            color="pink lighten-5"
            href="https://www.reddit.com/r/laboverflow/"
          >
            <v-img
              gradient="to bottom , rgba(0,0,0,.77) 10%, rgba(0,96,100,.3) 40%"
              dark
              height="280"
              :src="require('~/assets/img/reddit.png')"
            >
              <v-card-title><h4 class="text-h6">Love Reddit?</h4></v-card-title>
              <v-card-subtitle class="pt-2"
                ><p class="mb-0">Join our sub</p></v-card-subtitle
              >
            </v-img>
          </v-card>
        </v-col>

        <v-col cols="12" sm="3" class="fill-height">
          <v-card color="pink lighten-5" to="/mastermind">
            <v-img
              gradient="to bottom , rgba(0,0,0,.77) 10%, rgba(0,96,100,.3) 40%"
              dark
              height="280"
              :src="require('~/assets/img/mindset.jpg')"
            >
              <v-card-title
                ><h4 class="text-h6">
                  Connect with like-minded lab professionals
                </h4></v-card-title
              >
              <v-card-subtitle class="pt-2"
                ><p class="mb-0">
                  Share challenges, learn from each other, and hold each other
                  accountable to help achieve your goals? Join the Mastermind
                  community today
                </p></v-card-subtitle
              >
            </v-img>
          </v-card>
        </v-col>
        <v-col cols="12" sm="3" class="fill-height">
          <share-the-love-card
            class="fill-height"
            fill-height
            :url="`https://laboverflow.com`"
            :title="pageTitle"
            :description="pageDescription"
            hashtags="forum,job-board,lab-directory,cannabis,testing,lab,laboverflow"
          ></share-the-love-card>
        </v-col>
      </v-row>
      <!-- <div id="discourse-comments"></div> -->
    </v-container>
  </div>
</template>

<script>
import ogImage from '@/assets/img/laboverflow-bg.png'
export default {
  asyncData({ store, route }) {
    // const paidJobs = await store.getters['jobs/getPaidJobs']
    // console.log('DIKL', `${process.env.baseURL}/img/laboverflow.png`)
    return {
      // baseURL: process.env.baseURL,
    }
  },
  data() {
    return {
      pageName: 'home',
      pageTitle: 'Lab Overflow',
      pageDescription:
        'Empowering cannabis testing labs to develop technology through collective knowledge',
    }
  },
  head() {
    return {
      title: this.pageTitle,
      meta: [
        {
          hid: this.pageName,
          name: this.pageTitle,
          content: this.pageDescription,
        },
        { hid: 'og-type', property: 'og:type', content: 'website' },
        { hid: 'og-title', property: 'og:title', content: this.pageTitle },
        {
          hid: 'og-desc',
          property: 'og:description',
          content: this.pageDescription,
        },
        {
          hid: 'og-image',
          property: 'og:image',
          content: `${process.env.baseURL}${ogImage}`,
        },
        {
          hid: 't-type',
          name: 'twitter:card',
          content: `${process.env.baseURL}${ogImage}`,
        },
        {
          hid: 'og-url',
          property: 'og:url',
          content: `${process.env.baseURL}${this.$route.path}`,
        },
      ],
    }
  },
  computed: {
    paidJobs() {
      // return this.$store.getters['jobs/getPaidJobs']
      return this.$store.getters['jobs/getFreeJobs'].slice(0, 3)
    },
  },
  mounted() {
    // console.log('mounted', await this.$store.getters['jobs/getPaidJobs'])
    // const DiscourseEmbed = {
    //   discourseUrl: 'https://forum.laboverflow.com/',
    //   // discourseEmbedUrl: 'https://laboverflow.com/',
    //   discourseEmbedUrl: 'http://localhost:8888/',
    // }
    // ;(function () {
    //   const d = document.createElement('script')
    //   d.type = 'text/javascript'
    //   d.async = true
    //   d.src = DiscourseEmbed.discourseUrl + 'javascripts/embed.js'
    //   ;(
    //     document.getElementsByTagName('head')[0] ||
    //     document.getElementsByTagName('body')[0]
    //   ).appendChild(d)
    // })()
  },
}
</script>
