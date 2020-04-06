import http from "../../http";

export default {
  async getUserData({ commit }) {
    await http.get("/users/getUser").then((res) => {
      if (res && res.data.loggedIn) commit("setUserData", res.data);
    });
  },

  async loadPosts({ commit }) {
    await http.get(`/posts/${this.state.userId}`).then(({ data }) => {
      commit("setPosts", data);
    });
  },

  async logOut({ commit }) {
    await http.post("/auth/logout");
    commit("clearUserData");
  },

  async login({ commit }, { email, password }) {
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

  async register({ commit }, { email, password }) {
    await http
      .post("/auth/register", {
        email,
        password,
      })
      .then((res) => {
        if (res && res.data) {
          commit("setUserData", res.data);
        }
      });
  },
};
