<template>
  <vs-card class="card">
    <div slot="header">
      <h3>Authorization</h3>
    </div>
    <vs-input
      type="email"
      class="inputx mb"
      placeholder="Email"
      v-model="email"
    />
    <vs-input
      type="password"
      class="inputx mb"
      placeholder="Password"
      v-model="password"
    />
    <vs-button color="primary" class="mr" @click="register">Register</vs-button>
    <vs-button color="success" color-text="rgb(50,50,50)" @click="login"
      >Enter</vs-button
    >
  </vs-card>
</template>

<script>
import http from "../http";
import { mapMutations } from "vuex";

export default {
  name: "Auth",
  data: () => ({
    email: "",
    password: "",
  }),
  methods: {
    ...mapMutations(["setUserData"]),

    async register() {
      await http
        .post("/auth/register", {
          email: this.email,
          password: this.password,
        })
        .then((res) => {
          if (res && res.data) {
            this.setUserData(res.data);
            this.$router.push({ name: "posts" });
            this.$_notify_success("Logged In", "Welcome user");
          }
        })
        .catch((e) => {
          this.$_notify_error("Error", e.response.data.message);
        });
    },

    async login() {
      await http
        .post("/auth/login", {
          email: this.email,
          password: this.password,
        })
        .then((res) => {
          if (res && res.data) {
            this.setUserData(res.data);
            this.$router.push({ name: "posts" });
            this.$_notify_success("Logged In", "Welcome user");
          }
        })
        .catch((e) => {
          this.$_notify_error("Error", e.response.data.message);
        });
    },
  },
};
</script>

<style scoped>
.mb {
  margin-bottom: 10px;
}
.mr {
  margin-right: 10px;
}
.card {
  margin: 100px auto 0 auto;
  width: 400px;
}
</style>
