const moment = require('moment')

export const filters = {
  date (dt) {
    return moment(dt).format('LL')
  },
  floatFormat (value, precision) {
    return value.toFixed(precision)
  },
  amountFormat (value) {
    return value.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  },
  currencyFormat (value, currencyName) {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currencyName
    })
    return formatter.format(value)
  }
}
