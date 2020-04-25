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
          <v-toolbar-title>Add new account</v-toolbar-title>
        </v-toolbar>
        <v-card-text class="mt-8">
          <v-form>
            <v-text-field
              v-model="name"
              label="Account name"
            />
            <v-autocomplete
              v-model="currency"
              :items="currencyList"
              label="Currency"
            />
            <v-text-field
              v-model="balance_start"
              label="Balance - start"
            />
            <v-menu
              v-model="menu"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="290px"
              disable-keys
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="balance_start_ts"
                  label="Balance - start date"
                  readonly
                  v-on="on"
                />
              </template>
              <v-date-picker
                v-model="balance_start_ts"
                @input="menu = false"
              />
            </v-menu>
            <v-btn
              color="primary"
              @click="submit"
            >
              Submit
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
  props: { dialog: Boolean },
  data () {
    return {
      menu: false,
      name: '',
      currency: '',
      balance_start: null,
      balance_start_ts: new Date().toISOString().substr(0, 10)
    }
  },
  computed: {
    ...mapGetters({
      currencyList: 'common/currencyList'
    })
  },
  methods: {
    cancel () {
      this.$store.commit('accounts/setShowAddForm', false, { root: true })
    },
    submit () {
      const account = {
        name: this.name,
        currency_id: this.currency,
        balance_start: parseFloat(this.balance_start),
        balance_start_ts: new Date(this.balance_start_ts).toISOString()
      }
      this.$store.dispatch('accounts/addAccount', account, { root: true })
      this.$store.commit('accounts/setShowAddForm', false, { root: true })
    }
  }
}
</script>

<style lang="scss" scoped></style>
