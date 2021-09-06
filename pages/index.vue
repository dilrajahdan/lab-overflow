<template>
  <section class="fill-height">
    <section
      class="
        deep-purple
        white--text
        fill-height
        d-flex
        flex-column
        justify-center
      "
    >
      <v-container class="py-8">
        <v-row justify="center" class="">
          <v-col cols="10" offset="" md="8" xl="6">
            <h1 class="display-1 mb-6 display-1">
              The community for the cannabis testing industry
            </h1>
            <p class="font-weight-regular mb-9">
              Members of the cannabis testing industry are dissatisfied with
              their current information flow.
            </p>
            <p class="font-weight-regular mb-9">
              Knowledge is power. And the lack of knowledge about cannabis
              testing is losing labs and the industry itself money.
            </p>
            <p class="font-weight-regular mb-9">
              This a website where you can connect with other professionals
              anonymously in order to share and improve your methods, find
              reliable suppliers, pick up tips for your next career move and
              more – all while ensuring that knowledge flows freely between the
              lab community!
            </p>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-btn
            large
            to="/cannabis-testing-labs"
            dark
            class="my-6 flex flex-grow-0"
            >View Lab Directory</v-btn
          >
          <v-btn large to="/jobs" dark class="ml-3 my-6 flex flex-grow-0"
            >View Job Board</v-btn
          >
        </v-row>
      </v-container>
    </section>
  </section>
</template>

<script>
export default {
  data() {
    return {
      title: 'Homepage',
    }
  },
  head() {
    return {
      title: this.title,
      meta: [
        {
          hid: 'homepage',
          name: 'description',
          content: `The community for the cannabis testing industry. Join us, bring your wisdom and share your knowledge to bulk up your lab's methods! Exchange ideas with experienced industry workers, form virtual partnerships or start your next career move with us!`,
        },
      ],
    }
  },
}
</script>
