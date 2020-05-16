export const state = () => ({
  psResults: null,
  psResultsVisible: false
})

export const mutations = {
  setPsResults (state, results) {
    state.psResults = results
  },
  setPsResultsVisible (state, show) {
    state.psResultsVisible = show
  }
}

export const actions = {
  async fetchPsResults ({ commit }, data) {
    commit('setPsResultsVisible', false)
    const results = await this.$axios.$post('/pos-sizing', data)
    commit('setPsResults', results)
    commit('setPsResultsVisible', true)
  },
  showResultsReport ({ commit }, show) {
    commit('setPsResultsVisible', show)
  }
}

export const getters = {
  psResults: (state) => {
    return state.psResults
  },
  psResultsVisible: (state) => {
    return state.psResultsVisible
  }
}
