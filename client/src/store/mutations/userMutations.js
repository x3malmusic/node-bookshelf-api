export default {
  setUserData(state, data) {
    state.userId = data.userId;
    state.email = data.email;
    state.token = data.token;
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
