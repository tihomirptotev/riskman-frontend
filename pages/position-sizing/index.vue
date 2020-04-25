<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="4">
        <v-card raised>
          <v-toolbar
            dark
            dense
            color="primary"
          >
            <v-toolbar-title>Position sizing form</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form>
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
                color="primary"
                @click="submit"
              >
                Calculate
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
      </v-col>
      <v-col cols="4">
        <v-card raised>
          <v-toolbar
            dark
            dense
            color="primary"
          >
            <v-toolbar-title>Position sizing results</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      currency: '',
      symbol: '',
      opTypes: ['buy', 'sell'],
      opType: '',
      entryPrice: null,
      balance: null,
      riskPct: null,
      slPrice: null,
      slPips: null,
      rrRatio: null,
      tpPrice: null,
      rules: {
        required: value => !!value || 'Required.',
        positiveNumber: value => value >= 0 || 'Non negative number required.'
      }
    }
  },
  computed: {
    ...mapGetters({
      currencyList: 'common/currencyList',
      fxSymbolList: 'common/fxSymbolList'
    })
  },
  methods: {
    submit () { },
    cancel () { }
  }
}
</script>

<style lang="scss" scoped>
</style>
