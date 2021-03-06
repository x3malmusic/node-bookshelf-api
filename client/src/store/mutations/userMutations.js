export default {
  setUserData(state, data) {
    state.userId = data.userId;
    state.email = data.email;
    state.loggedIn = data.loggedIn;
  },

  setPosts(state, posts) {
    state.posts = posts;
  },

  clearUserData(state) {
    state.userId = "";
    state.email = "";
    state.posts = "";
  },
};
