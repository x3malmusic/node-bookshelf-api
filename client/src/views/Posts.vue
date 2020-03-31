<template>
  <vs-row class="justify-center flex-col items-center">
    <add-post />
    <vs-col vs-w="2" v-if="!posts.length">
      <vs-card>
        <div slot="header">
          <h3>
            No posts!
          </h3>
        </div>
      </vs-card>
    </vs-col>

    <vs-col vs-w="4" v-else-if="posts && posts.length">
      <post v-for="post in posts" :key="post.id" :post="post" />
    </vs-col>
  </vs-row>
</template>

<script>
import http from "../http.js";
import { mapState } from "vuex";
import AddPost from "../components/AddPost";
import Post from "../components/Post";

export default {
  components: {
    AddPost,
    Post,
  },
  name: "Posts",
  data: () => ({
    posts: [],
    postId: null,
    postTitle: "",
    postContent: "",
  }),
  computed: {
    ...mapState(["userId"]),
  },
  methods: {
    async loadPosts() {
      this.$vs.loading();
      await http
        .get(`/posts/${this.userId}`)
        .then(({ data }) => {
          this.posts = data;
        })
        .catch((e) => {
          this.$_notify_error("Error", e.response.data.message);
        })
        .finally(() => {
          this.$vs.loading.close();
        });
    },
  },

  mounted() {
    this.loadPosts();
  },
};
</script>
