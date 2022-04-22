import axios from 'axios'
// import data from "~/static/storedata.json";

export const state = () => ({
  // storedata: data,
  clientSecret: '', // Required to initiate the payment from the client
  jobAd: {},
})

export const getters = {
  clientSecret: (state) => state.clientSecret,
  jobAd: (state) => state.jobAd,
}

export const mutations = {
  setClientSecret: (state, payload) => {
    state.clientSecret = payload
  },
  setJobAd: (state, payload) => {
    state.jobAd = payload
  },
}

export const actions = {
  async createPaymentIntent({ getters, commit }) {
    try {
      // console.log('dil createPaymentIntent', this.getters.jobAd, getters.jobAd)
      // Create a PaymentIntent with the information about the order
      const result = await axios.post(
        '/.netlify/functions/create-payment-intent',
        {
          items: [{ id: 'job-post-30-days' }],
          jobAd: this.getters.jobAd,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      if (result.data.clientSecret) {
        // Store a reference to the client secret created by the PaymentIntent
        // This secret will be used to finalize the payment from the client
        commit('setClientSecret', result.data.clientSecret)
        commit('setJobAd', this.getters.jobAd)
      }
    } catch (e) {
      console.log('error', e)
    }
  },

  setJobAd({ commit }, payload) {
    commit('setJobAd', payload)
  },

  // Get jobs
  async nuxtServerInit({ commit }, payload) {
    // console.log(payload)
    let scrapedJobs = await this.$content('jobs').fetch()
    scrapedJobs = scrapedJobs.map((v) => ({ ...v, jobType: 'free' }))

    let paidJobs = await this.$fire.firestore
      .collection('jobs')
      .get()
      .then((querySnapshot) => {
        const jobs = []
        querySnapshot.forEach((doc) => {
          jobs.push({ id: doc.id, ...doc.data() })
        })
        return jobs
      })
    paidJobs = paidJobs.map((v) => ({ ...v, jobType: 'paid' }))

    console.log('scrapedJobs', scrapedJobs)
    console.log('paidJobs', paidJobs)

    // Combine paid and free jobs
    await commit('jobs/setJobs', [...scrapedJobs, ...paidJobs])
    // Set get unique values for filters
    await commit('jobs/setUniqueLocations', [...scrapedJobs, ...paidJobs])
    await commit('jobs/setUniqueRoles', [...scrapedJobs, ...paidJobs])
    await commit('jobs/setUniqueJobTypes', [...scrapedJobs, ...paidJobs])
  },
}
