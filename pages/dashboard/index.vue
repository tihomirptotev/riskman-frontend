<template>
  <v-row
    align="center"
    justify="center"
  >
    <v-col class="srink">
      <div>Dashboard page</div>

    </v-col>
  </v-row>
</template>

<script>
export default {
  middleware: 'auth',
  async fetch ({ store, params }) {
    await store.dispatch('accounts/getAccounts', { root: true })
  }
}

</script>

<style lang="scss" scoped>
</style>
