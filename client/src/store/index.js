import Vue from "vue";
import Vuex from "vuex";
import userActions from "./actions/userActions";
import postActions from "./actions/postActions";

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

    clearUserData(state) {
      state.userId = "";
      state.email = "";
      state.posts = "";
    },

    deletePost(state, id) {
      state.posts = state.posts.filter((e) => e.id !== id);
    },
  },

  actions: {
    ...userActions,
    ...postActions,
  },
  modules: {},
});
