import http from "../../http";

export default {
  async getUserData({ commit }) {
    const token = localStorage.getItem("token");
    if (token) {
      await http.get("/users/getUser", { token: token }).then((res) => {
        if (res && res.data.loggedIn) commit("setUserData", res.data);
      });
    }
  },

  async loadPosts({ commit }, id) {
    await http.get(`/posts/${id}`).then(({ data }) => {
      commit("setPosts", data);
    });
  },

  logOut({ commit }) {
    commit("clearUserData");
    localStorage.removeItem("token");
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
          localStorage.setItem("token", res.data.token);
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
          localStorage.setItem("token", res.data.token);
        }
      });
  },
};
