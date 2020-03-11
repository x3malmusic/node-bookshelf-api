<template>
  <vs-card class="card ">
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
    password: ""
  }),
  methods: {
    ...mapMutations(["setUserId"]),

    async register() {
      await http
        .post("/auth/register", {
          email: this.email,
          password: this.password
        })
        .then(({ data }) => {
          this.setUserId(data.userId);
          this.$router.push({ name: "posts" });
          this.$vs.notify({
            position: "top-right",
            color: "success",
            title: "Logged In",
            text: "Welcome user"
          });
        })
        .catch(e => {
          this.$vs.notify({
            position: "top-right",
            color: "danger",
            title: "Error",
            text: e.response.data.message
          });
        });
    },

    async login() {
      await http
        .post("/auth/login", {
          email: this.email,
          password: this.password
        })
        .then(({ data }) => {
          this.setUserId(data.userId);
          this.$router.push({ name: "posts" });
          this.$vs.notify({
            position: "top-right",
            color: "success",
            title: "Logged In",
            text: "Welcome user"
          });
        })
        .catch(e => {
          this.$vs.notify({
            position: "top-right",
            color: "danger",
            title: "Error",
            text: e.response.data.message
          });
        });
    }
  },

  async created() {
    try {
      const { data } = await http.get("/users/getUser");
      if (data && data.userId) {
        this.setUserId(data.userId);
        this.$router.push({ name: "posts" });
      } else {
        this.$router.push({ name: "auth" });
      }
    } catch (e) {
      console.log(e);
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
