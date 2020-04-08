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
      <vs-button @click="addNewPost" class="mr-2 px-8">Accept</vs-button>
      <vs-button @click="addPostPopupActive = false" class="px-8"
        >Cancel</vs-button
      >
    </vs-popup>
  </vs-col>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "AddPost",
  data: () => ({
    addPostPopupActive: false,
    newPostTitle: "",
    newPostContent: "",
  }),
  methods: {
    ...mapActions(["addPost"]),
    async addNewPost() {
      try {
        await this.addPost({
          title: this.newPostTitle,
          content: this.newPostContent,
        });
        this.$_notify_success("Success", "Post added");
        this.addPostPopupActive = false;
      } catch (e) {
        this.$_notify_error("Error", e.response.data.message);
      }
    },
  },
};
</script>
