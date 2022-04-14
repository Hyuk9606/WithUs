import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import axios from 'axios'
import store from "./store";

Vue.config.productionTip = false;

const BACKEND_PORT = process.env.VUE_APP_BACKEND_PORT === null ? '' : `:${process.env.VUE_APP_BACKEND_PORT}`
const BACKEND_DOMAIN = process.env.VUE_APP_BACKEND_DOMAIN == null ? `${location.protocol}//${location.hostname}` : process.env.VUE_APP_BACKEND_DOMAIN
axios.defaults.baseURL = `${BACKEND_DOMAIN}${BACKEND_PORT}`

new Vue({
  el: '#app',
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
