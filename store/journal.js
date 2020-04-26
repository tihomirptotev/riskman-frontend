export const state = () => ({
  uploadMt4FormVisible: false,
  parsedMT4Orders: []
})

export const mutations = {
  SET_UPLOAD_MT4_FORM_VISIBLE (state, visible) {
    state.uploadMt4FormVisible = visible
  },
  SET_PARSED_MT4_ORDERS (state, orders) {
    state.parsedMT4Orders = orders
  }
}

export const actions = {
  setUploadMt4FormVisible ({ commit }, visible) {
    commit('SET_UPLOAD_MT4_FORM_VISIBLE', visible)
  },
  async uploadMT4Report ({ commit }, reportFile) {
    const formData = new FormData()
    formData.append('file', reportFile)
    const data = await this.$axios.$post('/positions/parse-mt4-report', formData)
    const orders = JSON.parse(data.orders)
    commit('SET_PARSED_MT4_ORDERS', orders)
  }
}

export const getters = {
  uploadMt4FormVisible: (state) => {
    return state.uploadMt4FormVisible
  },
  parsedMT4Orders: (state) => {
    return state.parsedMT4Orders
  }
}
