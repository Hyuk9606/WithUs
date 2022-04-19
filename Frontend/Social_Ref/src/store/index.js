import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import account from "./modules/account";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: { account },
  plguins: [createPersistedState({ storage: window.sessionStorage })],
});
