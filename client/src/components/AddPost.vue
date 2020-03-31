<template>
  <vs-col vs-w="4" class="flex justify-center">
    <vs-button class="medium px-16 mb-4" @click="addPostPopupActive = true"
      >Add Post</vs-button
    >
    <vs-popup
      class="holamundo"
      title="Add new post"
      :active.sync="addPostPopupActive"
    >
      <vs-input
        class="mb-4 w-full"
        placeholder="Title"
        v-model="newPostTitle"
      ></vs-input>
      <vs-textarea label="Leave a message" v-model="newPostContent" />
      <vs-button @click="addPost" class="mr-2 px-8">Accept</vs-button>
      <vs-button @click="addPostPopupActive = false" class="px-8"
        >Cancel</vs-button
      >
    </vs-popup>
  </vs-col>
</template>

<script>
import http from "../http";
import { mapState } from "vuex";

export default {
  name: "AddPost",
  data: () => ({
    addPostPopupActive: false,
    newPostTitle: "",
    newPostContent: "",
  }),
  methods: {
    async addPost() {
      await http
        .post(`/posts/${this.userId}`, {
          title: this.newPostTitle,
          content: this.newPostContent,
        })
        .then(({ data }) => {
          this.$_notify_success("Success", data.message);
          this.addPostPopupActive = false;
          this.loadPosts();
        })
        .catch((e) => {
          this.$_notify_error("Error", e.response.data.message);
        });
    },
  },
  computed: {
    ...mapState(["userId"]),
  },
};
</script>
