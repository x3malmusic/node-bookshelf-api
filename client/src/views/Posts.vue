<template>
  <div style="padding: 10px">
    <nav class="bg-gray-200 flex justify-between items-center p-4 mb-6 rounded">
      <h3 class="bg-gray-300 py-2 px-4 rounded">Huitter</h3>
      <vs-button class="large" @click="logOut">Log Out</vs-button>
    </nav>

    <vs-row class="justify-center flex-col items-center">
      <vs-col vs-w="4" class="flex justify-center">
        <vs-button class="medium px-16 mb-4" @click="addPostPopupActive = true"
          >Add Post</vs-button
        >
      </vs-col>
      <vs-col vs-w="2" v-if="!posts.length">
        <vs-card>
          <div slot="header">
            <h3>
              No posts!
            </h3>
          </div>
        </vs-card>
      </vs-col>

      <vs-col vs-w="4" v-if="posts && posts.length">
        <vs-card v-for="post in posts" :key="post.id">
          <div slot="header" class="flex justify-between">
            <input
              type="text"
              class="font-bold w-full"
              :ref="`postTitle${post.id}`"
              :disabled="postId !== post.id"
              :class="postId === post.id ? 'bg-gray-200' : 'bg-transparent'"
              :value="post.title"
            />
            <vs-button @click="deletePost(post.id)" color="danger" class="small"
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
            @click="acceptPost(post)"
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
      </vs-col>
    </vs-row>

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
  </div>
</template>

<script>
import http from "../http.js";
import { mapState } from "vuex";

export default {
  name: "Posts",
  data: () => ({
    posts: [],
    postId: null,
    postTitle: "",
    postContent: "",
    addPostPopupActive: false,
    newPostTitle: "",
    newPostContent: ""
  }),
  computed: {
    ...mapState(["userId"])
  },
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
          this.$router.push("/");
        })
        .catch(e => {
          this.$vs.notify({
            position: "top-right",
            color: "danger",
            title: "Error",
            text: e.response.data.message
          });
          this.$router.push("/");
        });
    },

    async addPost() {
      await http
        .post(`/${this.userId}/posts`, {
          title: this.newPostTitle,
          content: this.newPostContent
        })
        .then(({ data }) => {
          this.$vs.notify({
            position: "top-right",
            color: "success",
            title: "Success",
            text: data.message
          });
          this.addPostPopupActive = false;
          this.loadPosts();
        })
        .catch(e => {
          this.$vs.notify({
            color: "danger",
            title: "Error",
            text: e.response.data.message
          });
        });
    },

    deletePost(id) {
      this.$vs.dialog({
        type: "confirm",
        color: "danger",
        title: `Confirm`,
        text: "Are you sure want to delete this post",
        accept: async () => {
          await http
            .delete(`/posts/${id}`)
            .then(({ data }) => {
              this.$vs.notify({
                position: "top-right",
                color: "success",
                title: "Success",
                text: data.message
              });
              this.loadPosts();
            })
            .catch(e => {
              this.$vs.notify({
                position: "top-right",
                color: "danger",
                title: "Error",
                text: e.response.data.message
              });
            });
        }
      });
    },

    editPost(post) {
      this.postId = post.id;
      this.postTitle = this.$refs[`postTitle${post.id}`][0].value;
      this.postContent = this.$refs[`postContent${post.id}`][0].innerHTML;
      post.editable = true;
    },

    async acceptPost(post) {
      await http
        .put(`/posts/${post.id}`, {
          title: this.$refs[`postTitle${post.id}`][0].value,
          content: this.$refs[`postContent${post.id}`][0].innerHTML.trim()
        })
        .then(({ data }) => {
          this.postContent = "";
          this.postId = null;
          this.$vs.notify({
            position: "top-right",
            color: "success",
            title: "Success",
            text: data.message
          });
        })
        .catch(e => {
          this.cancelPost();
          this.$vs.notify({
            position: "top-right",
            color: "danger",
            title: "Error",
            text: e.response.data.message
          });
        });
    },

    cancelPost(post) {
      post.content = this.postContent;
      this.postContent = "";
      this.postId = null;
    },

    async loadPosts() {
      if (!this.userId) {
        this.$vs.loading.close();
        this.$router.push("/");
      }
      this.$vs.loading();
      setTimeout(async () => {
        await http
          .get(`/posts/${this.userId}`)
          .then(({ data }) => {
            this.posts = data;
            this.$vs.loading.close();
          })
          .catch(e => {
            this.$vs.notify({
              color: "danger",
              title: "Error",
              text: e.response.data.message
            });
            this.$vs.loading.close();
          });
      }, 1000);
    }
  },

  mounted() {
    this.loadPosts();
  }
};
</script>
