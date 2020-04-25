<template>
  <v-container fluid>
    <v-row>
      <v-col cols="4">
        <v-card
          raised
          style="height: 600px"
        >
          <v-toolbar
            dark
            dense
            color="primary"
          >
            <v-toolbar-title>Position sizing form</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form
              ref="form"
              v-model="valid"
              :lazy-validation="lazy"
            >
              <v-row>
                <v-col>
                  <v-autocomplete
                    v-model="currency"
                    :items="currencyList"
                    label="Account Currency"
                    :rules="[rules.required]"
                  />
                </v-col>
                <v-col>
                  <v-autocomplete
                    v-model="symbol"
                    :items="fxSymbolList"
                    label="FX Symbol"
                    :rules="[rules.required]"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-autocomplete
                    v-model="opType"
                    :items="opTypes"
                    label="Operation type"
                    :rules="[rules.required]"
                  />
                </v-col>
                <v-col>
                  <v-text-field
                    type="number"
                    v-model="entryPrice"
                    label="Entry Price"
                    :rules="[rules.required,rules.positiveNumber]"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-text-field
                    type="number"
                    v-model="balance"
                    label="Account Balance"
                    :rules="[rules.required,rules.positiveNumber]"
                  />
                </v-col>
                <v-col>
                  <v-text-field
                    type="number"
                    v-model="riskPct"
                    label="Risk, %"
                    :rules="[rules.required,rules.positiveNumber]"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-text-field
                    type="number"
                    v-model="slPrice"
                    label="Stop Loss, price"
                    :rules="[rules.required,rules.positiveNumber]"
                  />
                </v-col>
                <v-col>
                  <v-text-field
                    type="number"
                    v-model="slPips"
                    label="Stop Loss, pips"
                    :rules="[rules.positiveNumber]"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-text-field
                    type="number"
                    v-model="rrRatio"
                    label="Reward to Risk, ratio"
                    :rules="[rules.positiveNumber]"
                  />
                </v-col>
                <v-col>
                  <v-text-field
                    type="number"
                    v-model="tpPrice"
                    label="Take Profit, price"
                    :rules="[rules.positiveNumber]"
                  />
                </v-col>
              </v-row>
              <v-btn
                :disabled="!valid"
                color="primary"
                @click="submit"
              >
                Calculate
              </v-btn>
              <v-btn
                color="error"
                @click="reset"
              >
                Reset
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col
        cols="4"
        v-if="psResultsVisible"
      >
        <v-card
          raised
          style="height: 600px"
        >
          <v-toolbar
            dark
            dense
            color="primary"
          >
            <v-toolbar-title>Position sizing results</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <template>
              <v-simple-table>
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-left">Name</th>
                      <th class="text-right">Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Currency</td>
                      <td class="text-right">{{ psResults.currency }}</td>
                    </tr>
                    <tr>
                      <td>Account Balance</td>
                      <td class="text-right">{{ psResults.balance | amountFormat }}</td>
                    </tr>
                    <tr>
                      <td>Amount at Risk</td>
                      <td class="text-right">{{ psResults.amount_at_risk | amountFormat }}</td>
                    </tr>
                    <tr>
                      <td>Pip Value</td>
                      <td class="text-right">{{ psResults.pip_value | floatFormat(4)}}</td>
                    </tr>
                    <tr>
                      <td>Position Size</td>
                      <td class="text-right">{{ psResults.pos_size | amountFormat }}</td>
                    </tr>
                    <tr>
                      <td>Reward to Risk</td>
                      <td class="text-right">{{ psResults.reward_to_risk }}</td>
                    </tr>
                    <tr>
                      <td>Stop Loss Pips</td>
                      <td class="text-right">{{ psResults.sl_pips | floatFormat(0)}}</td>
                    </tr>
                    <tr>
                      <td>Stop Loss Price</td>
                      <td class="text-right">{{ psResults.sl_price | floatFormat(4)}}</td>
                    </tr>
                    <tr>
                      <td>Take Profit Price</td>
                      <td class="text-right">{{ psResults.tp_price | floatFormat(4)}}</td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </template>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { filters } from '../../helpers/filters'
export default {
  middleware: 'auth',

  async fetch ({ store, params }) {
    await store.dispatch('common/getCurrencies', { root: true })
    await store.dispatch('common/getFxSymbols', { root: true })
  },

  data () {
    return {
      currency: null,
      symbol: null,
      opTypes: ['buy', 'sell'],
      opType: null,
      entryPrice: null,
      balance: null,
      riskPct: null,
      slPrice: null,
      slPips: null,
      rrRatio: null,
      tpPrice: null,
      rules: {
        required: value => !!value || 'Required.',
        positiveNumber: (value) => {
          if (value) {
            return value >= 0 || 'Non negative number required.'
          }
          return true
        }
      },
      valid: true,
      lazy: false
    }
  },
  filters: {
    ...filters
  },
  computed: {
    ...mapGetters({
      currencyList: 'common/currencyList',
      fxSymbolList: 'common/fxSymbolList',
      psResults: 'pos_size/psResults',
      psResultsVisible: 'pos_size/psResultsVisible'
    })
  },
  methods: {
    ...mapActions({ fetchPsResults: 'pos_size/fetchPsResults', showResultsReport: 'pos_size/showResultsReport' }),
    submit () {
      this.showResults = true
      const data = {
        symbol: this.symbol,
        operation_type: this.opType,
        acc_currency: this.currency,
        balance: this.balance,
        risk_percent: this.riskPct,
        entry_price: this.entryPrice,
        sl_price: this.slPrice,
        sl_pips: this.slPips ? this.slPips : 0,
        reward_to_risk_ratio: this.rrRatio ? this.rrRatio : 0,
        tp_price: this.tpPrice ? this.tpPrice : 0
      }
      this.fetchPsResults(data)
    },
    reset () {
      this.$refs.form.reset()
      this.showResultsReport(false)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
