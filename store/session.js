const defaultState = () => ({
  isLoggedIn: false,
  user: null
})

export const state = defaultState

export const mutations = {
  setIsLoggedIn (state, status) {
    state.isLoggedIn = status
  },

  setUser (state, user) {
    state.user = user
  },

  resetState (state) {
    Object.assign(state, defaultState())
  }

}

export const actions = {
  logIn ({ commit }) {
    const status = true
    const user = { id: '123', email: 'email', username: 'username' }
    commit('setIsLoggedIn', status)
    commit('setUser', user)
  },

  logOut ({ commit }) {
    commit('resetState')
  }
}
