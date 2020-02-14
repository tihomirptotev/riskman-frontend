<template>
  <v-card raised>
    <v-toolbar
      dense
      color="primary"
      dark
    >
      <v-toolbar-title>My settings</v-toolbar-title>
    </v-toolbar>
    <v-tabs>
      <v-tab style="{alignItems:left}">General Info</v-tab>
      <v-tab>Tradind accounts</v-tab>

      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <v-row>
              <v-col md="1">Username:</v-col>
              <v-col md="3">
                <strong>{{ username }}</strong>
              </v-col>
            </v-row>
            <v-row>
              <v-col md="1">Email:</v-col>
              <v-col md="3">
                <strong>{{ email }}</strong>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <v-simple-table>
              <thead>
                <tr>
                  <th class="text-left">Account Name</th>
                  <th class="text-left">Currency</th>
                  <th class="text-left">Start Date</th>
                  <th class="text-right">Balance - Start</th>
                  <th class="text-right">Balance - Current</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(acc, index) in accounts"
                  :key="acc.id"
                >
                  <td>{{ acc.name }}</td>
                  <td>{{ acc.currency }}</td>
                  <td>{{ acc.startDate | date }}</td>
                  <td class="text-right">{{ acc.balanceStart | currencyFormat(acc.currency) }}</td>
                  <td class="text-right">{{ acc.balanceCurrent | currencyFormat(acc.currency) }}</td>
                  <td>
                    <v-icon @click="editAccount(acc)">mdi-pencil</v-icon>
                    <v-icon
                      color="error"
                      @click="onDeleteAccount(index, acc)"
                    >mdi-delete</v-icon>
                  </td>
                </tr>
              </tbody>
              <v-btn
                fab
                color="primary"
                bottom
                right
                absolute
                @click="() => this.$store.commit('accounts/setShowAddForm', true)"
              >
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </v-simple-table>
          </v-card-text>
        </v-card>
        <account-form-add :dialog="showAddForm" />
        <div v-if="showConfirmDelete">
          <confirm-delete-account
            :dialog="showConfirmDelete"
            @confirmed="deleteAccount"
          />
        </div>
      </v-tab-item>
    </v-tabs>
  </v-card>
</template>

<script>
import AccountFormAdd from '@/components/AccountFormAdd.vue'
import ConfirmDeleteAccount from '@/components/ConfirmDeleteAccount.vue'
const moment = require('moment')

export default {
  components: {
    AccountFormAdd,
    ConfirmDeleteAccount
  },
  filters: {
    date (dt) {
      return moment(dt).format('LL')
    },
    currencyFormat (value, currencyName) {
      const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currencyName
      })
      return formatter.format(value)
    }
  },

  async fetch ({ store, params }) {
    await store.dispatch('accounts/getAccounts', { root: true })
  },

  data () {
    return {
      formVisible: false,
      username: 'tihomirptotev',
      email: 'tihomirptotev@gmail.com'
    }
  },

  computed: {
    accounts () {
      return this.$store.state.accounts.list
    },
    showConfirmDelete () {
      return this.$store.state.accounts.deleteSelected
    },
    showAddForm () {
      return this.$store.state.accounts.showAddForm
    }
  },

  methods: {
    addAccount () {
      this.formVisible = true
    },
    editAccount (acc) { },
    onDeleteAccount (index, acc) {
      this.$store.commit('accounts/setSelected', acc)
      this.$store.commit('accounts/setDeleteSelected', true)
    },
    deleteAccount (e) {
      if (e) {
        const acc = this.$store.state.accounts.selected
        this.$store.commit('accounts/remove', acc, { root: true })
      }
      this.$store.commit('accounts/setDeleteSelected', false)
      this.$store.commit('accounts/setSelected', null)
    }
  }
}
</script>

<style lang="scss" scoped></style>
