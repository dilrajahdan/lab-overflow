import axios from 'axios'
// import data from "~/static/storedata.json";

export const state = () => ({
  // storedata: data,
  clientSecret: '', // Required to initiate the payment from the client
})

export const getters = {
  clientSecret: (state) => state.clientSecret,
}

export const mutations = {
  setClientSecret: (state, payload) => {
    state.clientSecret = payload
  },
}

export const actions = {
  async createPaymentIntent({ getters, commit }) {
    try {
      // Create a PaymentIntent with the information about the order
      const result = await axios.post(
        '/.netlify/functions/create-payment-intent',
        {
          items: [{ id: 'job-post-30-days' }],
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
      }
    } catch (e) {
      console.log('error', e)
    }
  },
}
