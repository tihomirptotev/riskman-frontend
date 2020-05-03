<template>
  <v-data-table
    v-model="selected"
    :headers="headers"
    :items="orders"
    :items-per-page="5"
    :single-select="false"
    item-key="ticket"
    show-select
    class="elevation-1"
  >
    <template v-slot:item.time_open="{ item }">
      {{ item.time_open.toLocaleString() }}
    </template>
    <template v-slot:item.time_close="{ item }">
      {{ item.time_close.toLocaleString() }}
    </template>
  </v-data-table>
</template>

<script>
import { mapGetters } from 'vuex'
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
  }
}
</script>

<style lang="scss" scoped>
</style>
