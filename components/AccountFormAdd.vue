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
              v-model="balanceStart"
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
                  v-model="startDate"
                  label="Balance - start date"
                  readonly
                  v-on="on"
                />
              </template>
              <v-date-picker
                v-model="startDate"
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
export default {
  props: { dialog: Boolean },
  data () {
    return {
      menu: false,
      name: '',
      currency: '',
      balanceStart: null,
      startDate: new Date().toISOString().substr(0, 10),
      currencyList: ['USD', 'EUR']
    }
  },
  methods: {
    cancel () {
      this.$store.commit('accounts/setShowAddForm', false, { root: true })
    },
    submit () {
      const account = {
        id: 3,
        name: this.name,
        currency: this.currency,
        balanceStart: parseFloat(this.balanceStart),
        balanceCurrent: parseFloat(this.balanceStart),
        startDate: this.startDate
      }
      this.$store.commit('accounts/add', account, { root: true })
      this.$store.commit('accounts/setShowAddForm', true, { root: true })
    }
  }
}
</script>

<style lang="scss" scoped></style>
