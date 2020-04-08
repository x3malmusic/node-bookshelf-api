export default {
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
}