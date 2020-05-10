import * as lodash from 'lodash'

export const state = () => ({
  uploadMt4FormVisible: false,
  parsedMT4Orders: [],
  selectedMT4Tickets: []
})

export const mutations = {
  SET_UPLOAD_MT4_FORM_VISIBLE (state, visible) {
    state.uploadMt4FormVisible = visible
  },
  SET_PARSED_MT4_ORDERS (state, orders) {
    state.parsedMT4Orders = orders
  },
  ADD_TO_SELECTED_TICKETS (state, tickets) {
    if (!Array.isArray(tickets)) {
      tickets = [tickets]
    }
    state.selectedMT4Tickets = lodash.union(state.selectedMT4Tickets, tickets)
  },
  REMOVE_FROM_SELECTED_TICKETS (state, tickets) {
    if (!Array.isArray(tickets)) {
      tickets = [tickets]
    }
    state.selectedMT4Tickets = lodash.difference(state.selectedMT4Tickets, tickets)
  },
  SET_SELECTED_TICKETS (state, tickets) {
    state.selectedMT4Tickets = tickets
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
    const ordersRaw = JSON.parse(data.orders)
    const orders = ordersRaw.map((o) => {
      return {
        ...o,
        time_open: new Date(o.time_open),
        time_close: o.time_close ? new Date(o.time_close) : o.time_close,
        item: o.item.toUpperCase()
      }
    })
    commit('SET_PARSED_MT4_ORDERS', orders)
  },
  clearParsedMT4Orders ({ commit }) {
    commit('SET_PARSED_MT4_ORDERS', [])
  },
  addToSelectedTickets ({ commit }, tickets) {
    commit('ADD_TO_SELECTED_TICKETS', tickets)
  },
  removeFromSelectedTickets ({ commit }, tickets) {
    commit('REMOVE_FROM_SELECTED_TICKETS', tickets)
  },
  setSelectedTickets ({ commit }, tickets) {
    commit('SET_SELECTED_TICKETS', tickets)
  }
}

export const getters = {
  uploadMt4FormVisible: (state) => {
    return state.uploadMt4FormVisible
  },
  parsedMT4Orders: (state) => {
    console.log('Parsed orders getter...')
    return state.parsedMT4Orders
  },
  selectedTickets: (state) => {
    return state.selectedMT4Tickets
  },
  selectedOrders: (state) => {
    return lodash.filter(
      state.parsedMT4Orders,
      (order) => { return state.selectedMT4Tickets.includes(order.ticket) }
    )
  }
}
