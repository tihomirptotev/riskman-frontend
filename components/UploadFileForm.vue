<template>
  <v-row justify="center">
    <v-dialog
      v-model="uploadMt4FormVisible"
      persistent
      max-width="600px"
    >
      <v-card>
        <v-toolbar
          dark
          dense
          color="primary"
        >
          <v-toolbar-title>Upload MT4 Report</v-toolbar-title>
        </v-toolbar>
        <v-card-text class="mt-8">
          <v-form
            ref="form"
            v-model="valid"
            :lazy-validation="lazy"
          >
            <v-file-input
              v-model="uploadFile"
              show-size
              accept=".htm,.html"
              label="Report file input"
              :rules="[rules.required]"
            />
            <v-btn
              :disabled="!valid"
              color="primary"
              @click="submit"
            >
              Upload report
            </v-btn>
            <v-btn
              color="accent"
              @click="cancel"
            >
              Cancel
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  //   props: { dialog: Boolean },
  data () {
    return {
      uploadFile: null,
      lazy: false,
      valid: true,
      rules: {
        required: value => !!value || 'Required.'
      }
    }
  },
  computed: {
    ...mapGetters({
      uploadMt4FormVisible: 'journal/uploadMt4FormVisible'
    })
  },
  methods: {
    cancel () {
      this.$refs.form.reset()
      this.$store.dispatch('journal/setUploadMt4FormVisible', false, { root: true })
    },
    submit () {
      this.$store.dispatch('journal/uploadMT4Report', this.uploadFile, { root: true })
      this.$refs.form.reset()
      this.$store.dispatch('journal/setUploadMt4FormVisible', false, { root: true })
    }
  }
}
</script>

<style lang="scss" scoped></style>
