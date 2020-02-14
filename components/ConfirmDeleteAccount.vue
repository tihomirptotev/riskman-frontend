<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="400"
    >
      <v-card>
        <!-- <v-card-title class="headline">Delete account</v-card-title> -->
        <v-card-title>Delete account</v-card-title>
        <v-card-text>You are going to delete {{ account.name }}. Are you sure?</v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="primary"
            text
            @click="confirm(false)"
          >Cancel</v-btn>
          <v-btn
            color="error"
            text
            @click="confirm(true)"
          >Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  props: { dialog: Boolean },

  computed: {
    account () {
      return this.$store.state.accounts.selected
    }
  },

  methods: {
    confirm (value) {
      this.$emit('confirmed', value)
    }
  }
}
</script>
