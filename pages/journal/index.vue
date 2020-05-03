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
            <v-btn
              class="mb-5"
              color="error"
              @click="clearOrders()"
              v-if="hasOrders"
            >
              Clear data
            </v-btn>
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
