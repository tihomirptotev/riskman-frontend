<template>
  <v-app light>
    <v-navigation-drawer
      :mini-variant="miniVariant"
      clipped
      fixed
      app
      expand-on-hover
      permanent
      width="210"
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          color="primary"
          router
          exac
          dense
        >
          <v-list-item-action>
            <v-icon color="primary">{{ item.icon }}</v-icon>
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
    </v-app-bar>
    <v-content>
      <v-container fluid>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer :fixed="fixed" app>
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data () {
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
          icon: 'mdi-account-outline',
          title: 'My settings',
          to: '/user-settings'
        }
      ],
      miniVariant: true,
      title: 'Risk Manager'
    }
  }
}
</script>
