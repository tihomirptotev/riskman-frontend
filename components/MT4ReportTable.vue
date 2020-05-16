<template>
  <v-data-table
    v-model="selected"
    item-key="ticket"
    show-select
    caption="Table caption"
    class="elevation-1"
    :headers="headers"
    :items="orders"
    :items-per-page="5"
    :single-select="false"
    @item-selected="onOrderSelected"
    @toggle-select-all="onAllOrdersSelected"
  >
    <template v-slot:item.time_open="{ item }">
      {{ item.time_open.toLocaleString() }}
    </template>
    <template v-slot:item.time_close="{ item }">
      {{ item.time_close ? item.time_close.toLocaleString() : item.time_close }}
    </template>
  </v-data-table>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import * as lodash from 'lodash'
import consola from 'consola'
export default {
  data () {
    return {
      selected: [],
      headers: [
        {
          text: 'Ticket',
          align: 'start',
          sortable: true,
          value: 'ticket'
        },
        {
          text: 'Open',
          align: 'start',
          sortable: true,
          value: 'is_open'
        },
        {
          text: 'Type',
          align: 'start',
          sortable: true,
          value: 'type'
        },
        {
          text: 'Size',
          align: 'start',
          sortable: true,
          value: 'size'
        },
        {
          text: 'Item',
          align: 'start',
          sortable: true,
          value: 'item'
        },
        {
          text: 'Price Open',
          align: 'start',
          sortable: true,
          value: 'price_open'
        },
        {
          text: 'Stop Loss',
          align: 'start',
          sortable: true,
          value: 'sl'
        },
        {
          text: 'Take Profit',
          align: 'start',
          sortable: true,
          value: 'tp'
        },
        {
          text: 'Open Time',
          align: 'start',
          sortable: true,
          value: 'time_open'
        },
        {
          text: 'Close Time',
          align: 'start',
          sortable: true,
          value: 'time_close'
        },
        {
          text: 'Price Close',
          align: 'start',
          sortable: true,
          value: 'price_close'
        },
        {
          text: 'Commission',
          align: 'start',
          sortable: true,
          value: 'commission'
        },
        {
          text: 'Taxes',
          align: 'start',
          sortable: true,
          value: 'taxes'
        },
        {
          text: 'Swap',
          align: 'start',
          sortable: true,
          value: 'swap'
        },
        {
          text: 'Profit',
          align: 'start',
          sortable: true,
          value: 'profit'
        }
      ]
    }
  },
  computed: {
    ...mapGetters({ orders: 'journal/parsedMT4Orders' })
  },
  methods: {
    ...mapActions({
      addToSelectedTickets: 'journal/addToSelectedTickets',
      removeFromSelectedTickets: 'journal/removeFromSelectedTickets',
      clearSelectedTickets: 'journal/clearSelectedTickets',
      setSelectedTickets: 'journal/setSelectedTickets'
    }),
    onOrderSelected (row) {
      const toAdd = row.value
      if (toAdd) {
        this.addToSelectedTickets(row.item.ticket)
      } else {
        this.removeFromSelectedTickets(row.item.ticket)
      }
      consola.info('Order selected:', row.item.ticket, row.value)
    },
    onAllOrdersSelected (rows) {
      const selected = rows.value
      const tickets = lodash.map(rows.items, order => order.ticket)
      if (selected) {
        this.addToSelectedTickets(tickets)
      } else {
        this.removeFromSelectedTickets(tickets)
      }
      consola.info('All orders selected:', rows.items, rows.value)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
