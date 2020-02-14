export const state = () => ({
  list: [],
  selected: null,
  deleteSelected: false,
  showAddForm: false

})

export const mutations = {
  populate (state, accounts) {
    state.list = accounts
  },

  add (state, account) {
    state.list.push(account)
  },

  remove (state, { account }) {
    state.list.splice(state.list.indexOf(account), 1)
  },

  setSelected (state, account) {
    state.selected = account
  },

  setDeleteSelected (state, value) {
    state.deleteSelected = value
  },

  setShowAddForm (state, value) {
    state.showAddForm = value
  }

}

export const actions = {
  async getAccounts ({ commit }) {
    const resp = await this.$axios.$get('http://localhost:8000/accounts')
    commit('populate', resp.data)
  }
}
