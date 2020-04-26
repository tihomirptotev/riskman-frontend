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
              color="primary"
              @click="showUploadForm(true)"
            >
              Upload report
            </v-btn>
            <upload-file-form></upload-file-form>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs>

  </div>
</template>

<script>
import { mapActions } from 'vuex'
import UploadFileForm from '@/components/UploadFileForm.vue'

export default {
  components: {
    UploadFileForm
  },
  data () {
    return {}
  },
  methods: {
    ...mapActions({ showUploadForm: 'journal/setUploadMt4FormVisible' })

  }

}
</script>

<style lang="scss" scoped>
</style>
