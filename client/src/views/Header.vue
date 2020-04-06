<template>
  <div style="padding: 10px;">
    <nav class="bg-gray-200 flex justify-between items-center p-4 mb-6 rounded">
      <h3 class="bg-gray-300 py-2 px-4 rounded">Huitter</h3>
      <div class="flex items-center">
        <h3 class="mr-2">
          Hello,
          <span style="color: rgb(31, 116, 255);">{{ email }}</span>
        </h3>
        <vs-avatar
          size="large"
          src="https://avatars2.githubusercontent.com/u/31676496?s=460&v=4"
          class="mr-4"
        />
        <vs-button class="small" @click="signOut">Log Out</vs-button>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "Header",
  methods: {
    ...mapActions(["logOut"]),

    async signOut() {
      try {
        await this.logOut();
        this.$_notify_success("Success", "You've successfully logged out");
        this.$router.push("/");
      } catch (e) {
        this.$_notify_error("Error", "Something went wrong");
        this.$router.push("/");
      }
    },
  },
  computed: {
    ...mapState(["email"]),
  },
};
</script>
