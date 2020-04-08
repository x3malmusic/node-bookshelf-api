import http from "../../http";

export default {
  async deletePost({commit}, id) {
    await http.delete(`/posts/${id}`);
    commit("deletePost", id)
  },

  async acceptPost(ctx, {post, title, content}) {
    await http
        .put(`/posts/${post.id}`, {
          title,
          content
        })
  },
};
