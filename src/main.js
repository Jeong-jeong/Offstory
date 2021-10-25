import { createApp } from 'vue'
import FormValidator from '~/utils/formValidation'
import App from '~/App'
import store from '~/store'
import router from '~/routes'
import fetchPlugin from '~/plugins/fetch'
import axiosPlugin from '~/plugins/axios'

const app = createApp(App)
app.use(fetchPlugin, {
  pluginName: '$fetch',
})
app.use(fetchPlugin, {
  pluginName: '$axios',
})
app.use(store)
app.use(router)
app.mount('.app')

FormValidator()
