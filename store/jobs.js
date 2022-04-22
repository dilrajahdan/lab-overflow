// state
export const state = () => ({
  jobs: [],
  activeJob: {},
  uniqueLocations: [],
  uniqueRoles: [],
  uniqueJobTypes: [],
})

export const getters = {
  //   scrapedJobs: (state) => state.scrapedJobs,
  //   paidJobs: (state) => state.paidJobs,
  getJobs: (state) => state.jobs,

  getPaidJobs: (state) => {
    return state.jobs.filter((job) => job.jobType === 'paid')
  },
  getFreeJobs: (state) => {
    return state.jobs.filter((job) => job.jobType === 'free')
  },
  getJobBySlug: (state) => (slug) => {
    return state.jobs.find((job) => job.slug === slug)
  },
  getUniqueLocations: (state) => {
    return state.uniqueLocations
  },
  getUniqueRoles: (state) => {
    return state.uniqueRoles
  },
  getUniqueTypes: (state) => {
    return state.uniqueJobTypes
  },
}

export const mutations = {
  setJobs: (state, payload) => {
    state.jobs = payload
  },
  setActiveJob: (state, payload) => {
    state.activeJob = payload
  },
  setUniqueLocations: (state, payload) => {
    state.uniqueLocations = payload
      .map((ele) => ele.location || '')
      .filter((ele, i, arr) => arr.indexOf(ele) === i && ele !== '')
  },
  setUniqueRoles: (state, payload) => {
    state.uniqueRoles = payload
      .map((ele) => ele.position || '')
      .filter((ele, i, arr) => arr.indexOf(ele) === i && ele !== '')
  },
  setUniqueJobTypes: (state, payload) => {
    state.uniqueJobTypes = payload
      .map((ele) => ele.type || '')
      .filter((ele, i, arr) => arr.indexOf(ele) === i && ele !== '')
  },
}

export const actions = {
  // set current by slug
  setActiveJob({ commit }, payload) {
    commit('setActiveJob', payload)
  },

  // Add job to jobs
  async addJob({ commit }, payload) {
    // console.log('addJob', payload)
    const job = {
      ...payload,
      jobType: 'paid',
    }
    await this.$fire.firestore
      .collection('jobs')
      .add(job)
      .then((docRef) => {
        // console.log('Document written with ID: ', docRef.id)
        commit('setJobs', [...state.jobs, { ...job, id: docRef.id }])
      })
      .catch((error) => {
        console.error('Error adding document: ', error)
      })
  },
}
