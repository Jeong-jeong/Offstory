import { createApp } from 'vue'
import FormValidator from './validation'
import App from '~/App'
import store from '~/store'
import router from '~/routes'

const app = createApp(App)
app.use(store)
app.use(router)
app.mount('.app')

FormValidator()
