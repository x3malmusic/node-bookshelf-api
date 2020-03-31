<template>
  <vs-card class="card">
    <div slot="header">
      <h3>Register</h3>
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
    <vs-input
      type="password"
      class="inputx mb"
      placeholder="Confirm password"
      v-model="confirmPassword"
    />
    <vs-button color="primary" class="mr" @click="register">Register</vs-button>
    <router-link to="/login">Sign In</router-link>
  </vs-card>
</template>

<script>
import http from "../http";
import { mapMutations } from "vuex";

export default {
  name: "Register",
  data: () => ({
    email: "",
    password: "",
    confirmPassword: "",
  }),

  methods: {
    ...mapMutations(["setUserData"]),

    async register() {
      if (this.password === this.confirmPassword) {
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
      } else {
        this.$_notify_error("Error", "Passwords doesnt match");
      }
    },
  },
};
</script>

