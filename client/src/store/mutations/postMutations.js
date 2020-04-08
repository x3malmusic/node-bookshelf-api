export default {
  deletePost(state, id) {
    state.posts = state.posts.filter((e) => e.id !== id);
  },
};
