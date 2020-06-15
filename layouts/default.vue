<template>
  <v-app light>
    <v-navigation-drawer
      v-if="$auth.loggedIn"
      :mini-variant="miniVariant"
      clipped
      app
      dark
      color="primary"
      fixed
      expand-on-hover
      permanent
      width="210"
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          color="white"
          router
          exac
          dense
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar clipped-left fixed app color="primary" dark>
      <v-app-bar-nav-icon>
        <v-icon>mdi-finance</v-icon>
      </v-app-bar-nav-icon>
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <span v-if="$auth.loggedIn">
        Welcome, {{ $auth.user.nickname }}
        <v-btn class="ma-2" icon @click="onLogOut">
          <v-icon>mdi-logout-variant</v-icon>
        </v-btn>
      </span>
      <span v-else>
        <v-btn class="ma-2" icon @click="$auth.loginWith('auth0')">Log In</v-btn>
      </span>
    </v-app-bar>
    <v-content>
      <v-container fluid>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer :fixed="fixed" app>
      <span>&copy; 2020</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  // middleware: 'auth',
  data() {
    return {
      fixed: false,
      items: [
        {
          icon: 'mdi-monitor-dashboard',
          title: 'Dashboard',
          to: '/dashboard'
        },
        {
          icon: 'mdi-notebook-outline',
          title: 'Journal',
          to: '/journal'
        },
        {
          icon: 'mdi-currency-usd',
          title: 'Money Management',
          to: '/money-management'
        },
        {
          icon: 'mdi-chart-timeline-variant',
          title: 'PNL & DD',
          to: '/pnl-dd'
        },
        {
          icon: 'mdi-speedometer',
          title: 'Performance',
          to: '/performance'
        },
        {
          icon: 'mdi-file-edit-outline',
          title: 'Reviews',
          to: '/reviews'
        },
        {
          icon: 'mdi-calculator',
          title: 'Position sizing',
          to: '/position-sizing'
        },
        {
          icon: 'mdi-account-outline',
          title: 'My settings',
          to: '/user-settings'
        }
      ],
      miniVariant: true,
      title: 'Risk Manager'
    }
  },
  computed: mapGetters(['isAuthenticated']),

  methods: {
    onLogOut() {
      this.$auth.logout()
      const domain = this.$store.state.auth0Domain
      const clientId = this.$store.state.auth0ClientId
      window.location = `https://${domain}/v2/logout?returnTo=http%3A%2F%2F127.0.0.1:3000&client_id=${clientId}`
    }
  }
}
</script>
