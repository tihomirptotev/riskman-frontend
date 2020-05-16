<template>
  <div>
    <v-tabs>
      <v-tab style="{alignItems:left}">Positions</v-tab>
      <v-tab>Upload</v-tab>
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            Positions tab ...
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <v-btn
              class="mb-5"
              color="primary"
              @click="showUploadForm(true)"
            >
              Upload report
            </v-btn>

            <v-menu
              v-if="hasOrders"
              open-on-hover
              bottom
              offset-y
            >
              <template v-slot:activator="{ on }">
                <v-btn
                  class="mb-5"
                  color="primary"
                  dark
                  v-on="on"
                >
                  Available actions
                </v-btn>
              </template>

              <v-list>
                <v-list-item
                  v-if="selectedOrders.length>0"
                  @click="saveSelectedOrders()"
                >
                  <v-list-item-title>Save selected {{ selectedOrders.length }} orders</v-list-item-title>
                </v-list-item>
                <v-list-item @click="clearOrders()">
                  <v-list-item-title>Save all orders</v-list-item-title>
                </v-list-item>
                <v-list-item @click="clearOrders()">
                  <v-list-item-title>Clear all data</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
            <upload-file-form />
            <m-t4-report-table v-if="hasOrders" />
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs>

  </div>
</template>

<script>
import consola from 'consola'
import { mapActions, mapGetters } from 'vuex'
import UploadFileForm from '@/components/UploadFileForm.vue'
import MT4ReportTable from '@/components/MT4ReportTable.vue'

export default {
  components: {
    UploadFileForm,
    MT4ReportTable
  },
  data () {
    return {}
  },
  computed: {
    ...mapGetters({
      orders: 'journal/parsedMT4Orders',
      selectedOrders: 'journal/selectedOrders'
    }),
    hasOrders () {
      return this.orders.length > 0
    }
  },
  methods: {
    ...mapActions({
      showUploadForm: 'journal/setUploadMt4FormVisible',
      clearOrders: 'journal/clearParsedMT4Orders'
    }),
    saveSelectedOrders () {
      consola.info('Selected orders:', this.selectedOrders)
    }
  }
}

</script>

<style lang="scss" scoped>
</style>
