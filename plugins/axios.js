export default function (app) {
  app.$axios.onError((error) => {
    if (error.response.status === 401) {
      console.log('Unauthorized....')
      console.log(app)
      app.$auth.loginWith('auth0')
      console.log('After unauthorized....')
    }
  })
}
