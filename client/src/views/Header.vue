<template>
  <div style="padding: 10px">
    <nav class="bg-gray-200 flex justify-between items-center p-4 mb-6 rounded">
      <h3 class="bg-gray-300 py-2 px-4 rounded">Huitter</h3>
      <vs-button class="large" @click="logOut">Log Out</vs-button>
    </nav>
    <router-view />
  </div>
</template>

<script>
import http from "../http";

export default {
  name: "Header",
  methods: {
    async logOut() {
      await http
        .post("/auth/logout")
        .then(({ data }) => {
          this.$vs.notify({
            position: "top-right",
            color: "success",
            title: "Success",
            text: data.message
          });
          this.$router.push({ name: "auth" });
        })
        .catch(e => {
          this.$vs.notify({
            position: "top-right",
            color: "danger",
            title: "Error",
            text: e.response.data.message
          });
          this.$router.push({ name: "auth" });
        });
    }
  }
};
</script>
