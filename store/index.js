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

  // async nuxtServerInit({ commit }, payload) {
  //   await commit('setJobAd', payload)
  // },
}
