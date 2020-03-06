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
import { http } from "../http";
import { mapMutations } from "vuex";

export default {
  name: "Auth",
  data: () => ({
    email: "",
    password: ""
  }),
  methods: {
    ...mapMutations(["setToken", "setUserId"]),

    async register() {
      const res = await http("/auth/register", "POST", {
        email: this.email,
        password: this.password
      });

      this.setToken(res.token);
      this.setUserId(res.userId);
      this.$router.push("/posts");
    },

    async login() {
      const res = await http("/auth/login", "POST", {
        email: this.email,
        password: this.password
      });
      this.setToken(res.token);
      this.setUserId(res.userId);
      this.$router.push("/posts");
    }
  }
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
  margin: auto;
  width: 400px;
}
</style>
