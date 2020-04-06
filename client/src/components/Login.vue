<template>
  <vs-card class="card">
    <div slot="header">
      <h3>Sign In</h3>
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
    <vs-button color="primary" class="mr" @click="logIn">Sign In</vs-button>
    <router-link to="/">Register</router-link>
  </vs-card>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Login",
  data: () => ({
    email: "test@email.com",
    password: "qweasd",
  }),
  methods: {
    ...mapActions(["login"]),

    async logIn() {
      try {
        await this.login({ email: this.email, password: this.password });
        this.$router.push({ name: "posts" });
        this.$_notify_success("Logged In", "Welcome user");
      } catch (e) {
        this.$_notify_error("Error", e.response.data.message);
      }
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
</style>
