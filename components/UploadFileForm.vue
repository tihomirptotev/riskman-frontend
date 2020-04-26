<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
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
              show-size
              accept=".htm,.html"
              label="Report file input"
              v-model="uploadFile"
              :rules="[rules.required]"
            ></v-file-input>
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
export default {
  props: { dialog: Boolean },
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
  },
  methods: {
    cancel () {
      console.log('Cancel called...')
      this.$refs.form.reset()
    },
    submit () {
      this.$store.dispatch('journal/uploadMT4Report', this.uploadFile, { root: true })
    }
  }
}
</script>

<style lang="scss" scoped></style>
