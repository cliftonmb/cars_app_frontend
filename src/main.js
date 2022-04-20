import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios';

var jwt = localStorage.getItem("jwt");
if (jwt) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
}

createApp(App).use(router).mount('#app')
