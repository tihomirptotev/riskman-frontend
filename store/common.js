export const state = () => ({
  currencies: [],
  fxSymbols: []
})

export const mutations = {
  setCurrencies (state, currencies) {
    state.currencies = currencies
  },
  setFxSymbols (state, fxSymbols) {
    state.fxSymbols = fxSymbols
  }
}

export const actions = {
  async getCurrencies ({ commit }) {
    const currencies = await this.$axios.$get('/common/currencies')
    commit('setCurrencies', currencies)
    console.log('Currencies fetched...')
  },
  async getFxSymbols ({ commit }) {
    const fxSymbols = await this.$axios.$get('/common/fx-symbols')
    commit('setFxSymbols', fxSymbols)
    console.log('Currencies fetched...')
  }
}

export const getters = {
  currencyList: (state) => {
    return state.currencies
  },
  fxSymbolList: (state) => {
    return state.fxSymbols
  }
}
