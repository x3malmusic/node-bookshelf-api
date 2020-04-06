import Vue from "vue";
import Vuex from "vuex";
import http from "../http";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userId: "",
    email: "",
    posts: [],
  },

  mutations: {
    setUserData(state, data) {
      state.userId = data.userId;
      state.email = data.email;
    },

    setPosts(state, posts) {
      state.posts = posts;
    },
  },

  actions: {
    async getUserData({ commit }) {
      await http
        .get("/users/getUser")
        .then((res) => {
          if (res && res.data.loggedIn) commit("setUserData", res.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    async loadPosts({ commit }) {
      await http.get(`/posts/${this.state.userId}`).then(({ data }) => {
        commit("setPosts", data);
      });
    },

    async logOut() {
      await http.post("/auth/logout");
    },

    async login({ commit }, email, password) {
      await http
        .post("/auth/login", {
          email,
          password,
        })
        .then((res) => {
          if (res && res.data) {
            commit("setUserData", res.data);
          }
        });
    },
  },
  modules: {},
});
