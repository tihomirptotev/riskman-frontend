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
                <v-list-item @click="clearOrders()">
                  <v-list-item-title>Save selected records</v-list-item-title>
                </v-list-item>
                <v-list-item @click="clearOrders()">
                  <v-list-item-title>Save all records</v-list-item-title>
                </v-list-item>
                <v-list-item @click="clearOrders()">
                  <v-list-item-title>Clear all data</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
            <upload-file-form></upload-file-form>
            <m-t4-report-table v-if="hasOrders"></m-t4-report-table>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs>

  </div>
</template>

<script>
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
    ...mapGetters({ orders: 'journal/parsedMT4Orders' }),
    hasOrders () {
      return this.orders.length > 0
    }
  },
  methods: {
    ...mapActions({ showUploadForm: 'journal/setUploadMt4FormVisible', clearOrders: 'journal/clearParsedMT4Orders' })
  }

}

</script>

<style lang="scss" scoped>
</style>
