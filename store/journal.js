export const state = () => ({
  uploadMt4FormVisible: false,
  parsedMT4Orders: []
})

export const mutations = {
  setUploadMt4FormVisible (state, visible) {
    state.uploadMt4FormVisible = visible
  },
  setParsedMT4Orders (state, orders) {
    state.parsedMT4Orders = orders
  }
}

export const actions = {
  setUploadMt4FormVisible ({ commit }, visible) {
    commit('setUploadMt4FormVisible', visible)
  },
  async uploadMT4Report ({ commit }, reportFile) {
    const formData = new FormData()
    formData.append('file', reportFile)
    const data = await this.$axios.$post('/positions/parse-mt4-report', formData)
    const orders = JSON.parse(data.orders)
    commit('setParsedMT4Orders', orders)
  }
}

export const getters = {
  uploadMt4FormVisible: (state) => {
    return state.uploadMt4FormVisible
  }
}
