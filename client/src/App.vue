<template>
  <div>
    <router-view />
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "App",
  methods: {
    ...mapActions(["getUserData"]),
  },
  created() {
    try {
      this.getUserData();
    } catch (e) {
      console.log(e);
    }
  },
};
</script>
