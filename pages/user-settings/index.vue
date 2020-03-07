<template>
  <v-card
    raised
    style="padding:20px"
  >
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
                <strong>{{ user.nickname }}</strong>
              </v-col>
            </v-row>
            <v-row>
              <v-col md="1">Email:</v-col>
              <v-col md="3">
                <strong>{{ user.email }}</strong>
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
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(acc, index) in accounts"
                  :key="acc.id"
                >
                  <td>{{ acc.name }}</td>
                  <td>{{ acc.currency_id }}</td>
                  <td>{{ acc.balance_start_ts | date }}</td>
                  <td class="text-right">{{ acc.balance_start | currencyFormat(acc.currency_id) }}</td>
                  <!-- <td class="text-right">{{ acc.balanceCurrent | currencyFormat(acc.currency) }}</td> -->
                  <td>
                    <v-icon @click="editAccount(index, acc)">mdi-pencil</v-icon>
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
        <div v-if="showEditForm">
          <account-form-edit
            :dialog="showEditForm"
            :acc="selectedAccount"
          />
        </div>
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
import AccountFormEdit from '@/components/AccountFormEdit.vue'
import ConfirmDeleteAccount from '@/components/ConfirmDeleteAccount.vue'
const moment = require('moment')

export default {
  components: {
    AccountFormAdd,
    AccountFormEdit,
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
      showConfirmDelete: false,
      selectedAccount: null
    }
  },

  computed: {
    user () {
      return this.$store.state.auth.user
    },
    accounts () {
      return this.$store.state.accounts.list
    },
    showAddForm () {
      return this.$store.state.accounts.showAddForm
    },
    showEditForm () {
      return this.$store.state.accounts.showEditForm
    }
  },

  methods: {
    addAccount () {
      this.formVisible = true
    },
    editAccount (index, acc) {
      this.selectedAccount = { ...acc, balance_start_ts: acc.balance_start_ts.slice(0, 10) }
      this.$store.commit('accounts/setSelected', acc)
      this.$store.commit('accounts/setShowEditForm', true, { root: true })
    },
    onDeleteAccount (index, acc) {
      this.$store.commit('accounts/setSelected', acc)
      this.showConfirmDelete = true
    },
    deleteAccount (e) {
      if (e) {
        const acc = this.$store.state.accounts.selected
        this.$store.dispatch('accounts/deleteAccount', acc, { root: true })
      }
      this.$store.commit('accounts/setSelected', null)
      this.showConfirmDelete = false
    }
  }
}
</script>

<style lang="scss" scoped></style>
