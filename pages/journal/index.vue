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
            <upload-file-form></upload-file-form>
            <m-t4-report-table></m-t4-report-table>
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
    ...mapGetters({ orders: 'journal/parsedMT4Orders' })
  },
  methods: {
    ...mapActions({ showUploadForm: 'journal/setUploadMt4FormVisible' })

  }

}
</script>

<style lang="scss" scoped>
</style>
