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
    this.getUserData();
  },
};
</script>
