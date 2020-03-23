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
    ...mapMutations(["setUserData"])
  },
  async created() {
    await http
      .get("/users/getUser")
      .then(res => {
        if (res.data.loggedIn) this.setUserData(res.data);
      })
      .catch(e => {
        console.log(e);
      });
  }
};
</script>
