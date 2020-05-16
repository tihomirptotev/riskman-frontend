export default function (app) {
  app.$axios.onError((error) => {
    if (error.response.status === 401) {
      app.$auth.loginWith('auth0')
    }
  })
}
