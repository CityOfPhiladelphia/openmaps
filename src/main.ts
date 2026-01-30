import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import "@phila/phila-ui-core/styles/tokens.css";
import "@phila/phila-ui-core/styles/template-light.css";

// FontAwesome setup
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faLocationCrosshairs,
  faRulerCombined,
  faXmark,
  faCheck,
  faTrash,
} from '@fortawesome/free-solid-svg-icons'

// Add icons to library
library.add(
  faLocationCrosshairs,
  faRulerCombined,
  faXmark,
  faCheck,
  faTrash
)

const app = createApp(App)

// Register FontAwesome component globally
app.component('FontAwesomeIcon', FontAwesomeIcon)

app.use(createPinia())

app.mount('#app')
