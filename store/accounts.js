export const state = () => ({
  list: [],
  selected: null,
  deleteSelected: false,
  showAddForm: false,
  showEditForm: false
})

export const mutations = {
  populate (state, accounts) {
    state.list = accounts
  },

  remove (state, { account }) {
    state.list.splice(state.list.indexOf(account), 1)
  },

  setSelected (state, account) {
    state.selected = account
  },

  setShowAddForm (state, value) {
    state.showAddForm = value
  },

  setShowEditForm (state, value) {
    state.showEditForm = value
  }

}

export const actions = {
  async getAccounts ({ commit }) {
    const accounts = await this.$axios.$get('/accounts')
    commit('populate', accounts)
  },

  async addAccount (ctx, account) {
    await this.$axios.$post('/accounts', account)
    ctx.dispatch('getAccounts')
  },

  async updateAccount (ctx, account) {
    console.log(account)
    await this.$axios.$put('/accounts/' + account.id, account)
    ctx.dispatch('getAccounts')
  },

  async deleteAccount (ctx, account) {
    await this.$axios.$delete('/accounts/' + account.id)
    ctx.dispatch('getAccounts')
  }
}
