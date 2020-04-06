<template>
  <vs-card>
    <div slot="header" class="flex justify-between">
      <input
        type="text"
        class="font-bold w-full"
        :ref="`postTitle${post.id}`"
        :disabled="postId !== post.id"
        :class="postId === post.id ? 'bg-gray-200' : 'bg-transparent'"
        :value="post.title"
      />
      <vs-button @click="deleteUserPost(post.id)" color="danger" class="small"
        >X</vs-button
      >
    </div>
    <div
      :ref="`postContent${post.id}`"
      :contenteditable="postId === post.id"
      v-html="post.content"
      :class="
        postId === post.id
          ? 'bg-gray-200 border border-solid border-blue-500 rounded'
          : null
      "
    >
      <!--            {{ post.content }}-->
    </div>
    <vs-button
      @click="changePost(post)"
      class="medium px-8 mt-4 mr-2"
      v-if="postId === post.id"
      >Accept</vs-button
    >
    <vs-button
      @click="cancelPost(post)"
      class="medium px-8 mt-4"
      v-if="postId === post.id"
      >Cancel</vs-button
    >
    <vs-button
      @click="editPost(post)"
      class="medium px-8 mt-4"
      v-if="!(postId === post.id)"
      >Edit</vs-button
    >
  </vs-card>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Post",
  props: {
    post: Object,
  },
  data: () => ({
    postId: null,
    postTitle: "",
    postContent: "",
  }),
  methods: {
    ...mapActions(["deletePost", "acceptPost"]),
    deleteUserPost(id) {
      this.$vs.dialog({
        type: "confirm",
        color: "danger",
        title: `Confirm`,
        text: "Are you sure want to delete this post",
        accept: async () => {
          try {
            await this.deletePost(id);
            this.$_notify_success("Success", "Post deleted");
          } catch (e) {
            this.$_notify_error("Error", e.response.data.message);
          }
        },
      });
    },

    editPost(post) {
      this.postId = post.id;
      this.postTitle = this.$refs[`postTitle${post.id}`].value;
      this.postContent = this.$refs[`postContent${post.id}`].innerHTML;
      post.editable = true;
    },

    async changePost(post) {
      try {
        await this.acceptPost({
          post,
          title: this.$refs[`postTitle${post.id}`].value,
          content: this.$refs[`postContent${post.id}`].innerHTML.trim(),
        });
        this.postContent = "";
        this.postTitle = "";
        this.postId = null;
        this.$_notify_success("Success", "Post updated");
      } catch (e) {
        this.cancelPost(post);
        this.$_notify_error("Error", e);
      }
    },

    cancelPost(post) {
      this.$refs[`postContent${post.id}`].innerHTML = this.postContent;
      // this.$refs[`postTitle${post.id}`].value = this.postTitle;
      this.postContent = "";
      this.postTitle = "";
      this.postId = null;
    },
  },
};
</script>
