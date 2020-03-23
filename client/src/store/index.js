import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userId: "",
    email: ""
  },
  mutations: {
    setUserData(state, data) {
      state.userId = data.userId;
      state.email = data.email;
    }
  },
  actions: {},
  modules: {}
});
