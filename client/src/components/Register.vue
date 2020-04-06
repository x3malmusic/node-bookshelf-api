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
    <vs-button color="primary" class="mr" @click="registerUser"
      >Register</vs-button
    >
    <router-link to="/login">Sign In</router-link>
  </vs-card>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Register",
  data: () => ({
    email: "test4@email.com",
    password: "qweasd",
    confirmPassword: "qweasd",
  }),

  methods: {
    ...mapActions(["register"]),

    async registerUser() {
      if (this.password === this.confirmPassword) {
        try {
          await this.register({ email: this.email, password: this.password });
          this.$router.push({ name: "posts" });
          this.$_notify_success("Logged In", "Welcome user");
        } catch (e) {
          this.$_notify_error("Error", e.response.data.message);
        }
      } else {
        this.$_notify_error("Error", "Passwords doesnt match");
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
