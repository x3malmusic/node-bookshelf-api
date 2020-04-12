import Vue from "vue";
import Vuex from "vuex";
import userActions from "./actions/userActions";
import postActions from "./actions/postActions";
import userMutations from "./mutations/userMutations";
import postMutations from "./mutations/postMutations";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userId: "",
    email: "",
    posts: [],
    loggedIn: false,
  },

  mutations: {
    ...userMutations,
    ...postMutations,
  },

  actions: {
    ...userActions,
    ...postActions,
  },
  modules: {},
});
