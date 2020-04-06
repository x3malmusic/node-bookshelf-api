import Vue from "vue";
import Vuex from "vuex";
import http from "../http";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userId: "",
    email: "",
  },

  mutations: {
    setUserData(state, data) {
      state.userId = data.userId;
      state.email = data.email;
    },
  },

  actions: {
    getUserData({ commit }) {
      http
        .get("/users/getUser")
        .then((res) => {
          if (res && res.data.loggedIn) commit(setUserData(res.data));
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  modules: {},
});
