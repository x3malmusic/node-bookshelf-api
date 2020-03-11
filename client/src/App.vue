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
    try {
      const { data } = await http.get("/users/getUser");
      if (data && data.userId) {
        this.setUserId(data.userId);
      }
    } catch (e) {
      console.log(e);
    }
  }
};
</script>
