// state
export const state = () => ({
  jobs: [],
  currentJob: {},
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
}

export const mutations = {
  setJobs: (state, payload) => {
    state.jobs = payload
  },
  //   setCurrentJob: (state, payload) => {
  //     // get the job by slug
  //     const job = state.jobs.find((job) => job.slug === payload)
  //     state.currentJob = job
  //   },

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
  //   setCurrentJob({ commit }, payload) {
  //     commit('setCurrentJob', payload)
  //   },
}
