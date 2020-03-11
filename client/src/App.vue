<template>
  <div>
    <router-view />
  </div>
</template>

<script>
import http from "./http";
import { mapMutations } from "vuex";

export default {
  name: "App",
  methods: {
    ...mapMutations(["setUserId"])
  },
  async created() {
    await http
      .get("/users/getUser")
      .then(res => {
        if (res.data.loggedIn) this.setUserId(res.data.userId);
      })
      .catch(e => {
        console.log(e);
      });
  }
};
</script>
